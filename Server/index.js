import express from "express";
import { config } from "dotenv";
import OpenAI from "openai";
import cors from "cors";

config();
const app = express();
const API_KEY = process.env.OPENAI_API_KEY;
const PORT = 8000;

// Make the object for Open-Ai api
const openAi = new OpenAI({ apiKey: API_KEY });

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Send the POST request to chat-gpt
app.post("/completions", async (req, res) => {
  try {
    const response = await openAi.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "Create A SQL Query to"+req.body.message,
        },
      ],
    });
    console.log(response.choices[0].message)
    res.send(response.choices[0].message);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error is occured");
  }
});

app.listen(PORT, () => {
  console.log(`app is working on ${PORT}`);
});
