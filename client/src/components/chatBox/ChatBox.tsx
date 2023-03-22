import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../app/store";
import Message from "../message/Message";
import "./chatBox.css";

interface chatBoxProps {
  socket: Socket;
}

interface messageInterface {
  _id: string;
  socketId: string;
  value: string;
  userId: string;
}

const ChatBox = ({ socket }: chatBoxProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [messages, setMessages] = useState<Array<messageInterface>>([]);
  const [value, setValue] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const sendMessageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit("send_message", { userId: currentUser._id, value });
    setValue("");
    console.log("Sending a message");
  };

  useEffect(() => {
    const newMessageHandler = async (newMessage: messageInterface) => {
      await setMessages((oldMessages) => [...oldMessages, newMessage]);
    };
    socket.on("send_message_to_client", newMessageHandler);

    return () => {
      socket.off("send_message_to_client");
    };
  }, [socket, currentUser]);

  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {messages.map((message: messageInterface) => {
            return message.userId === currentUser._id ? (
              <Message key={message._id} own={true} text={message.value} />
            ) : (
              <Message key={message._id} own={false} text={message.value} />
            );
          })}
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="write somethin..."
            value={value}
            onChange={onChangeHandler}
          ></textarea>
          <button className="chatSubmitButton" onClick={sendMessageHandler}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
