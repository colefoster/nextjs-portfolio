import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  try{
 
    

    res.status(200).json({ completion: "Hello Friends" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
