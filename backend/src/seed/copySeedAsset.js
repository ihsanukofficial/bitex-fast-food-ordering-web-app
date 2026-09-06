import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const projectRoot = path.resolve(backendRoot, '..');
const frontendSrcRoot = path.join(projectRoot, 'frontend', 'src');
const uploadsSeedRoot = path.join(backendRoot, 'uploads', 'seed');

const copiedUrlsBySource = new Map();

/**
 * Copies a frontend-bundled image (referenced by its resolved file:// URL) into
 * backend/uploads/seed, preserving its path under src/, and returns the served URL.
 * Memoized so an image reused by multiple records is only copied once.
 */
export const copySeedAsset = (fileUrl) => {
  if (!fileUrl) return '';
  if (!fileUrl.startsWith('file:')) return fileUrl;
  if (copiedUrlsBySource.has(fileUrl)) return copiedUrlsBySource.get(fileUrl);

  const sourcePath = fileURLToPath(fileUrl);
  const relativePath = path.relative(frontendSrcRoot, sourcePath);
  const destinationPath = path.join(uploadsSeedRoot, relativePath);

  mkdirSync(path.dirname(destinationPath), { recursive: true });
  copyFileSync(sourcePath, destinationPath);

  const servedUrl = `/uploads/seed/${relativePath
    .split(path.sep)
    .map(encodeURIComponent)
    .join('/')}`;
  copiedUrlsBySource.set(fileUrl, servedUrl);
  return servedUrl;
};
