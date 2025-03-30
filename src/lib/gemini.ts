import { GoogleGenerativeAI } from '@google/generative-ai';

export interface MarkdownPrompt {
  title: string;
  description?: string;
  languages: string[];
  license?: string;
  sections: string[];
  currentContent?: string;
}

export async function generateMarkdown({
  title,
  description,
  languages,
  license,
  sections,
  currentContent,
}: MarkdownPrompt): Promise<string> {
  if (!title) throw new Error('Title is required');

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

The documentation should be professional and well-structured return in plain text, dont use wrap it.
`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
    if (!genAI) throw new Error('Failed to initialize Google Generative AI');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const generatedText = await response.text();

    if (!generatedText) throw new Error('No content generated');

    return generatedText;
  } catch (error: any) {
    throw new Error(`Failed to generate markdown: ${error.message}`);
  }
}

export default generateMarkdown;
