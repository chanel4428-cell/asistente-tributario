import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    if (!question || question.trim().length < 2) {
      return res.status(400).json({
        answer: "Por favor escribe una pregunta más específica."
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un asistente tributario, financiero y contable especializado en República Dominicana."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.3
    });

    return res.status(200).json({
      answer: completion.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      error: "Error interno",
      details: error.message
    });
  }
}
