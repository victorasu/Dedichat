import { Link, useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";

function ChatRoom() {
  const params = useParams();

  const room = chatRooms.find((x) => x.id === params.id);
  if (!room) {
    //todo: implement 404
  }

  return (
    <>
      <h2>{room.title}</h2>
      <div>
        <Link to="/">⬅️ Go back</Link>
      </div>
      <div className="messages-container">
        <MessageList roomId={room.id} />
        <MessageInput roomId={room.id} />
      </div>
    </>
  );
}

export { ChatRoom };
