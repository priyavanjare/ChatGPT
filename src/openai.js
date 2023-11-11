
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