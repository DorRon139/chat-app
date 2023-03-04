import "./message.css";

type MessageProps = {
  own: boolean;
};

const Message = (props: MessageProps) => {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/4236828/pexels-photo-4236828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span className="messageText">Hello this a message</span>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
