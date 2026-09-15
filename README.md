# Handwritten Notes to PDF

A Next.js full-stack module that accepts handwritten PDF/JPG/PNG notes, uses a Groq vision-capable model to extract and structure the notes, and generates a downloadable PDF.

## Architecture

User -> FileUpload UI -> Next.js API Route -> Groq Vision/GenAI -> PDFKit -> Download

## Setup

1. Install dependencies:
   npm install

2. Create `.env.local` from `.env.local.example`:
   GROQ_API_KEY=your_groq_api_key_here

3. Start development:
   npm run dev

4. Open:
   http://localhost:3000

## Notes

- No authentication.
- No separate Express backend.
- The Groq key is used only server-side.
- PDF files are converted to page images before being sent to the vision model.
- Check the currently available Groq vision model in your Groq account/docs if the model name used here is unavailable.
