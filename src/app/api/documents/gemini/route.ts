import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { title, description = "", languages = [], license = "", sections = [], currentContent = "" } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const promptText = `
    Generate a detailed project documentation with the following details:
    
    Title: ${title}
    Description: ${description || 'N/A'}
    Programming Languages: ${languages.join(', ')}
    License: ${license || 'N/A'}
    Sections to include: ${sections.join(', ')}
    
    Please include:
    1. A detailed project description.
    2. Clear installation instructions with code examples.
    3. Usage examples with code snippets.
    4. Proper formatting and structure.
    5. Emojis for better readability.
    ${currentContent ? '\nCurrent content to improve upon:\n' + currentContent : ''}
    
    The documentation should be professional and well-structured return in plain text, dont wrap it.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const generatedText = await response.text();

     return NextResponse.json({ content: generatedText}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate markdown" },{status:500});
  }
}
