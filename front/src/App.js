
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [test, setTest] =useState("");
  useEffect( ()=>{
    
    const anothreFunc= async()=>{
      try{
        const response = await fetch('http://localhost:3000/fortune',{
          method: "POST",
          headers:{
            'Content-Type': "application/json"
          },
          body: JSON.stringify({name: 'john'})
        })
        const data = await response.json();
        setTest(data["assistant"]);
        console.log(data);
      }catch(error){
        console.error(error)
      }
    } 
    anothreFunc();
  },[test])





  return (
    <div className="App">
      {test}
    </div>
  );
}

export default App;
