import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../app/store";
import { addSocketId } from "../../app/user/user.slice";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversations from "../../components/conversations/Conversations";
import "./messanger.css";

export interface userInterface {
  _id: string;
  socketID?: string;
  name: string;
  friends: string[];
}

const USERS_DUMMY_DATA: userInterface[] = [
  {
    _id: "1234",
    name: "Dor Ron",
    friends: ["5678", "4321", "1243"],
  },
  {
    _id: "5678",
    name: "Inbar Mossery",
    friends: ["1234", "4321"],
  },
  {
    _id: "4321",
    name: "Liraz Ron",
    friends: ["1234"],
  },
  {
    _id: "1243",
    name: "Idan Ron",
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
      <h2>{currentUser.name}</h2>
      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <>
              <input
                placeholder="Search for friend"
                className="chatMenuInput"
              />
              {USERS_DUMMY_DATA.map((user) => {
                const { _id, name } = user;
                if (
                  _id !== currentUser._id &&
                  currentUser.friends.includes(_id)
                )
                  return <Conversations key={_id} name={name} userId={_id} />;
              })}
            </>
          </div>
        </div>

        <ChatBox socket={socket} user={currentUser} />

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
