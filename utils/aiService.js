const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Assuming you still want to get the API key from environment variables

/**
 * Generates quiz content using Gemini AI.
 * @param {string} prompt - The user-defined prompt for quiz generation.
 * @returns {Promise<string>} AI-generated quiz content.
 */
const generateQuizContent = async (prompt) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // or use gemini-1.0-pro-latest

    const result = await model.generateContent(prompt);
    
    // Access the text content from the response
    const aiResponse = result.response.text();

    return aiResponse;

  } catch (error) {
    console.error("AI Quiz Generation Failed:", error);
    throw new Error("AI Quiz Generation Failed");
  }
};

module.exports = { generateQuizContent };
