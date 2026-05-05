import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question || question.trim().length < 2) {
      return Response.json(
        { answer: "Por favor escribe una pregunta más específica." },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente tributario, financiero y contable especializado en República Dominicana. Responde de forma clara, práctica y profesional. Considera DGII, TSS, ITBIS, ISR, retenciones, declaraciones juradas, IR-2, IR-3, IR-4, IR-13, IT-1, RST, e-NCF, nómina y seguridad social. No inventes leyes, fechas ni tasas si no estás seguro. Cuando sea útil, incluye ejemplos simples. Termina con esta nota: Esta respuesta es orientativa y no sustituye una consulta formal con la DGII, TSS o un asesor especializado."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.3
    });

    return Response.json({
      answer: completion.choices[0].message.content
    });
  } catch (error) {
    return Response.json(
      {
        answer:
          "Ocurrió un error generando la respuesta. Verifica la conexión con la IA."
      },
      { status: 500 }
    );
  }
}
