import { jwtDecode } from "jwt-decode"

export function getArray(count : any)
{
    return Array(count).fill(0).map((_, index) => index + 1)
}

export function loggedInStatus()
{
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      console.log("No token found. Redirecting to login...");
      return false;
    }

    try {
      if (isLoggedIn === "true") {
        return true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
    return false;
}

export function checkAdminStatus() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. Redirecting to login...");
      return false;
    }

    try {
      const decoded: any = jwtDecode(token); 
      if (decoded.isAdmin) {
        return true && loggedInStatus();
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
    return false;
};


export const backendBaseURL = "http://localhost:" + process.env.REACT_APP_PORT_NUMBER;