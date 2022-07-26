import { chatRooms } from "../../data/chatRooms";
import { Link } from 'react-router-dom';
import './styles.css';

function Landing() {
  return (
    <>
        <h2>Choose a chat room</h2>
        <ul className="chat-room-list">
            {chatRooms.map((room) => (
                <li key={room.id}>
                    <Link to={`/room/${room.id}`}>{room.title}</Link>
                </li>
            ))}
        </ul>
    </>
  );
}

export { Landing };
