const { transcribeAudio } = require("../utils/voiceService");

/**
 * @desc   Process voice input and return transcribed text
 * @route  POST /api/voice/transcribe
 */
const processVoiceInput = async (req, res) => {
  try {
    if (!req.body.audioUrl) {
      return res.status(400).json({ error: "Missing audio URL" });
    }

    const transcribedText = await transcribeAudio(req.body.audioUrl);

    res.json({ transcribedText });
  } catch (error) {
    res.status(500).json({ error: "Voice-to-Text Processing Failed" });
  }
};

module.exports = { processVoiceInput };
