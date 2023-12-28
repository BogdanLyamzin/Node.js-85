import { useState, useCallback, useEffect } from "react";
import {nanoid} from 'nanoid';
import io from "socket.io-client";

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";

function App() {
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(()=> {
    if(nickname) {
      const connection = io.connect("http://localhost:4000");
      setSocket(connection);
      connection.on("chat-message", data => {
        setMessages(prevMessages => {
          const {nickname, message} = JSON.parse(data);
          const newMessage = {
            id: nanoid(),
            type: "user",
            nickname,
            message,
          };
          return [newMessage, ...prevMessages];
        });
      })
    }
  }, [nickname])

  const addNickname = useCallback(({nickname}) => setNickname(nickname), []);

  const addMessage = useCallback(({message}) => {
    setMessages(prevMessages => {
      const newMessage = {
        id: nanoid(),
        type: "you",
        nickname,
        message,
      };
      return [newMessage, ...prevMessages];
    });
    socket.emit("chat-message", JSON.stringify({nickname, message}))
  }, [nickname, socket]);

   return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  )
}

export default App;
