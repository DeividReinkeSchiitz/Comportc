import React, { useEffect, useRef, useState } from 'react';

import ArrowIcon from "../../assets/Icons/ArrowIcon";
import ClearIcon from "../../assets/Icons/ClearIcon";

import {
  Container,
  InputContainer,
  Input,
  SendButton,
  TextArea,
  SelectedContainer,
  ButtonReset,
  SaveButton as StartButton,
  Body
} from "./styles";

import SelectedInput from "../../Components/SelectedInput";

const {ipcRenderer} = window.require('electron');



const baudOptions = [
  { value: "300", label: "Baud 300" },
  { value: "1200", label: "Baud 1200" },
  { value: "4800", label: "Baud 4800" },
  { value: "9600", label: "Baud 9600" },
  { value: "19200", label: "Baud 19200" },
  { value: "38400", label: "Baud 38400" },
  { value: "57600", label: "Baud 57600" },
  { value: "74880", label: "Baud 74880" },
  { value: "115200", label: "Baud 115200" },
  { value: "230400", label: "Baud 230400" },
  { value: "250000", label: "Baud 250000" },
  { value: "500000", label: "Baud 500000" },
  { value: "1000000", label: "Baud 1000000" },
  { value: "2000000", label: "Baud 2000000" },
]


function Home() {

  const [textAreaMessage, setTextAreaMessage] = useState('');
  const [message, setMessage] = useState("");
  const [baud, setBaud] = useState("baud");
  const [serial, setSerial] = useState("serial");
  const [serialOptions, setSerialOptions] = useState("serial");
  const [started, setStarted] = useState(false);
  const inter = useRef()
  
  useEffect(()=>{
    if(started){
      clearInterval(inter.current);
        inter.current = setInterval(()=>{
          // READ VALUES WRITED
        if (!baud.value  || !serial.value) {
          clearInterval(inter.current)
        }else{
          ipcRenderer.send("READED", {
            baud:baud.value,
            serial:serial.value,
          });
        }
      },200)
    }
  },[started])

  useEffect(()=>{
    ipcRenderer.on("READED" , (event, arg)=>{
      if (arg) {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let seconds = date.getSeconds();
    
        if (seconds <= 9) {
          seconds = '0'.concat(seconds);
        }
        const newMessage = `${textAreaMessage} ${hours}:${minutes}:${seconds} 𝐑𝐞𝐚𝐝𝐞𝐝: ${arg} \n`;
        setTextAreaMessage(newMessage);
        _alwaysBottom();
      }
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners('READED');
    };
  },[textAreaMessage])

  useEffect(() => {   
    // LIST AVAIABLE PORTS
    ipcRenderer.on('PORT_AVAIABLE',(event,arg)=>{
      let options = []   

      for (let index = 0; index < arg.length; index++) {
        options.push({
          value: arg[index], label: arg[index] 
        })
      }
       setSerialOptions(options);
    });
  }, [])


  const messageChange = (event) => {
    setMessage(event.target.value);
  }

  const baudChange = (value) => {
    setBaud(value);
  }

  const serialChange = (value) => {
    setSerial(value);
  }

  const _alwaysBottom = () => {
    var textarea = document.getElementById('textarea_id');
    textarea.scrollTop = textarea.scrollHeight;
  }

  const sendText = () => {
    if(started){
      ipcRenderer.send("SEND_TEXT", {
        baud:baud.value,
        serial:serial.value,
        text: message
      });
      
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let seconds = date.getSeconds();
        
        if (seconds <= 9) {
          seconds = '0'.concat(seconds);
        }
        
        const newMessage = `${textAreaMessage} ${hours}:${minutes}:${seconds} 𝐒𝐞𝐧𝐝𝐞𝐝: ${message} \n`;
        setTextAreaMessage(newMessage);
        _alwaysBottom();
      }
      setMessage("");
    }
    
    const clearTextArea = () => {
      setTextAreaMessage("");
    }
    
    const startClicked = () => {
      if(started){
        ipcRenderer.send('CLOSE_PORT');
        clearInterval(inter.current)
      }
      setStarted(!started)
    }
    return (
      <Container>
      <SelectedContainer>
        <SelectedInput title="Serial Port" value={serial} onChange={serialChange} options={serialOptions} onClick={()=>{
          ipcRenderer.send('PORT_AVAIABLE');
        }}/>
        <SelectedInput title="Baud" value={baud} onChange={baudChange} options={baudOptions} />
        <StartButton onClick={startClicked}>
            {started?'STOP':'START'}
        </StartButton>
      </SelectedContainer>

      <InputContainer>
        <Input
          placeholder={"Send your Message"}
          value={message}
          onChange={messageChange}
          type="text"
          onKeyDown={(event)=>{if (event.key === 'Enter') sendText()}}
        />
        <SendButton type="submit" value="Submit" onClick={sendText}> 
          <ArrowIcon />
        </SendButton>
      </InputContainer>

      <Body>
        <TextArea id='textarea_id' value={textAreaMessage} disabled />
        <ButtonReset onClick={clearTextArea}>
          <ClearIcon />
        </ButtonReset>
      </Body>

    </Container>
  )
}
export default Home;