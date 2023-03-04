import ChatOnline from '../components/chatOnline/ChatOnline'
import Conversations from '../components/conversations/Conversations'
import Message from '../components/message/Message'
import './messanger.css'

const Messanger = () => {
  return (
    <div className='messanger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="Search for friend" className='chatMenuInput' />
                <Conversations />
                <Conversations />
                <Conversations />
                <Conversations />
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message own={true}/>
                    <Message />
                    <Message own={true}/>
                    <Message />
                    <Message own={true}/>
                    <Message />   <Message own={true}/>
                    <Message />
                    <Message own={true}/>
                    <Message />
                    <Message own={true}/>
                    <Message />
                </div>
                <div className="chatBoxBottom">
                    <textarea className="chatMessageInput" placeholder='write somethin...'></textarea>
                    <button className='chatSubmitButton'>Send</button>
                </div>
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
               <ChatOnline /> 
            </div>
        </div>
    </div>
  )
}

export default Messanger