import React, { useState ,useEffect } from "react";
import { Button, Form, ListGroup } from 'react-bootstrap';
const axios = require('axios');
export default function Message() {


    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
  
  
    function sendMessage(e) {
      e.preventDefault();
  
      console.log("text: ", text);
  
      setMessages((prev) => {
        return [{ sender: "user", text: text }, ...prev];
      });
  
      axios.post(`http://localhost:7001/talktochatbot`, {
        text: text
      })
        .then((response) => {
          console.log("response", response.data.text);
  
          setMessages((prev) => {
            return [{ sender: "bot", text: response.data.text }, ...prev];
          });
          e.target.reset();
          setText("");
  
        }).catch(error => {
          console.log("error: ", error);
  
          setMessages((prev) => {
            return [{ sender: "bot", text: "dummy response from chatbot" }, ...prev,];
          });
          e.target.reset();
          setText("");
  
        })
    }
  
    return (
      <div>
  
        <Form onSubmit={sendMessage}>
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "space-between"
            }} className="mb-3" controlId="formBasicEmail">
  
            <Form.Control
              onChange={(e) => { setText(e.target.value) }}
              type="text"
              placeholder="Enter your message"
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
  
        <br />
        <br />
        <br />
  
        <div style={{ display: "flex", flexDirection: "column" }}>
  
          {messages?.map((eachMessage, eachMessageIndex) => (
            <div key={`${eachMessageIndex}-message`} style={{
              display: "flex",
              justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start"
            }}>
              <div>{eachMessage.text}</div>
            </div>
          ))}
  
        </div>
      </div>
    );
}