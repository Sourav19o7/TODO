const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePlan(problem, timeline) {
  const prompt = `
  You are an expert project planner. Provide a structured step-by-step JSON breakdown to solve the given problem within the specified timeline.

  Problem: ${problem}
  Deadline: ${timeline}

  The response should be in strict JSON format like this:
  {
    "steps": [
      {
        "step": 1,
        "title": "Step title",
        "description": "Detailed explanation of what needs to be done in this step",
        "duration": "Expected duration in days/hours"
      },
      ...
    ]
  }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    // Parse and return JSON response
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating plan:", error);
    return { error: "Failed to generate a plan." };
  }
}

module.exports = generatePlan;
