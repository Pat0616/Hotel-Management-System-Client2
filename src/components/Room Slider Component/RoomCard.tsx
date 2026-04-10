import { Link } from 'react-router-dom'

type RoomCardProps = {
  roomid: number
  room_title: string
  room_price: number
  room_url: string
  room_description?: string
  room_tag?: string
  room_capacity?: string
}

const RoomCard = ({
  roomid,
  room_title,
  room_price,
  room_url,
  room_description,
  room_tag,
  room_capacity,
}: RoomCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US').format(room_price)
  const safeImageUrl = room_url || `https://picsum.photos/640/420?room-${roomid}`

  return (
    <article className="room-card">
      <div className="room-card-media">
        <img src={safeImageUrl} alt={room_title} />
        <span className="room-card-badge">{room_tag || 'Signature Suite'}</span>
      </div>

      <div className="room-card-body">
        <h4>{room_title}</h4>
        <p className="room-card-copy">
          {room_description || 'Enjoy elevated comfort with curated amenities and modern coastal interiors.'}
        </p>
        <div className="room-card-meta">
          <span className="room-card-chip">{room_capacity || '2 Guests'}</span>
          <span className="room-card-chip">Breakfast Included</span>
        </div>
      </div>

      <div className="room-card-footer">
        <p className="room-card-price">
          <strong>${formattedPrice}</strong> / night
        </p>
        <Link to={`/room/${roomid}`} className="btn btn-primary room-card-select-btn">
          View Room
        </Link>
      </div>
    </article>
  )
}

export default RoomCard
