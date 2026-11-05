import { useState } from 'react'

import styles from './App.module.css'
import Chat from './components/Chat/Chat'
import Control from './components/Controls/control'
import Loader from './components/Loader/Loader'

import { GoogleGenerativeAI } from '@google/generative-ai'


const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
const gemini = googleai.getGenerativeModel({ model: "gemini-2.5-flash" });
const chat = gemini.startChat({ history: [] });



function App() {
  const [message, setMessage] = useState([])
  const [isloading, setIsLoading ] = useState(false)

    function addMessage(message) {
    setMessage((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content){
    addMessage({content,role:'user'})
    setIsLoading(true)

        try {
      const result = await chat.sendMessage(content);
      addMessage({ content: result.response.text(), role: "assistant" });
    } catch {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    } finally{
      setIsLoading(false)
    }
  }

  //   function handleContentSend(content) {
  //   setMessage((prevMessages) => [...prevMessages, { content, role: "user" }]);
  // }

 

  return (
      <div className={styles.App}>

        {isloading && <Loader />}

        <div className={styles.SplitWrapper}>

          <aside className={styles.BrandPanel} aria-label="ChatMate branding">
            <div className={styles.BrandInner}>
              <img className={styles.Logo} src="https://cdn-icons-png.flaticon.com/512/13889/13889187.png" alt="ChatMate" />
              <h1 className={styles.Title}>ChatMate</h1>
              <p className={styles.Tagline}>Your Smart AI Companion</p>
            </div>
          </aside>

          <section className={styles.ChatPanel}>
            <div className={styles.ChatContainer}> <Chat messages={message} /> </div>
            <Control isDisabled={isloading} onSend={handleContentSend} />
          </section>

        </div>
      </div>
  )
}


// const MESSAGES = [
//   {
//     role:"user",
//     content: "Lorem jhwbca bwehab hbwecabcwa  ,ewbaec uedwaedabef bweyqbaywf bwyeabychwhcfe bqcyahwe",

//   },
//   {
//     role:"assistant",
//     content: "Lorem jhwbca bwehab hbwecabcwa  ,ewbaec webqayfcw wbeyeyfche ibewbacfhq ihbwucqhhewhbwc e",

//   }, 
//   {
//     role:"user",
//     content: "Lorem jhwbca bwehab hbwecabcwa  ,ewbaec webqayfcw wbeyeyfche ibewbacfhq ihbwucqhhewhbwc e",

//   },  
//   {
//     role:"assistant",
//     content: "Lorem jhwbca bwehab hbwecabcwa  ,ewbaec webqayfcw wbeyeyfche ibewbacfhq ihbwucqhhewhbwc e",

//   },  
//   {
//     role:"user",
//     content: "Lorem jhwbca bwehab hbwecabcwa  ,ewbaec webqayfcw wbeyeyfche ibewbacfhq ihbwucqhhewhbwc e",

//   },
//   {
//     role:"assistant",
//     content: "Lorem jhwbca bwehab hbwecabcwa  ,ewbaec webqayfcw wbeyeyfche ibewbacfhq ihbwucqhhewhbwc e",

//   },
  
// ]

export default App;
