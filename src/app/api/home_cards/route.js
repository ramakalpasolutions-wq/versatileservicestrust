// app/api/home-cards/route.js
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const CARDS_FILE = path.join(DATA_DIR, "home-cards.json");
const PUBLIC_DIR = path.join(ROOT, "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "uploads");
const CARDS_UPLOADS = path.join(UPLOADS_DIR, "home-cards");

// Cloudinary config from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function ensureFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(CARDS_UPLOADS, { recursive: true });
  try {
    await fs.access(CARDS_FILE);
  } catch {
    await fs.writeFile(CARDS_FILE, JSON.stringify({ cards: [] }, null, 2), "utf8");
  }
}

async function readCards() {
  await ensureFiles();
  const raw = await fs.readFile(CARDS_FILE, "utf8");
  const obj = raw ? JSON.parse(raw) : { cards: [] };
  return obj.cards ?? [];
}

async function writeCards(cards) {
  await ensureFiles();
  await fs.writeFile(CARDS_FILE, JSON.stringify({ cards }, null, 2), "utf8");
}

function makeCardObjFromCloudinary(uploadResult, name = "", about = "") {
  const secure = uploadResult.secure_url || uploadResult.url || "";
  const public_id = uploadResult.public_id || "";
  return {
    id: `${Date.now()}-${(Math.random() + "").slice(2, 9)}`,
    name,
    about,
    src: secure,
    public_id,
    createdAt: new Date().toISOString(),
  };
}

function makeLocalCardObj(relPath, name = "", about = "") {
  const src = relPath.startsWith("/") ? relPath : `/${relPath}`;
  return {
    id: `${Date.now()}-${(Math.random() + "").slice(2, 9)}`,
    name,
    about,
    src,
    createdAt: new Date().toISOString(),
  };
}

// Save uploaded File to local temp and upload to Cloudinary
async function uploadFileToCloudinary(folder, file, filename) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const tmpDir = path.join(ROOT, "tmp_uploads");
  await fs.mkdir(tmpDir, { recursive: true });
  const tmpPath = path.join(tmpDir, filename);
  await fs.writeFile(tmpPath, buffer);
  try {
    const uploadOptions = {
      folder,
      use_filename: true,
      unique_filename: false,
      resource_type: "image",
      overwrite: false,
    };
    const res = await cloudinary.uploader.upload(tmpPath, uploadOptions);
    return res;
  } finally {
    try { await fs.unlink(tmpPath).catch(()=>{}); } catch(e){}
  }
}

async function saveUploadedFileLocal(folderDir, file, filename) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.mkdir(folderDir, { recursive: true });
  const dest = path.join(folderDir, filename);
  await fs.writeFile(dest, buffer);
  const rel = dest.startsWith(PUBLIC_DIR) ? dest.slice(PUBLIC_DIR.length).replace(/\\/g, "/") : `/uploads/home-cards/${filename}`;
  return rel.startsWith("/") ? rel : `/${rel}`;
}

/* ---------------- GET ---------------- */
export async function GET() {
  try {
    const cards = await readCards();
    return NextResponse.json({ cards }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/* ---------------- POST ---------------- */
/*
  Accepts multipart/form-data:
    - name
    - about
    - file (optional)
  Returns:
    { card: {...} }  on success
*/
export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const name = String(form.get("name") || "").trim();
      const about = String(form.get("about") || "").trim();
      const file = form.get("file"); // may be File or null

      const cards = await readCards();
      let newCard = null;

      if (file && typeof file !== "string") {
        // build filename
        const fname = `${Date.now()}-${(file.name || "upload").replace(/\s+/g, "_")}`;
        // try cloudinary
        try {
          const uploadRes = await uploadFileToCloudinary("home_cards", file, fname);
          newCard = makeCardObjFromCloudinary(uploadRes, name, about);
        } catch (e) {
          // fallback: save local
          const relLocal = await saveUploadedFileLocal(CARDS_UPLOADS, file, fname);
          newCard = makeLocalCardObj(relLocal, name, about);
        }
      } else {
        // no file, create text-only card
        newCard = {
          id: `${Date.now()}-${(Math.random() + "").slice(2, 9)}`,
          name,
          about,
          src: "",
          createdAt: new Date().toISOString(),
        };
      }

      cards.unshift(newCard);
      await writeCards(cards);
      return NextResponse.json({ ok: true, card: newCard }, { status: 201 });
    }

    // accept JSON fallback (name/about)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const name = String(body.name || "").trim();
      const about = String(body.about || "").trim();
      const cards = await readCards();
      const card = {
        id: `${Date.now()}-${(Math.random() + "").slice(2, 9)}`,
        name,
        about,
        src: body.src || "",
        createdAt: new Date().toISOString(),
      };
      cards.unshift(card);
      await writeCards(cards);
      return NextResponse.json({ ok: true, card }, { status: 201 });
    }

    return NextResponse.json({ error: "Unsupported content-type" }, { status: 400 });
  } catch (err) {
    console.error("POST /api/home-cards error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/* ---------------- DELETE ---------------- */
/*
  Accepts JSON:
    { id } or { src }
*/
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id, src } = body || {};
    let cards = await readCards();
    if (id) {
      const idx = cards.findIndex((c) => c.id === id);
      if (idx >= 0) {
        const removed = cards.splice(idx, 1)[0];
        if (removed?.public_id) {
          try { await cloudinary.uploader.destroy(removed.public_id, { resource_type: "image" }); } catch(e){ console.warn(e); }
        } else if (removed?.src) {
          // attempt deleting local file (best-effort)
          try {
            const rel = removed.src.replace(/^\//, "");
            const p = path.join(PUBLIC_DIR, rel);
            await fs.unlink(p).catch(()=>{});
          } catch (e) {}
        }
        await writeCards(cards);
        return NextResponse.json({ ok: true, cards }, { status: 200 });
      }
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    } else if (src) {
      cards = cards.filter((c) => c.src !== src);
      await writeCards(cards);
      return NextResponse.json({ ok: true, cards }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Missing id or src" }, { status: 400 });
    }
  } catch (err) {
    console.error("DELETE /api/home-cards error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
