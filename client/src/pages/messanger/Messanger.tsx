import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { RootState } from "../../app/store";
import { addSocketId, Iuser } from "../../app/user/user.slice";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversations from "../../components/conversations/Conversations";
import { useGetUserFriends } from "../../hooks/useGetUserFriends";
import "./messanger.css";

interface messageProps {
  socket: Socket;
}

const Messanger = (props: messageProps) => {
  const { socket } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userFriends = useSelector((state: RootState) => state.user.userFriends);
  const { mutate, isLoading } = useGetUserFriends();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    currentUser && mutate(currentUser._id);

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

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

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
              {currentUser.friends.map((friendId) => {
                const { _id, username } = currentUser;
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
              {userFriends &&
                userFriends.map((user) => {
                  const { _id, username, isOnline } = user;
                  if (
                    _id !== currentUser._id &&
                    currentUser.friends.includes(_id)
                  ) {
                    return (
                      <ChatOnline
                        key={_id}
                        name={username}
                        isOnline={isOnline}
                      />
                    );
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
