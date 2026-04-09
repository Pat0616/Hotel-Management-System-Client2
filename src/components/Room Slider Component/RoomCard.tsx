import {Link} from 'react-router-dom'

type RoomCardProps = {
  roomid: number
  room_title: string
  room_price: number
  room_url: string
}

const RoomCard = ({ roomid, room_title, room_price, room_url }: RoomCardProps) => {
  return (
    <Link to={`/room/${roomid}`} className="room-card">
      <img src={room_url} alt={room_title} />
      <div className="room-info">
        <h3>{room_title}</h3>
        <p>${room_price} / Night</p>
      </div>
    </Link>
  )
}

export default RoomCard