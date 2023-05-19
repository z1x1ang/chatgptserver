import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration,OpenAIApi } from 'openai'
const app=express()

env.config()

app.use(cors())
app.use(bodyParser.json())
//Configure open api
const configuration=new Configuration({
    organization:"org-er0TH5Oval1yofmy4BRV2C3j",
    apiKey:process.env.API_KEY
})
const openai =new OpenAIApi(configuration)
//listening
app.listen("3080",()=>console.log("listen on port 3080"));
//dummy route to test
app.get("/",(req,res)=>{
res.send("hello world");
})

//post route
app.post('/',async(req,res)=>{
    const {message}=req.body
    
    try{
        const response=await openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages: [{role: "user", content: message}],
                max_tokens:3100,
        })
        res.json({message:response.data.choices[0].message.content})
    }catch(e){
        console.log(e);
        res.send(e).status(400)
    }
})
