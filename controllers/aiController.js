const { generateQuizContent } = require("../utils/aiService");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const { getAuth } = require("@clerk/express");


// @desc   Generate a quiz using AI
// @route  POST /api/ai/generate-quiz
const generateQuiz = async (req, res) => {
  try {
    console.log(req.auth.userId);
    const auth = getAuth(req);
    console.log(auth);
    const { prompt, title, category, questionCount } = req.body;
    if (!prompt || !title || !category || !questionCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const aiGeneratedText = await generateQuizContent(prompt);

    // Convert AI response into structured questions
    const generatedQuestions = parseAIResponse(aiGeneratedText, questionCount);

    // Create new quiz
    const quiz = new Quiz({
      title,
      description: "AI-generated quiz",
      creatorId: req.auth.userId,
      category,
      maxMarks: questionCount * 10, // Assuming 10 marks per question
      questionCount,
      isPublic: true,
    });

    await quiz.save();

    // Save generated questions to DB
    const questions = generatedQuestions.map((q) => ({
      quizId: quiz._id,
      questionText: q.questionText,
      questionType: "MCQ",
      options: q.options,
      correctAnswer: q.correctAnswer,
      marks: 10,
      generatedByAI: true,
    }));

    await Question.insertMany(questions);

    res.status(201).json({ message: "Quiz generated successfully", quizId: quiz._id });
  } catch (error) {
    res.status(500).json({ error: "AI Quiz Generation Failed" });
  }
};

/**
 * Parses AI response text into structured quiz questions.
 * @param {string} aiResponse - AI-generated text.
 * @param {number} count - Number of questions to extract.
 * @returns {Array} Structured questions.
 */
const parseAIResponse = (aiResponse, count) => {
  const lines = aiResponse.split("\n").filter((line) => line.trim() !== "");
  const questions = [];

  for (let i = 0; i < count && i < lines.length; i += 5) {
    questions.push({
      questionText: lines[i],
      options: [lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]],
      correctAnswer: lines[i + 1], // Assuming the first option is the correct answer
    });
  }

  return questions;
};

module.exports = { generateQuiz };
