import "./conversations.css";

interface conversationProps {
  name: string;
  userId: string;
}

const Conversations = ({ userId, name }: conversationProps) => {
  // const conversationClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   console.log(userId);
  // };

  return (
    <div className="conversation">
      <img
        className="converstionImg"
        src="https://images.pexels.com/photos/4236828/pexels-photo-4236828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <span className="conversationName">{name}</span>
    </div>
  );
};

export default Conversations;
