import Markdown from "react-markdown";
import styles from "./Chat.module.css"
import { useEffect, useRef } from "react";

const WELCOME_MESSAGE  = {
    role:"assistant",
    content:"Hello! How can I assist you?",
}

// const content = Array.isArray(content) ? content.join() : content || '';

function Chat({messages}){

  const messageEndRef = useRef(null);
  

  useEffect(() =>{
    messageEndRef.current?.scrollIntoView({ behavior:"smooth"})
  },[messages])

       return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div key={index}
         className={styles.MessageWrapper}
         data-role={role}>
          <div className={styles.Message} data-role={role}>
            <Markdown>{content}</Markdown>
          </div>
        </div>
      ))}
      <div ref={messageEndRef}>

      </div>
    </div>
  );

}

export default Chat;