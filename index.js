const prompt = require('prompt-sync')()
const path = require('path')
const fs = require('fs')

const speechFile = path.resolve("./speech.mp3");



let requestURL = "https://shortstories-api.onrender.com/"

async function fetchData(requestURL){
    const response = await fetch(requestURL)
    const data = await response.json()
    console.log(data.story)
    return data.story
}






// fetchData(requestURL)



async function fetchData2(storyTeller){
    let voice= "https://api.openai.com/v1/audio/speech"
    
    const options = {
        method: "POST",
        headers:{
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
            model: "tts-1",
            input: storyTeller,
            voice: "alloy"
        })
    };
    const mp3 = await fetch(voice, options)
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
}

// fetchData2(storyTeller);

async function main(){
    console.log('Let me read a story to you!');
    const message = await fetchData(requestURL)
    const message2 =  await fetchData2(message)


    
}

main()


// if(choice === '1'){
//     const storyName = prompt('Please read me a story')

// }