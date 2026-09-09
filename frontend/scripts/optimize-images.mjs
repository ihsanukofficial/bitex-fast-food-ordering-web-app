/**
 * One-off/repeatable pass that shrinks the product/deal/category/gallery photography
 * under src/assets in place: re-encodes each WebP at a leaner quality and caps
 * dimensions to what the UI actually displays (product/category/deal cards and the
 * two-column product detail view never render these above roughly 1100px even at 2x
 * device pixel ratio; the full-bleed gallery/hero backgrounds are capped higher since
 * they can span a wide viewport). Filenames and extensions are preserved so no import
 * path in the app needs to change. A file is only overwritten if the re-encode is
 * actually smaller — never risk bloating an already-efficient asset.
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const assetsRoot = path.resolve(projectDirectory, '../src/assets');

const targets = [
  { dir: 'menu', maxDimension: 1100 },
  { dir: 'deals', maxDimension: 1100 },
  { dir: 'categories', maxDimension: 1100 },
  { dir: 'gallery', maxDimension: 1920 },
];

const WEBP_QUALITY = 80;

async function collectWebpFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectWebpFiles(fullPath);
      return entry.isFile() && entry.name.toLowerCase().endsWith('.webp') ? [fullPath] : [];
    }),
  );
  return files.flat();
}

async function optimizeFile(filePath, maxDimension) {
  const originalBuffer = await readFile(filePath);
  const originalSize = originalBuffer.length;

  const image = sharp(originalBuffer);
  const metadata = await image.metadata();
  const needsResize = Math.max(metadata.width, metadata.height) > maxDimension;

  let pipeline = sharp(originalBuffer);
  if (needsResize) {
    pipeline = pipeline.resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const optimizedBuffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();

  if (optimizedBuffer.length >= originalSize) {
    return { filePath, originalSize, finalSize: originalSize, skipped: true };
  }

  await writeFile(filePath, optimizedBuffer);
  return { filePath, originalSize, finalSize: optimizedBuffer.length, skipped: false };
}

async function run() {
  let totalOriginal = 0;
  let totalFinal = 0;
  let changed = 0;
  let skipped = 0;

  for (const { dir, maxDimension } of targets) {
    const directory = path.join(assetsRoot, dir);
    if (
      !(await stat(directory)
        .then((s) => s.isDirectory())
        .catch(() => false))
    ) {
      continue;
    }

    const files = await collectWebpFiles(directory);
    for (const filePath of files) {
      const result = await optimizeFile(filePath, maxDimension);
      totalOriginal += result.originalSize;
      totalFinal += result.finalSize;
      if (result.skipped) {
        skipped += 1;
      } else {
        changed += 1;
        const relative = path.relative(assetsRoot, filePath);
        const before = (result.originalSize / 1024).toFixed(0);
        const after = (result.finalSize / 1024).toFixed(0);
        console.log(`${relative}: ${before}KB -> ${after}KB`);
      }
    }
  }

  const savedMb = ((totalOriginal - totalFinal) / (1024 * 1024)).toFixed(2);
  console.log(
    `\nOptimized ${changed} file(s), skipped ${skipped} already-efficient file(s). Saved ${savedMb}MB.`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
