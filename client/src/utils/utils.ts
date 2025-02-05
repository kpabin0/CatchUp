import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { _navItems } from "../data/_navItems";
import { _usefulLinks } from "../data/_footerItems";

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

export async function getURLItemCount(url: string) {
  return (await getURLItem(url)).length
}

export async function getURLItem(url: string) {
  return await axiosW.get(url).then(res => res.data)
}

// get all the recent items
export async function getAllStats() {
  const temp: {title:string, number: number}[] = [];
  let items = [..._navItems, ..._usefulLinks].filter((item) => item.label !== "Home").filter((item) => item.label !== "About Us").filter((item) => item.label !== "Fixtures");
  for(let i=0;i<items.length;++i) {
    temp.push({
      title: items[i].label,
      number: await getURLItemCount(items[i].url)
    })
  }

  return await temp;
}

export async function getRecentItems(count: number) {
  const temp: any = []

  

  return await temp;
}


export const backendBaseURL = "http://localhost:" + process.env.REACT_APP_PORT_NUMBER;

function getURLSepMsg(url: string, a: string = "") {
  return (url.split("/").filter((i) => i !== '')).join("...") + `...${a}...`;
}

const axiosW = axios.create({baseURL: backendBaseURL})


/**
  Wrapper async function for axios fetch/get request from URL, \
  set the value on success and set status on info message (custom hook) \
  ### Note: baseURL already preincluded
  
  args
  - url: backend url (only /enpoint, eg: /news)
  - setRes: If get request was succesful setRes will be called with response data passed to it
  - setInfo: success or failure info updated

  return:
  - the response data if connection was successful, else return error

  `usage: for connecting to http://localhost:8080/news/2, url - /news/2`
*/
export async function AxiosGet(url: string, setRes: any, setInfo: any, setLoading: any = null) {
  const sepMsg = getURLSepMsg(url, "fetch");
  if(setLoading) setLoading(true)

  await axiosW.get(url)
              .then(res => {
                setRes(res.data)
                if(setLoading) setLoading(false)
                setInfo([sepMsg + "sucessful", "success"])
                return res.data;
              })
              .catch(error => {
                setInfo([sepMsg + "error", "error"])
                return error
              })
}

/**
  Wrapper async function for axios post request to given URL, \
  set the value of passed data on success and set status on info message (custom hook) \
  ### Note: baseURL already preincluded
  
  args
  - url: backend url (only /enpoint, eg: /news)
  - data: data to post to the given endpoint
  - setInfo: success or failure info updated

  return:
  - on success response data will be returned, else error

  `usage: for connecting to http://localhost:8080/news/2, url - /news/2`
*/
export async function AxiosPost(url: string, data: any, setInfo: any, setLoading: any = null) {
  const sepMsg = getURLSepMsg("post");
  if(setLoading) setLoading(true)

  await axiosW.post(url, data)
                .then(res => {
                  if(setLoading) setLoading(false)

                  setInfo([sepMsg + "sucessful", "success"])
                  return res.data
                })
                .catch(error => {
                  setInfo([sepMsg + "error", "error"])
                  return error;
                })
}

/**
  Wrapper async function for axios put request to given URL, \
  set the value of passed data on success and set status on info message (custom hook) \
  ### Note: baseURL already preincluded
  
  args
  - url: backend url (only /enpoint, eg: /news)
  - data: data to put to the given endpoint
  - setInfo: success or failure info updated

  return:
  - on success response data will be returned, else error

  `usage: for connecting to http://localhost:8080/news/2, url - /news/2`
*/
export async function AxiosPut(url: string, data: any, setInfo: any, setLoading: any = null) {
  const sepMsg = getURLSepMsg("put");
  if(setLoading) setLoading(true)

  await axiosW.put(url, data)
                .then(res => {
                  if(setLoading) setLoading(false)

                  setInfo([sepMsg + "sucessful", "success"])
                  return res.data
                })
                .catch(error => {
                  setInfo([sepMsg + "error", "error"])
                  return error;
                })
}

/**
  Wrapper async function for axios put request to given URL, \
  set the value of passed data on success and set status on info message (custom hook) \
  ### Note: baseURL already preincluded
  
  args
  - url: backend url (only /enpoint, eg: /news)
  - setInfo: success or failure info updated

  return:
  - on success response data will be returned, else error

  `usage: for connecting to http://localhost:8080/news/2, url - /news/2`
*/
export async function AxiosDelete(url: string, setInfo: any, setLoading: any = null) {
  const sepMsg = getURLSepMsg("delete");
  if(setLoading) setLoading(true)

  await axiosW.delete(url)
                .then(res => {
                  if(setLoading) setLoading(false)

                  setInfo([sepMsg + "sucessful", "success"])
                  return res.data
                })
                .catch(error => {
                  setInfo([sepMsg + "error", "error"])
                  return error;
                })
}