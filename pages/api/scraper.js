import * as cheerio from 'cheerio';
import axios from 'axios';


async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}


export default async function handler(req, res) {
 try{
    const pokemon = req.query.pokemon;
    const number = req.query.number;

    const url = `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pok%C3%A9mon)`;
    const response = await axios.get(url, {
        responseType: 'text', // Ensures that the response is interpreted as text
      });

    const rawHTML = response.data; // The raw HTML is stored in the 'data' property of the response object
    const $ = cheerio.load(rawHTML); // Loads the raw HTML into cheerio
    const targetH2 = $('h2').find('.mw-headline:contains("Biology")').parent();
    const firstP = targetH2.next('p');

    const firstPText = firstP.text();
    

    const targetElement = $('table.roundy > tbody > tr > td[colspan="2"]');

    // Find the first image element within the target element
    const imgElement = targetElement.find('img').first();

    // Extract the 'src' attribute from the selected image element
    const srcLink = imgElement.attr('src');

    //const generatedImage = await query({"inputs": firstPText});
    //console.log(generatedImage);
    
    res.status(200).json({image:srcLink, description:firstPText, number: number,});
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
