import { apiRequest } from "./RestAPI";

export function getByRoomBooking(roomid: number) {
return apiRequest("/api/booking/getbyroom", {
method: "POST",
body: JSON.stringify({ roomid }),
});
}


export function createBooking(roomid: number, guestid: number, checkin_date: string, checkout_date: string) {
return apiRequest("/api/booking/create", {
method: "POST",
body: JSON.stringify({ roomid, guestid, checkin_date, checkout_date }),
});
}

