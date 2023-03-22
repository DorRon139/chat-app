import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../app/store";
import { addSocketId, userInterface } from "../../app/user/user.slice";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversations from "../../components/conversations/Conversations";
import "./messanger.css";

const USERS_DUMMY_DATA: userInterface[] = [
  {
    _id: "1234",
    username: "Dor Ron",
    email: "dor@ron.gmail.com",
    password: "123",
    friends: ["5678", "4321", "1243"],
  },
  {
    _id: "5678",
    username: "Inbar Mossery",
    email: "inbar@mossery.gmail.com",
    password: "123",
    friends: ["1234", "4321"],
  },
  {
    _id: "4321",
    username: "Liraz Ron",
    email: "liraz@ron.gmail.com",
    password: "123",
    friends: ["1234"],
  },
  {
    _id: "1243",
    username: "Idan Ron",
    email: "idan@ron.gmail.com",
    password: "123",
    friends: ["1234"],
  },
];

interface messageProps {
  socket: Socket;
}

const Messanger = (props: messageProps) => {
  const { socket } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("new_user", currentUser);
    });

    socket.on("update_user_socketId", async (socketID) => {
      await dispatch(addSocketId(socketID));
    });

    socket.on("users_online", (users) => {
      setOnlineUsers(users);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <h2>{currentUser.username}</h2>
      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <>
              <input
                placeholder="Search for friend"
                className="chatMenuInput"
              />
              {USERS_DUMMY_DATA.map((user) => {
                const { _id, username } = user;
                if (
                  _id !== currentUser._id &&
                  currentUser.friends.includes(_id)
                )
                  return (
                    <Conversations key={_id} name={username} userId={_id} />
                  );
              })}
            </>
          </div>
        </div>

        <ChatBox socket={socket} />

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <>
              {onlineUsers.map((user) => {
                const { _id, name, isOnline } = user;
                if (
                  _id !== currentUser._id &&
                  currentUser.friends.includes(_id)
                ) {
                  return <ChatOnline key={_id} name={name} />;
                }
              })}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
