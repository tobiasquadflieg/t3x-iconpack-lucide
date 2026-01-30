import { mkdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";

// --- config ---
const EXT_ROOT = process.cwd(); // run from extension root
const SRC_DIR = join(EXT_ROOT, "node_modules", "lucide-static", "icons");
const OUT_DIR = join(EXT_ROOT, "Resources", "Public", "Vendor", "Lucide");

// optional: only copy these file extensions
const ALLOWED_EXT = new Set([".svg", ".json", ".txt", ".js", ".mjs", ".css"]);

// --- helpers ---
async function ensureCleanDir(path: string) {
    await rm(path, { recursive: true, force: true });
    await mkdir(path, { recursive: true });
}

function extname(file: string) {
    const i = file.lastIndexOf(".");
    return i >= 0 ? file.slice(i) : "";
}

async function copyFile(src: string, dest: string) {
    await mkdir(dirname(dest), { recursive: true });
    // Bun.write supports Blob/ArrayBuffer/string; easiest: use Bun.file
    await Bun.write(dest, Bun.file(src));
}

async function copyTree(srcRoot: string, destRoot: string) {
    // Bun.Glob is fast and simple for recursive copies
    const glob = new Bun.Glob("**/*");
    for await (const rel of glob.scan(srcRoot)) {
        const src = join(srcRoot, rel);
        const dest = join(destRoot, rel);

        // Skip directories (Glob yields files and dirs depending on FS);
        // Bun.file on a directory will fail, so we guard by extension.
        const ext = extname(rel).toLowerCase();
        if (!ext) continue;
        if (!ALLOWED_EXT.has(ext)) continue;

        await copyFile(src, dest);
    }
}

// --- main ---
(async () => {
    console.log("Copy Lucide assets");
    console.log("  from:", SRC_DIR);
    console.log("  to:  ", OUT_DIR);

    await ensureCleanDir(OUT_DIR);
    await copyTree(SRC_DIR, OUT_DIR);

    console.log("Done.");
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
