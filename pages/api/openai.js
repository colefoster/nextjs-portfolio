import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { userMessage } = req.body;

  const apiKey = process.env.OPEN_AI_API_KEY;
  const configuration = new Configuration({
    organization: "org-QuAbMjgiJ0XJzR2aYWCQj9Jz",
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "" },
        { role: "user", content: `${userMessage}` },
      ],
      max_tokens: 150,
      temperature: 0.9,
    });

    res.status(200).json({ completion: completion.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
