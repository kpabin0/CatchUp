import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { _entriesItems } from "../data/_navItems";

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
  return (await axiosW.get(url+'/count')).data;
}

export async function getURLItem(url: string) {
  return (await axiosW.get(url)).data
}

export async function getURLEntries(url: string, count: number) {
  // console.log(url + '/entries');
  return (await axiosW.get(url + '/entries/' + count)).data
  // return (await axiosW.get(url + '/entries/' + count))
}

// get all the recent items
export async function getAllStats() {
  const temp: {title:string, number: number}[] = [];
  let items = _entriesItems;
  try {
    for(let i=0;i<items.length;++i) {
      temp.push({
        title: items[i].label,
        number: (await getURLItemCount(items[i].url))
      })
    }
  } catch(error) {
    console.log(error)
  }
  return await temp;
}

export async function getAllEntries(count: number) {
  const temp: any[] = [];
  let items = _entriesItems;
  items.push()
  try {
    for(let i=0;i<items.length;++i) {
      temp.push({
        name: items[i].label,
        items: await getURLEntries(items[i].url, count)
      })
    }
  } catch(error) {
    console.log(error)
  }

  // console.log(temp)

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
export async function AxiosGet(url: string, setRes: any, setInfo: any, fallbackCb: any = null, setLoading: any = null) {
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
                setInfo([sepMsg + "error! Rolling Fallbacks", "error"])
                if(fallbackCb) setTimeout(() => setRes(fallbackCb()), 1500)
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


// Some fallbacks for vercel...
const fallbackCount = 5;
const _temp = getArray(fallbackCount);

export function _fallbackMatches() {
  return _temp.map((i, ind) => {
    return {
      team_1: {
        name: `Fallback Team ${ind}`,
        runs: ind * ind,
        wickets: ind,
        over: ind/10
      },
      team_2: {
        name: `Fallback Team ${ind+1}`,
        runs: ind * (ind + 1),
        wickets: ind + 1,
        over: (ind + 1)/10
      },
      isLive: ind % 2 === 0 ? true : false,
      date: new Date().getFullYear()
    }
  })
}

export function _fallbackMatchesTable() {
  return _temp.map((i, ind) => {
    return {
      "Match id": ind, 
      "Tournament ID": ind, 
      "Team 1": ind, 
      "Team 2": ind + 1, 
      "Extra 1": ind, 
      "Extra 2": ind + 1, 
      "Venueid": ind, 
      "Date": new Date().getFullYear()
    }
  })
}

export function _fallbackPlayerStatus() {
  return _temp.map((i, ind) => {
    return {
      "playerid": ind,
      "matchid": ind,
      "balls_played": ind,
      "balls_bowled": ind,
      "runs": ind,
      "runs_concieved": ind,
      "wickets": ind,
      "sixes": ind,
      "fours": ind
    }
  })
}

export function _fallbackTournaments() {
  return _temp.map((i, ind) => {
    return {
      tournamentid: ind,
      name: `Fallback Tournament ${ind}`,
      start_date: new Date().toLocaleDateString(),
      end_date: new Date().toLocaleDateString()
    }
  })
}

export function _fallbackNews() {
  return _temp.map((i, ind) => {
    return {
      newsid: ind,
      title: `Fallback ${ind}`,
      img: `img`,
      description: `Fallback news/subnews description is displayed here.. ${ind}`
    }
  })
}

export function _fallbackTeams() {
  return _temp.map((i, ind) => {
    return {
      teamid: ind,
      name: `Fallback Team ${ind}`,
      description: `This is fallback team description ${ind}`
    }
  })
}

export function _fallbackPlayers() {
  console.log(_temp)
  return _temp.map((i, ind) => {
    return {
      name: `Fallback ${ind}`,
      img: '',
      dob: new Date().toLocaleDateString(),
      phone: `${(ind + 1)*Math.pow(9, 10)}`,
      address: `Fallback address ${ind}`,
      playerid: ind,
      teamid: ind,
      role: `Fallback role ${ind}`
    }
  })
}

export function _fallbackVenues() {
  return _temp.map((i, ind) => {
    return {
      venueid: ind,
      name: `Fallback Venue ${ind}`,
      seats: (ind + 1) * 40,
      location: `Fallback Location ${ind}`
    }
  })
}

export function _fallbackPerson() {
  const _fallbackName = ["Neha Shah", "Pabin Khanal", "Roshan Thapa"];
  return _fallbackName.map((n, ind) => {
    return {
      name: n,
      img: '',
      post: "CEO"
    }
  })
}