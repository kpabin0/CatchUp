
export function getArray(count : any)
{
    return Array(count).fill(0).map((_, index) => index + 1)
}


export const backendBaseURL = "http://localhost:" + process.env.REACT_APP_PORT_NUMBER;