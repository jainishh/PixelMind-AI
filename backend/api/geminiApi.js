// geminiApi.js
import dotenv from "dotenv";
dotenv.config(); // <-- load env first
const GEMINI_API_KEY = "AIzaSyA3F1Ai42MWGVlqghxsrpCOxRnpen2PmR4";

import { GoogleGenAI } from "@google/genai";

const geminiApiKey = GEMINI_API_KEY;

if (!geminiApiKey) {
  throw new Error("GEMINI_API_KEY is missing. Add it to .env and restart.");
}

// Pass the API key in the shape the client expects
// (if your version of @google/genai expects a different property name, adapt)
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

const prompt = "what is gemini";
console.log("prompt:", prompt);

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    console.log(response.text)

    // Many GenAI clients put the text on response.output or response.text or response[0].output.
    // Inspect `response` if this line throws.
    // console.log("raw response:", response);
    // if (response.text) console.log(response.text);
    // else if (response.output) console.log(response.output);
    // else console.log("Finished — inspect `response` object to find output.");
  } catch (err) {
    console.error("Error calling GenAI:", err);
  }
}

await main();
