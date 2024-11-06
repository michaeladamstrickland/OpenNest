require('dotenv').config();
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

async function testOpenAI() {
    try {
        const response = await openai.Completion.create({
            model: 'text-davinci-003',
            prompt: "Hello, world!",
            max_tokens: 10,
        });
        console.log(response.data.choices[0].text.trim());
    } catch (error) {
        console.error('Error:', error);
    }
}

testOpenAI();