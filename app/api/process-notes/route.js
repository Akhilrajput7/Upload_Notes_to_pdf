import { processNotes } from "../../../services/aiService";
import { generatePDF } from "../../../services/pdfService";


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
    const base64Image = buffer.toString("base64");

    const formattedNotes = await processNotes(base64Image, file.type);
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
