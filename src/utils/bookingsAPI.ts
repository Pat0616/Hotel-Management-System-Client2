import { apiRequest } from "./RestAPI";

export function getByRoomBooking(roomid: number) {
return apiRequest("/api/booking/getbyroom", {
method: "POST",
body: JSON.stringify({ roomid }),
});
}


export function createBooking(roomid: number, guestid: number, checkin_date: string, checkout_date: string, fullname: string, country: string, address: string) {
return apiRequest("/api/booking/create", {
method: "POST",
body: JSON.stringify({ roomid, guestid, checkin_date, checkout_date, fullname, country, address }),
});
}

export function getByRoomId(guestid: number, roomid: number) {
return apiRequest("/api/booking/getbyid", {
method: "POST",
body: JSON.stringify({ guestid, roomid }),
});
}


export function getBookingsByGuest(guestid: number){
return apiRequest("/api/booking/getbyguest", {
method: "POST",
body: JSON.stringify({ guestid }),
});
}

export function massUpdateBooking(){
return apiRequest("/api/booking/alldata", {
method: "PATCH",
body: JSON.stringify({}),
});
}

