import * as cheerio from 'cheerio';
export default async function handler(req, res)  {

    var username = req.query.username;
    const numComments = req.query.numComments;
    const offset = req.query.offset || 0;

    if(username === 'random' || username === '[deleted]' || username === 'AutoModerator' || username === ''){
        username = getRandomUsername();
    }

    if (username && numComments) {
           
        try{
            var userJson = await fetch(
            `https://www.reddit.com/user/${username}.json`
            )
            var userObject = await userJson.json(); //gets comments from reddits json api (this is raw json)
            userObject.data.children= userObject.data.children.splice(0, numComments + offset)


            const userProfile = await fetch(    //scrapes reddit profile, gets avatar, karma, and cake day
                `https://www.reddit.com/user/${username}/`
            )
            const userProfileHtml = await userProfile.text();

            if(userProfileHtml.includes('User avatar')) console.log('User avatar found')
            const $ = cheerio.load(userProfileHtml);
            const avatarImage = $('[alt="User avatar"]')
            const avatarImageSrc = avatarImage.attr('src');
            if(!avatarImageSrc) console.log({avatarImage})
            const karma = $('[id="profile--id-card--highlight-tooltip--karma"]').text();
            const cakeDay = $('[id="profile--id-card--highlight-tooltip--cakeday"]').text();
            userObject.data.children[0].data.avatarImageSrc = avatarImageSrc;
            userObject.data.children[0].data.karma = karma;
            userObject.data.children[0].data.cakeDay = cakeDay;

            userObject.data.children = userObject.data.children.splice(offset, numComments)
            res.status(200).send(userObject);

        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: "An error occurred while processing the request." });
            
        }     
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
        "The_Bird_King","99_percent_hot_gas","StratTeleBender","Poptoo","SeeBeeJaay","Mommasandthellamas","crankyankee","BrettEskin","CMMGUY1","NewChallGT20","FairlyPoliticked","WACS_On","Beneficial_Gap5934","tryhard1981","purplepowerpete","throwaway-4557338","GlitteringFutures","fj668","ultimis","Underleft_cdiv","EnterByTheNarrowGate","user_1729","jRok57","iamspartacus5339","Wh1te_Rabb1t","alexp8771","ShillinTheVillain","Jades5150","JBoneTX","Hogsrunwild","TrajantheBold","ConnorMc1eod","WeAreEvolving","LetsGoGators23","cheese_weasel22","Ductard","The1Sundown","IHeartSm3gma","Vektor0","5tudent_Loans","Ainz-Ooal-Gown","Kweefus","Frobix444V2","NickMotionless","Dry-Ad-7732","Remote_Presentation6","Marilynsmom","dtyler88","Chewybass1","gsd_dad","swd120","SevereKnowledge","New_Examination_3754","-BluesDeVille-","saltyoldtexan","Agent_Choocho","johnnyg883","PrometheusOnLoud","bruh_wut69","Extra_Suit1637","OrangeCrush229","stablersvu","WhoAmI1138","TheIncredibleHork","AmazingFlightLizard","Krieg413","wollier12","haydenman","thecoolerllcoolJ","Gzhindra","ChadRex1776","Craineiac","redbullcanloader","PupperMartin74","Haolepino1975","thgail","Ambitious_Western_12","soarin_tech","Creative_Ambassador","dom650","ep302549","phanon1666","PerspectiveOk8157","Maurynna368","paulteaches","jedeye121","eclarke10","massiveboner911","Zedakah","depressedskeptic","SaturnBetsy","Powerwagonlife","char-0311","Successful_Warthog58","DarkLordKefka","idgafpb","ForeverChicago","Espressoyourfeelings","blbh0527","kal_houseofel","Practical_Put_3892","funcouple777969","NanoWarrior26","WilyNGA","mwatwe01","xPineappleshrapnelx","Fickle_Panic8649","annoyedboy671","Xpert285","Slartibartfastthe2nd","Keekoo123","JokicThaGod","KommKarl","Yucca12345678","101fng","WizardVisigoth","DrDufmanKnows","skarface6","CARLOS_DANGER638","RedRightReady","theflyz","Dunkin_Ideho","I_really_think_this","Ateapotist1983","Flare4roach","Green-Apple-KingKong","ApprehensiveLaw9060","WholeFoodsMeerkat","midasbadtouch","jc0vd","Major-Blackbird","Sufficient-Goat-962","nicklepimple","aimferdabushes","RedRose_Belmont","bryyantt","JTuck333","Mustermuss","NeoCentristChad","Zachtyl","TheThunderOfYourLife","WreknarTemper","unikornlover","BobBee13","Substantial_Diver_34","sheayde4979","neutralityparty","Jay-jay1","griffteepdx","Anxiouslycalm10","Josh-Lambo-Tudamoon","CrapWereAllDoomed","Deceivement","stratarch","jimhoff","RedditHatesMe75","jondaddy96","YoMomma-IsNice","gunburns88","Flyz_it_dies","Zealousideal-Ad-8042","birdsnap","Mitch_igan","Brandycane1983","DCGuinn",

    ]
    const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
    return randomUser;
}