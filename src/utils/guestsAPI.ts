import { apiRequest } from "./RestAPI";

export function guestRegister(guest: string, password: string, email: string) {
return apiRequest("/api/guest/register", {
method: "POST",
body: JSON.stringify({ guest, password, email }),
});
}


export function guestLogin(guest: string, password: string) {
return apiRequest("/api/guest/login", {
method: "POST",
body: JSON.stringify({ guest, password }),
});
}


export function guestLogout() {
return apiRequest("/api/guest/logout", {
method: "POST",
});
}

export function guestMe()
{
   return apiRequest("/api/guest/me", {
    method: "GET",
}); 
}
