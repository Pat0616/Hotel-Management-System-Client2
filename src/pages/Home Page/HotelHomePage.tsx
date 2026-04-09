import '../../components/global.css'
import Hero from '../../components/Hero Component/HeroComponent';
import RoomSlider from '../../components/Room Slider Component/RoomSliders'
import {useState, useEffect} from 'react'
import { getRoomCard } from '../../utils/roomsAPI';

const standardRooms = [
  {
    roomid: 1,
    room_title: "Standard Room 1",
    room_price: 80,
    room_url: "https://picsum.photos/400/250?1"
  },
  {
    roomid: 2,
    room_title: "Standard Room 2",
    room_price: 80,
    room_url: "https://picsum.photos/400/250?2"
  },
  {
    roomid: 31,
    room_title: "Standard Room 3",
    room_price: 90,
    room_url: "https://picsum.photos/400/250?3"
  },
  {
    roomid: 3,
    room_title: "Standard Room 4",
    room_price: 105,
    room_url: "https://picsum.photos/400/250?4"
  },
  {
    roomid: 4,
    room_title: "Standard Room 5",
    room_price: 80,
    room_url: "https://picsum.photos/400/250?5"
  },
  {
    roomid: 5,
    room_title: "Standard Room 6",
    room_price: 90,
    room_url: "https://picsum.photos/400/250?6"
  },
  {
    roomid: 6,
    room_title: "Standard Room 7",
    room_price: 95,
    room_url: "https://picsum.photos/400/250?7"
  }
]

const premiumRooms = [
  {
    roomid: 7,
    room_title: "Premium Room 1",
    room_price: 120,
    room_url: "https://picsum.photos/400/250?8"
  },
  {
    roomid: 8,
    room_title: "Premium Room 2",
    room_price: 130,
    room_url: "https://picsum.photos/400/250?9"
  },
  {
    roomid: 9,
    room_title: "Premium Room 3",
    room_price: 130,
    room_url: "https://picsum.photos/400/250?10"
  },
  {
    roomid: 10,
    room_title: "Premium Room 4",
    room_price: 130,
    room_url: "https://picsum.photos/400/250?11"
  },
  {
    roomid: 11,
    room_title: "Premium Room 5",
    room_price: 130,
    room_url: "https://picsum.photos/400/250?12"
  },
  {
    roomid: 12,
    room_title: "Premium Room 6",
    room_price: 130,
    room_url: "https://picsum.photos/400/250?13"
  }
]

const deluxeRooms = [
  {
    roomid: 13,
    room_title: "Deluxe Suite 1",
    room_price: 200,
    room_url: "https://picsum.photos/400/250?14"
  },
  {
    roomid: 14,
    room_title: "Deluxe Suite 2",
    room_price: 220,
    room_url: "https://picsum.photos/400/250?15"
  },
  {
    roomid: 15,
    room_title: "Deluxe Suite 3",
    room_price: 220,
    room_url: "https://picsum.photos/400/250?16"
  },
  {
    roomid: 16,
    room_title: "Deluxe Suite 4",
    room_price: 220,
    room_url: "https://picsum.photos/400/250?17"
  },
  {
    roomid: 17,
    room_title: "Deluxe Suite 5",
    room_price: 220,
    room_url: "https://picsum.photos/400/250?18"
  },
  {
    roomid: 18,
    room_title: "Deluxe Suite 6",
    room_price: 220,
    room_url: "https://picsum.photos/400/250?19"
  }
]

type RoomCardDetails = {
    roomid: number;
    room_title: string,
    room_price: number,
    room_url: string;
}


function HotelHomePage()
{
    const [roomCardDetailsSamp, setRoomCardDetailsSamp] = useState<RoomCardDetails[]>([]);

    const GetCardDetailsByCategory = async (category: string) =>
    {
        const res = await getRoomCard(category);
        setRoomCardDetailsSamp(res);
        console.log(res);
    }

    useEffect(()=>{
        GetCardDetailsByCategory("Single");
    },[])

    return(
        <>                    
                    <Hero></Hero>

                    <div className='roomselection-container'>
                        <RoomSlider category="Standard Rooms" rooms={standardRooms} />
                        <RoomSlider category="Premium Rooms" rooms={premiumRooms} />
                        <RoomSlider category="Deluxe Rooms" rooms={deluxeRooms} />
                        <RoomSlider category="Room Sample" rooms={roomCardDetailsSamp} />
                    </div>
                    
                   
        </>
    )
}

export default HotelHomePage;