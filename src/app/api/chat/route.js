import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'assistant',
        content: `Hello, I am Sakhi Bot, your friendly and helpful chatbot for women's health and well-being. I can provide you with information and guidance on various topics related to women's health, such as:

      - Women safety
      - Period and menstrual cycle
      - Pregnancy and contraception
      - Breast cancer and other gynecological diseases
      - Abortion and reproductive rights
      - Menopause and hormonal changes
      - Mental health and emotional support
      
      You can ask me any question related to these topics, and I will try my best to answer you in a clear and respectful way. I will also suggest some useful resources and tips that you can follow to improve your health and happiness.
      
      Please note that I am not a medical professional, and my advice is not a substitute for consulting a doctor. If you have any serious or urgent health concerns, please seek medical attention as soon as possible.
      
      I hope you find me useful and enjoyable to chat with. To start, you can type "Hi" or ask me a question. I look forward to hearing from you. 😊`,
      },
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
