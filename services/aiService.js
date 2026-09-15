import groq from "../lib/groq";

export async function processNotes(imageBase64, mimeType) { //qwen/qwen3.6-27b
  try {
    
    const response = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",

      temperature: 0,
      max_tokens: 900,
      response_format: {
        type: "json_object",
      },
      reasoning_effort: "none",

      messages: [
        {
          role: "system",

          content: `
           you are an expert handwritten notes processing assistant.Your job is to read handwritten notes from an image or pdf and convert them
           into clean, well-organized study notes.

Rules: 
   
- Extract all readable text.
- Correct obvious spelling mistakes.
- Correct obvious grammar mistakes.
- Preserve the original meaning.
- Do not invent information.
- Create a suitable title.
- Organize information into sections.
- Use headings and subheadings.
- Use bullet points when appropriate.
- Use numbered points when appropriate.
- Keep important technical terms.
- If handwriting is unclear, make the best reasonable interpretation.

You MUST return a JSON object with exactly this structure:
  
{
  "title": "string",
  "contents": ["string"],
  "sections": [
    {
      "number": 1,
      "heading": "string",
      "subHeading": "string",
      "content": [
        "string",
        "string"
      ],
      "bullets": [
        "string"
      ],
      "formula": "string"
    }
  ]
}

Return JSON only.
`,
        },

        {
          role: "user",

          content: [
            {
              type: "text",
              text: "Convert these handwritten notes or image content into structured notes.",
            },

            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;

    console.log("Groq response:", content);

    if (!content) {
      throw new Error("Groq returned an empty response.");
    }

    // Parse JSON
    const notes = JSON.parse(content);

    // Validate response
    if (!notes.title || !Array.isArray(notes.sections)) {
      throw new Error("Invalid notes structure returned by Groq.");
    }

    return notes;
  } catch (error) {
    console.error("Groq processing error:", error);

    throw new Error(error.message || "Failed to process handwritten notes.");
  }
}
