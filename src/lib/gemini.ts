import { GoogleGenerativeAI } from '@google/generative-ai';

// For client-side usage, we need to use environment variables with NEXT_PUBLIC_ prefix
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
export interface MarkdownPrompt {
  title: string | null;
  description: string | null;
  languages: string[];
  license: string | null;
  sections: string[];
  currentContent?: string;
}

export async function generateMarkdown(prompt: MarkdownPrompt): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const { title, description, languages, license, sections, currentContent } = prompt;
    console.log(title, description, languages, license, sections, currentContent);

    if (!title) throw new Error('Title is required');

    const promptText = `
Generate a detailed project documentation in markdown format with the following details:

Title: ${title}
Description: ${description}
Programming Languages: ${languages.join(', ')}
License: ${license}
Sections to include: ${sections.join(', ')}

Please include:
1. A detailed project description
2. Clear installation instructions with code examples
3. Usage examples with code snippets
4. Proper formatting and structure
5. Emojis for better readability
${currentContent ? '\nCurrent content to improve upon:\n' + currentContent : ''}

The documentation should be professional, well-structured, and follow markdown best practices.
`;

    const result = await model.generateContent(promptText);
    const response = await result.response;
    const generatedText = response.text();

    if (!generatedText) {
      throw new Error('No content generated');
    }

    return generatedText;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate markdown: ${error.message}`);
  }
}

export default generateMarkdown; 