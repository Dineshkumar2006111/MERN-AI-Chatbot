const express = require('express')
const router = express.Router()
const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI(
    {
        apikey:process.env.GEMINI_API_KEY
    }
)

router.post('/', async(req,res)=>{
    const {message} = req.body;

    if(!process.env.GEMINI_API_KEY){
        return res.status(500).json({"error":"api key is required"})
    }

    if(!message || !message.trim()){
        return res.status(400).json({"error":"Question is required..."})
    }

    try{
        const response = await ai.models.generateContent({
            model:"gemini-3.6-flash",
            contents : message
        })
    
        res.json({reply:response.text})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }
    


})

module.exports = router