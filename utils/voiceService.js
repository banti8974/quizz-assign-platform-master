const { AssemblyAI } = require('assemblyai'); // Import the client library
require('dotenv').config();

const ASSEMBLY_AI_KEY = process.env.ASSEMBLY_AI_KEY; // Get API key from environment variable
const client = new AssemblyAI({ apiKey: ASSEMBLY_AI_KEY }); // Initialize AssemblyAI client

/**
 * Transcribes audio using AssemblyAI.
 * @param {string} audioUrl - Public URL of the uploaded audio file.
 * @returns {Promise<object>}  An object containing the transcription text and, if available, speaker labels.  Returns an error object if transcription fails.
 */
const transcribeAudio = async (audioUrl) => {
  try {
    if (!ASSEMBLY_AI_KEY) {
      throw new Error("ASSEMBLY_AI_KEY environment variable is not set.");
    }

    const params = {
      audio_url: audioUrl, // Use audio_url for a URL
      // speaker_labels: true, // Enable speaker diarization
    };

    const transcript = await client.transcripts.transcribe(params); // Start transcription

    //Check for errors
    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }
    
    // Extract and return the relevant information
    return {error: null, test: transcript.text};


  } catch (error) {
    console.error("Voice-to-Text Processing Failed:", error);
    // Return an error object instead of throwing, for better error handling in the calling function
    return { error: error.message };
  }
};

module.exports = { transcribeAudio };
