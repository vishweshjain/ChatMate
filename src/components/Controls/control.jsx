
import { useEffect,useRef, useState } from "react"
import styles from "./control.module.css"
import TextareaAutosize from 'react-textarea-autosize'

export default function Control({isDisabled = false, onSend}){

    const textareaRef = useRef(null)
    const [content, setContent] = useState("")

    useEffect(()=>{
        if(!isDisabled){
            textareaRef.current.focus()
        }
    }, [isDisabled])

    function handleContent(e){

        setContent(e.target.value)
    }

    function handleButton(){
        if(content.length > 0){
            onSend(content)
            setContent("")
        }
    }

     function handleEnterPress(e){
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            handleButton()
        }
    }

    return(

        <div className= {styles.Controls} >
            <div className={styles.TextAreaContainer}>
                <TextareaAutosize className={styles.TextArea} 
                ref={textareaRef}
                disabled ={isDisabled}
                placeholder="Write Here..."
                value={content}
                minRows={1}
                maxRows={4}
                onChange={handleContent}
                onKeyDown={handleEnterPress}>
                
                </TextareaAutosize>
            </div>
            <button aria-label="Send message" onClick={handleButton} disabled={isDisabled} className={styles.Button}> <SendIcon /> </button>
        </div>
    )
}

function SendIcon(){

    return(
        <img src="/send.png" alt="" />
    )
}