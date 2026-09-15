import { processNotes } from "../../../services/aiService";
import { generatePDF } from "../../../services/pdfService";
import { pdfToImages } from "../../../services/pdfToImage";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        {
          error: "Only pdf , JPG and PNG images are supported in this version.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "File size must be 10 MB or less." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const formattedNotes =
      file.type === "application/pdf"
        ? await processPdfNotes(buffer)
        : await processNotes(buffer.toString("base64"), file.type);
    const pdfBuffer = await generatePDF(formattedNotes);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="formatted-notes.pdf"',
      },
    });
  } catch (error) {
    console.error("Processing error:", error);
    return Response.json(
      { error: error.message || "Failed to process notes." },
      { status: 500 },
    );
  }
}

async function processPdfNotes(fileBuffer) {
  const pageImages = await pdfToImages(fileBuffer);

  if (pageImages.length === 0) {
    throw new Error("The PDF does not contain any readable pages.");
  }

  const pageNotes = [];

  for (const pageImage of pageImages) {
    pageNotes.push(
      await processNotes(pageImage.toString("base64"), "image/png"),
    );
  }

  return {
    title: pageNotes[0].title,
    contents: pageNotes.flatMap((notes) => notes.contents || []),
    sections: pageNotes
      .flatMap((notes) => notes.sections || [])
      .map((section, index) => ({
        ...section,
        number: index + 1,
      })),
  };
}
