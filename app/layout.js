import "./globals.css";

export const metadata = {
  title: "Handwritten Notes to PDF",
  description: "Convert handwritten notes into formatted PDFs using Groq AI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
