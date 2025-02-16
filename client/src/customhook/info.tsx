import { useState } from 'react';


/** Custom hook to be used as the info message (with type succes, error) 
    args        
    - first field is message itself (what message to diaply)
    - second field is type (error or success) (optional: deafult to none/error)
    
    `eg: setInfo([messagecontent, type])`
*/
export function useInfoHandler() {
    const [info, setInfo] = useState<[m: string, t?: string] | null>(null);

    return { info, setInfo };
}
