
import { useEffect, useState } from 'react';
import './App.css';
const fortunes = [
  '운이 좋을 거예요.',
  '조심하세요.',
  '긍정적인 결과를 얻을 수 있을 거예요.',
  '도전하세요.',
  '주의하세요.',
  '좋은 일이 생길 거예요.',
];

function App() {
  const [test, setTest] =useState("");
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { text: inputValue, type: 'user' };
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      newMessage,
    ]);
    const newResponse = await getFortune();
    console.log(newResponse);
 
    const newResponseMessage = { text: newResponse, type: 'bot' };

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      newResponseMessage,
    ]);
    setInputValue('');
  };

  const getFortune = async () => {
    try{
      const response = await fetch('http://localhost:3001/fortune',{
        method: "POST",
        headers:{
          'Content-Type': "application/json"
        },
        body: JSON.stringify({name: 'john'})
      })
      const data = await response.json();
      const result = data.assistant;
      return result.toString();
    }catch(error){
      console.error(error)
    }
  };

  




  return (
    <div className="container">
    <h1>GPT CHAT Test</h1>
    <div className="chat-container">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`message ${message.type === 'user' ? 'user' : 'bot'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
    <form>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSubmit} >전송</button>
    </form>
  </div>
  );
}

export default App;



