import { pdf } from "pdf-to-img";

export async function pdfToImages(fileBuffer) {
  try {
    const document = await pdf(fileBuffer);

    const images = [];

    for await (const page of document) {
      // `page` is a PNG buffer
      images.push(page);
    }

    return images;
  } catch (error) {
    console.error("PDF to images error:", error);
    throw new Error("Failed to convert PDF into images.");
  }
}