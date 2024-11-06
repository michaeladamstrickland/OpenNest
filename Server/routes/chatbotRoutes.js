const express = require('express');
const cors = require('cors');
const openai = require('openai');
const router = express.Router();
const app = express();
// app.use(cors());
// app.use(express.json());

// Initialize OpenAI configuration
app.post('/api/chatbot-response', async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
  
      const botMessage = response.choices[0].message.content.trim();
      res.json({ response: botMessage });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Error generating response' });
    }
});

module.exports = app;

