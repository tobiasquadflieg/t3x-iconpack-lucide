import { mkdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";

// --- config ---
const EXT_ROOT = process.cwd();

const LUCIDE_ROOT = join(EXT_ROOT, "node_modules", "lucide-static");
const ICONS_SRC = join(LUCIDE_ROOT, "icons");
const FONT_INFO_SRC = join(LUCIDE_ROOT, "font", "info.json");

const OUT_ROOT = join(
    EXT_ROOT,
    "Resources",
    "Public",
    "Vendor",
    "Lucide"
);

const ICONS_OUT = join(OUT_ROOT, "icons");
const FONT_INFO_OUT = join(OUT_ROOT, "font", "info.json");

const ALLOWED_EXT = new Set([".svg", ".json", ".txt", ".js", ".mjs", ".css"]);

// --- helpers ---
async function ensureCleanDir(path: string) {
    await rm(path, { recursive: true, force: true });
    await mkdir(path, { recursive: true });
}


async function copyFile(src: string, dest: string) {
    await mkdir(dirname(dest), { recursive: true });
    await Bun.write(dest, Bun.file(src));
}

async function copySvgIcons(srcDir: string, destDir: string) {
    const glob = new Bun.Glob("**/*.svg");

    for await (const rel of glob.scan(srcDir)) {
        const src = join(srcDir, rel);
        const dest = join(destDir, rel);
        await copyFile(src, dest);
    }
}

(async () => {
    console.log("Building Lucide Iconpack assets…");

    await ensureCleanDir(OUT_ROOT);

    // 1. Copy SVG icons
    await copySvgIcons(ICONS_SRC, ICONS_OUT);

    // 2. Copy font/info.json
    await copyFile(FONT_INFO_SRC, FONT_INFO_OUT);

    console.log("Lucide assets copied successfully.");
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
