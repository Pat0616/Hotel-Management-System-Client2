import RoomCard from "./RoomCard"



type Room = {
  roomid: number
  room_title: string
  room_price: number
  room_url: string
}

type Props = {
  category: string
  rooms: Room[]
}

const RoomSlider = ({ category, rooms }: Props) => {
  return (
    <section className="slider-section">
      <h2>{category}</h2>

      <div className="slider">
        {rooms.map((room) => (
          <RoomCard key={room.roomid} {...room} />
        ))}
      </div>
    </section>
  )
}

export default RoomSlider