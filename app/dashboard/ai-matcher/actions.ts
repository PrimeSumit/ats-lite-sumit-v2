"use server";

import Groq from "groq-sdk";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// --- 1. FILE PARSER ---
export async function parseResumeFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    let text = "";
    if (file.type === "application/pdf") {
      const parser = new PDFParser(null, 1);
      text = await new Promise<string>((resolve, reject) => {
        parser.on("pdfParser_dataError", (err: any) => reject(err.parserError));
        parser.on("pdfParser_dataReady", () =>
          resolve(parser.getRawTextContent())
        );
        parser.parseBuffer(buffer);
      });
    } else if (file.type.includes("word") || file.name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      text = buffer.toString("utf-8");
    }

    // 🚀 Ensure we always return a string, never undefined
    return { success: true, text: text.trim() || "" };
  } catch (error: any) {
    return {
      success: false,
      error: "Parsing failed: " + error.message,
      text: "",
    };
  }
}

// --- 2. GROQ ANALYSIS ---
export async function analyzeWithAI(
  resumeText: string,
  jobDescription: string
) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS analysis engine. You must return strictly valid JSON.",
        },
        {
          role: "user",
          content: `Compare Resume to JD. 
                    JD: "${jobDescription}"
                    Resume: "${resumeText.slice(0, 15000)}" 

                    CRITICAL: Return scores (overallScore, skillsScore, experienceScore, formattingScore) as WHOLE NUMBERS (0-100).
                    Return JSON structure:
                    {
                      "overallScore": number,
                      "skillsScore": number,
                      "experienceScore": number,
                      "formattingScore": number,
                      "matchedSkills": string[],
                      "missingSkills": string[],
                      "summary": "string"
                    }`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(completion.choices[0]?.message?.content || "{}");
    return { success: true, data };
  } catch (error: any) {
    console.error("Groq Error:", error.message);
    return { success: false, error: error.message };
  }
}
