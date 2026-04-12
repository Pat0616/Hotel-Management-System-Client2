import { apiRequest } from "./RestAPI";

export function getRoomCard(room_category: string) {
  return apiRequest("/api/room/getcard", {
    method: "POST",
    body: JSON.stringify({ room_category }),
  });
}

export function getOneRoom(roomid: number) {
  return apiRequest(`/api/room/getone/${roomid}`, {
    method: "GET",
  });
}

export function createRoom(room: {
  room_title: string;
  room_description: string;
  room_price: number;
  room_url: string;
  room_availability: string;
  room_category: string;
  room_capacity: string;
  room_tag: string;
}) {
  return apiRequest("/api/room/create", {
    method: "POST",
    body: JSON.stringify(room),
  });
}

export function updateRoom(
  roomid: number,
  room: {
    room_title: string;
    room_description: string;
    room_price: number;
    room_url: string;
    room_availability: string;
    room_category: string;
    room_capacity: string;
    room_tag: string;
  }
) {
  return apiRequest(`/api/room/update/${roomid}`, {
    method: "PUT",
    body: JSON.stringify(room),
  });
}