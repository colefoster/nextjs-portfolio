import * as cheerio from 'cheerio';
export default async function handler(req, res)  {

    var username = req.query.username;
    const numComments = req.query.numComments;

    if(username === 'random' || username === '[deleted]'){
        username = getRandomUsername();
    }

    if (username && numComments) {
           
        var userJson = await fetch(
            `https://www.reddit.com/user/${username}.json`
        )
        var userObject = await userJson.json(); //gets comments from reddits json api

        const userProfile = await fetch(    //scrapes reddit profile
            `https://www.reddit.com/user/${username}`
        )
        const userProfileHtml = await userProfile.text();

        const $ = cheerio.load(userProfileHtml);
        const avatarImageSrc = $('[alt="User avatar"]').attr('src');
        const karma = $('[id="profile--id-card--highlight-tooltip--karma"]').text();
        const cakeDay = $('[id="profile--id-card--highlight-tooltip--cakeday"]').text();
        userObject.data.children[0].data.avatarImageSrc = avatarImageSrc;
        userObject.data.children[0].data.karma = karma;
        userObject.data.children[0].data.cakeDay = cakeDay;
        

        

        res.status(200).send(userObject);
       
      
    }
    else if(username) res.status(400).json({ error: 'numComments is required' });        
    
    else if (numComments)  res.status(400).json({ error: 'username is required' });
    
    else res.status(400).json({ error: 'username and numComments are required' });
    

}
function getRandomUsername() {
    /**
     * I had a script written that I was debugging but I came across this
     * site and decided just to use it:
     * copy this code:
     * 
      // define function which accepts body and cheerio as args
        function extract(input, cheerio) {
        // return object with extracted values              
        let $ = cheerio.load(input);
        const usernames = [];
        var string="";
        $('[data-testid="comment_author_link"]').each((i, el) => {
        if (usernames.length < 300) {
            const username = $(el).text();
            if (username !== '[deleted]' && !usernames.includes(username)) {
            usernames.push(username);
            string+=`"${username}",`;
            }
        }
        });
        return {
            usernames: usernames
        };
    }

    into this site: https://scrapeninja.net/cheerio-sandbox/basic
    along with the html from some reddit thread, I chose the most recent leafs game thread.
    Lastly, copy paste the usernames here
     */
    const usernames= [
        "fcole",
        "NOAEL_MABEL","lurkingandstuff","TheKid_BigE","QuiGGz96","exigy1","Clemburger","icydata","BlueeGreen","SerenePotato","hockeydiscussionbot","andy_bmc","my-dicks-sore","FourHockey","kmacedo88","metalhead4","Domesticated_dad","trudenter","Han_Solo_18","poogle","DeathEater91","Eazy-Eid","childofsol","scottyb83","Avko","DreamcastWriter","ifonlyihadaname","catsnotabigdeal","jamsquad87","seasonpasstoeattheas","icybeavertail","russels418teapot","AKShaolin","nas22_","Anerythristic","Moosethought","CarolinaWren15","UpstairsFlat4634","ikolp0987","InsectTop618","justhereformemes8","nah46","mikhailovechkin","MadFonzi","Mikeismyike","dumpandchange","NeonJaguars","ClubMeSoftly","Isthatmyhelmet","Montsegur97","gs181","wererealcheesepeople","toronto_programmer","MoustacheMayhem","RmfCountered","BrightAttack","Bigboyrickx","datsyuks_deke","kgalliso","Dull-Broccoli","vwman18","tranquility1515","bigdinnerbox","Tybackwoods00","thebausher","Dorksim","ThatLineOfTriplets","MRFINEWINE1","hippeteboy","Razziks13","ILikeCoffeeDaily","sw04ca","clevergirls_","The_RoyalPee","AllGoaliesAreTrash","ghost_curse123","Naive-Moose-2734","Chuckolator","doctortre","passive_fist","CaptainCorranHorn","esaul17","RoadDoggFL","pigeonbobble","Madacon","SAG_Bot","rpgguy_1o1","PacketGain","5xad0w","Sss00099","Tycoon004","ScotticusPrime","crazyphyscoman","DewJew","MeanElevator","colonelkorn12","Additional-Air-7851","AmateurChemistry","FlaGator","TheClawwww7667","Savings_Rub4982","The_Dale_Hunters","diamondfaces","Guest2200","whodiditnaylor","BidensProstate","CorpulentMagistrate","HurricanesFan","joe_broke","DogePerformance","BattleSh33p","bleached_n_tiedyed","guardrya","EBXLBRVEKJVEOJHARTB","TheGapInTysonsTeeth","vshun","looples","morbidmovies","TheBigSm0ke","Cheesy_Pita_Parker","No_Angle_8106","th3D4rkH0rs3","Vegas_Knights","lotturm","HanshinFan","tidalbored","Generazn","DontPokeTheCrab","fattsdomino","bspaghetti","ChonkyWumpus","Infinite-Sleep3527","tomwiIson","nousernamex2","d-cent","dhoomsday","crookedboone","WHATAREWEYELINGABOUT","BlueHarvestJ","xepa105","Imagine1","xswicex","sound_forsomething","tehmlem","McBunnyface","thatsong","FrogmanKouki","Frylok1177","Esg876","senorcementtruck","E-rye","dlax15","rocketrae21","seasterbrook",
    ]
    const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
    return randomUser;
}