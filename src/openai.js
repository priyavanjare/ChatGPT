// const {Configuration,OpenAIApi}=require("openai")

// const configuration = new Configuration({apikey:"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"})
// const openAiApi = new OpenAIApi(configuration)

import OpenAI from 'openai';

const openAiApi = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenApi (message){
const res = await openAiApi.completions.create({
    model:"text-davinci-003",
    prompt:message,
    temperature:0.7,
    max_tokens:256,
    top_p:1,
    frequency_penalty:0,
    presence_penalty:0
})
return res.choices[0].text
}