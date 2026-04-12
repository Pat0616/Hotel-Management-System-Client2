import { apiRequest } from "./RestAPI";

export function getRoomCard(room_category: string) {
return apiRequest("/api/room/getcard", {
method: "POST",
body: JSON.stringify({ room_category }),
});
}

export function getOneRoom(roomid: number)
{
    return apiRequest(`/api/room/getone/${roomid}`,{
        method: "GET",
    } )
}