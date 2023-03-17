import "./chatOnline.css";

interface chatOnlineProps {
  name: string;
}

const ChatOnline = ({ name }: chatOnlineProps) => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://images.pexels.com/photos/4236828/pexels-photo-4236828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{name}</span>
      </div>
    </div>
  );
};

export default ChatOnline;
