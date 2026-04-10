import RoomCard from "./RoomCard"



type Room = {
  roomid: number
  room_title: string
  room_price: number
  room_url: string
  room_description?: string
  room_tag?: string
  room_capacity?: string
}

type Props = {
  category: string
  rooms: Room[]
  description?: string
}

const RoomSlider = ({ category, rooms, description }: Props) => {
  if (!rooms.length) {
    return null
  }

  return (
    <section className="slider-section">
      <div className="slider-head">
        <h3>{category}</h3>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="slider">
        {rooms.map((room) => (
          <RoomCard key={room.roomid} {...room} />
        ))}
      </div>
    </section>
  )
}

export default RoomSlider
