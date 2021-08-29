import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  flex:1;
  flex-direction: column;
  padding:40px;
  padding-top: 0;
  height:100vh;
`;

export const InputContainer = styled.div`
  display: flex;
  height: 50px;
`;

export const Input = styled.input`
  display:flex; 
  flex:1; 
  
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  color: solid black;

  padding-left:15px;
  margin-right:8px;

  border: 2px solid white;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
`;

export const SendButton = styled.button`
  display:flex;
  
  background-color: var(--secundary);

  align-items:center;
  justify-content:center;
  
  padding:15px;
  
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Body = styled.div`
  display:flex;
  flex:1;
  position:relative;
`;


export const TextArea = styled.textarea`
  display:flex;
  flex:1;
  resize:none;
  font-size: 12px;
  overflow-y: auto;
  margin-top:20px;
  padding:20px;
  
  background-color: #FFFF;

`;


export const ButtonReset = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;


  background-color: var(--secundary);
  width:65px;  
  height:65px;  
  border-radius:50%;

  position:absolute;
  right:0;
  bottom:0;
  margin:20px;
`;


export const SelectedContainer = styled.div`
  display:flex;
  position:relative;
  margin-top:35px;
`;



export const SaveButton = styled.button`
  position:absolute;
  text-align:center;

  width:150px;
  height:65px;

  color:white;
  background-color:var(--secundary);
  
  font-size:20px;
  font-family:Dosis;

  border-radius:15px;

  margin-right:50px;
  bottom:20;
  right:0;
`;