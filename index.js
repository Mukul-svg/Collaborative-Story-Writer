const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");
//const OPENAI_API_KEY = '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'
const app = express();
const port = 3001;
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// OpenAI API configuration

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API endpoint to generate story continuation
app.post('/generate-story', async (req, res) => {
  const { userStory } = req.body;

  // Call OpenAI API to generate story continuation
  try {
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: userStory,
        max_tokens: 7,
      });
      
    const generatedText = response.choices[0].text;
    
    res.json({ generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate story continuation' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});