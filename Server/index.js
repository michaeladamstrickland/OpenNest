const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize app and set up OpenAI API Key
const app = express();
const PORT = process.env.PORT || 5000;
// openai.apiKey = process.env.OPENAI_API_KEY;

// Import models and routes
const { sequelize, User, Property, Tour, Offer } = require('./models');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const tourRoutes = require('./routes/tourRoutes');
const offerRoutes = require('./routes/offerRoutes');
// const chatbotRoutes = require('./routes/chatbotRoutes');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust as needed
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route for OpenAI Chatbot Response
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

// Route for Code Generation
app.post('/api/generate-code', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.Completion.create({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 150,
        });
        const generatedCode = response.choices[0].text.trim();
        res.json({ code: generatedCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating code' });
    }
});

// Setup Routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/offers', offerRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send("Welcome to the API");
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error syncing database:', error);
});
