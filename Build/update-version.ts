import {readFile, writeFile} from "fs/promises";

// Version aus bun.lock extrahieren
async function getVersionFromBunLock(): Promise<string> {
    const bunLock = await readFile("bun.lock", "utf8");
    const match = bunLock.match(/lucide-static@(\d+\.\d+\.\d+)/);
    if (!match) throw new Error("Version nicht gefunden");
    // @ts-ignore
    return match[1];
}

// Version in README ersetzen
async function updateReadme(version: string) {
    const readmePath = "README.md";
    let readme = await readFile(readmePath, "utf8");
    readme = readme.replace(
        /(\| Version \| \*)v[\d\.]+( \*\s*\|)/,
        `$1v${version}$2`
    );
    await writeFile(readmePath, readme, "utf8");
}

async function updateIconpackVersion(version: string): Promise<string> {
    const IconpackLucide = "Configuration/Iconpack/Lucide.yaml";
    let iconpack = await readFile(IconpackLucide, "utf8");
    iconpack = iconpack.replace(
        /(version:\s*)[\d\.]+/,
        `$1${version}`
    );
    await writeFile(IconpackLucide, iconpack, "utf8");
    return version;
}

(async () => {
    const version = await getVersionFromBunLock();
    await updateReadme(version);
    await updateIconpackVersion(version);
    console.log(`README auf Version ${version} aktualisiert.`);
})();
