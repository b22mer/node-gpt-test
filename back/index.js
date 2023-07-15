const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
var cors = require("cors");
const app = express()

// let corsOptions ={
//   origin :"https://www.domain.com",
//   credential: true,
// }
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.post('/fortune', async function (req, res) {
 
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      temperature: 0.5,
      messages: [
        { role: "system", content: "너는 최고의 트레이너야" },
        { role: "user", content: "너는 최고의 트레이너야" },
        { role: "assistant", content: "안녕하세요 저는 로니콜먼입니다." }, // 조언자(assistant)의 응답을 받을 메시지
        { role: "user", content: "오늘 내 운동루틴 알려줘 가슴운동 할거야." },
      ],
    });

    let fortune = completion.data.choices[0].message['content']; 
    res.json({"assistant": fortune});
})

app.listen(3001)


const configuration = new Configuration({
  apiKey: ""
});
const openai = new OpenAIApi(configuration);







