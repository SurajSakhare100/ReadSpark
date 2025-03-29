# ReadSpark: AI-Powered Documentation Generator 🚀

**Description:**

ReadSpark is an innovative AI-powered documentation generator designed to streamline the process of creating professional and comprehensive documentation. Leveraging the power of AI, ReadSpark helps you effortlessly generate README files, in-depth documentation, and engaging profile pages. Built using TypeScript, ReadSpark is a modern and robust solution for developers seeking to automate their documentation workflows. It supports real-time markdown previews, authentication, project management, and more!

**Programming Languages:** TypeScript

**License:** MIT

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)
3.  [Contributing](#contributing)

## 1. Installation 🛠️

Follow these steps to get ReadSpark up and running on your local machine:

**Step 1: Clone the Repository**

Clone the ReadSpark repository from GitHub using the following command:

```bash
git clone https://github.com/yourusername/readspark.git
cd readspark
```

Replace `yourusername` with the actual GitHub username of the repository owner.

**Step 2: Install Dependencies**

Install the necessary dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

**Step 3: Configure Environment Variables**

Create a `.env` file in the root directory of the project. This file will store sensitive information such as API keys and database connection strings. Add the following variables to your `.env` file, replacing the placeholder values with your actual credentials:

```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_gemini_api_key # API key for accessing the AI model
GITHUB_ID=your_github_oauth_id    # GitHub OAuth App ID
GITHUB_SECRET=your_github_oauth_secret #GitHub OAuth App Secret
NEXTAUTH_SECRET=your_nextauth_secret # A long, random string for NextAuth
NEXTAUTH_URL=http://localhost:3000  # URL of your application
```

**Explanation of Environment Variables:**

*   `MONGODB_URI`: The connection string for your MongoDB database.  Make sure your MongoDB instance is running and accessible.
*   `GOOGLE_API_KEY`: The API key for Google's Gemini AI, which powers the documentation generation. You'll need to obtain this key from the Google AI platform.
*   `GITHUB_ID` & `GITHUB_SECRET`: These are the Client ID and Client Secret from your GitHub OAuth application. Configure a new OAuth application within your GitHub settings.  Set the Callback URL to `http://localhost:3000/api/auth/callback/github` (replace `localhost:3000` with your actual URL if different).
*   `NEXTAUTH_SECRET`: A strong, randomly generated secret used for encrypting tokens in NextAuth.  You can generate one using a tool like `openssl rand -base64 32`.
*   `NEXTAUTH_URL`: The URL of your ReadSpark instance. This is crucial for authentication to work correctly.

**Step 4: Run the Development Server**

Start the development server using npm or yarn:

```bash
npm run dev
```

or

```bash
yarn dev
```

This command will start the ReadSpark application, and you can access it in your browser at `http://localhost:3000` (or the URL specified in your `.env` file).

## 2. Usage 💡

Once ReadSpark is installed and running, you can start using it to generate documentation. Here are some example use cases:

**Generating a README File:**

1.  Navigate to the ReadSpark application in your browser.
2.  Authenticate with your GitHub account (if required).
3.  Select the "README" document type.
4.  Provide the necessary input, such as your project's name, description, and features.
5.  Click the "Generate" button.
6.  ReadSpark will use the AI model to generate a professional README file based on your input.
7.  Review and edit the generated content in the real-time markdown preview.
8.  Download or copy the generated README file.

**Example Code Snippet (Conceptual - Illustrating how you might interact with the AI service):**

```typescript
// Example demonstrating a hypothetical function call to generate README content
async function generateReadme(projectDetails: ProjectDetails): Promise<string> {
  const aiResponse = await aiService.generate("readme", projectDetails);
  return aiResponse.content;
}

interface ProjectDetails {
  name: string;
  description: string;
  features: string[];
}
```

**Generating API Documentation:**

1. Select the "Documentation" document type.
2. You may have the option to upload existing code.
3. Provide information on your API, such as endpoints, parameters, and return types.
4.  ReadSpark will generate comprehensive API documentation in a suitable format (e.g., Markdown, OpenAPI).
5. Review the generated documentation and make any necessary changes.

**Creating a Profile Page:**

1. Select the "Profile" document type.
2. Enter your personal or professional information, such as your name, bio, skills, and links to your social media profiles.
3. ReadSpark will create a personalized profile page based on your input.
4. Customize the profile page to your liking.

**Markdown Preview:**

ReadSpark provides a real-time markdown preview that allows you to see how your documentation will look as you edit it.  This is invaluable for ensuring proper formatting and readability.

## 3. Contributing 🙌

Contributions to ReadSpark are highly welcome! If you have ideas for improvements, bug fixes, or new features, please follow these guidelines:

1.  **Fork the Repository:** Fork the ReadSpark repository to your GitHub account.
2.  **Create a Branch:** Create a new branch for your feature or bug fix. Use a descriptive branch name, such as `feature/new-ai-model` or `fix/typo-in-readme`.
3.  **Implement Your Changes:** Make your changes in the forked repository. Follow the project's coding style and guidelines.  Write clear and concise code, and add comments where necessary.
4.  **Test Your Changes:** Thoroughly test your changes to ensure they work as expected and don't introduce any new issues.
5.  **Commit Your Changes:** Commit your changes with descriptive commit messages.
6.  **Create a Pull Request:** Submit a pull request from your branch to the main ReadSpark repository. Provide a detailed description of your changes and the rationale behind them.

**Code Style:**

*   Use TypeScript best practices.
*   Follow the established coding style in the project.
*   Write clear and concise code with helpful comments.
*   Use meaningful variable and function names.

**Pull Request Review:**

*   All pull requests will be reviewed by the project maintainers.
*   Be responsive to feedback and make any necessary changes.
*   Once your pull request is approved, it will be merged into the main branch.

**License:**

By contributing to ReadSpark, you agree that your contributions will be licensed under the MIT License.
