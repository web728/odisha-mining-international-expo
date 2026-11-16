
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const INPUT_DIR = path.resolve("public/gallery/original");
const OUTPUT_DIR = path.resolve("public/gallery/optimize");

const MAX_BYTES = 200_000;
const MAX_WIDTH = 1920;
const MIN_WIDTH = 160;
const EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"
]);

async function getImages(dir) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await getImages(fullPath));
    } else if (
      EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(input, output) {
  const metadata = await sharp(input).metadata();

  // Auto-orientation is handled by rotate().
  const sourceWidth =
    [5, 6, 7, 8].includes(metadata.orientation)
      ? metadata.height
      : metadata.width;

  if (!sourceWidth) {
    throw new Error("Unable to read source dimensions");
  }

  let width = Math.min(sourceWidth, MAX_WIDTH);

  while (width >= MIN_WIDTH) {
    for (let quality = 82; quality >= 20; quality -= 4) {
      const buffer = await sharp(input, {
        failOn: "error"
      })
        .rotate()
        .resize({
          width,
          withoutEnlargement: true
        })
        .webp({
          quality,
          effort: 6,
          alphaQuality: 80
        })
        .toBuffer();

      if (buffer.length < MAX_BYTES) {
        await fs.mkdir(path.dirname(output), {
          recursive: true
        });

        await fs.writeFile(output, buffer);

        return {
          size: buffer.length,
          quality,
          width
        };
      }
    }

    width = Math.floor(width * 0.8);
  }

  throw new Error(
    "Could not compress below 200 KB without going below minimum width"
  );
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, {
    recursive: true
  });

  const images = await getImages(INPUT_DIR);

  console.log(`Found ${images.length} images\n`);

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const input of images) {
    const relative = path.relative(INPUT_DIR, input);

    // Example: DSC01238.JPG -> DSC01238.JPG.webp
    const output = path.join(
      OUTPUT_DIR,
      relative + ".webp"
    );

    try {
      const originalStat = await fs.stat(input);
      totalOriginal += originalStat.size;

      const outputStat = await fs.stat(output).catch(() => null);

      if (
        outputStat &&
        outputStat.size < MAX_BYTES &&
        outputStat.mtimeMs >= originalStat.mtimeMs
      ) {
        skipped++;
        totalOptimized += outputStat.size;
        console.log(`SKIP ${relative}`);
        continue;
      }

      const result = await optimizeImage(input, output);

      converted++;
      totalOptimized += result.size;

      console.log(
        `OK ${relative} | ` +
        `${(originalStat.size / 1024 / 1024).toFixed(2)} MB -> ` +
        `${(result.size / 1024).toFixed(1)} KB | ` +
        `Q${result.quality} | W${result.width}`
      );
    } catch (error) {
      failed++;
      console.error(
        `FAILED ${relative}: ${error.message}`
      );
    }
  }

  console.log("\nOptimization complete");
  console.log(`Converted: ${converted}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(
    `Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`
  );

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
