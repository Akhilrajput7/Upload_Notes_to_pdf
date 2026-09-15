 import { createCanvas } from "canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export async function pdfToImages(fileBuffer) {
  try {
    const document = await getDocument({
      data: new Uint8Array(fileBuffer),
      disableWorker: true,
    }).promise;

    const images = [];

    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext("2d");

      await page.render({ canvasContext: context, viewport }).promise;
      images.push(canvas.toBuffer("image/png"));
    }

    return images;
  } catch (error) {
    console.error("PDF to images error:", error);
    throw new Error("Failed to convert PDF into images.");
  }
}
