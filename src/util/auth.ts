import { redirect } from "react-router-dom";

export function getTokenExpiration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationTime = new Date(storedExpirationDate!).getTime();
    const nowTime = new Date().getTime();
    return expirationTime - nowTime;
}
export function getAuthToken(){
    const token = localStorage.getItem('token');
    if(!token){
        return null;
    }
    const tokenDuration = getTokenExpiration();
    if(tokenDuration < 0) return 'EXPIRED';
    return token;
}
export function tokenLoader():string|null{
    return getAuthToken();
}
// protecting a route
export function checkAuthLoader(){
    const token = getAuthToken();
    if(!token){
        return redirect('/auth?mode=signup');
    }
    // loaders should return something or null
    return null;
}