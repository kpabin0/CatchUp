import { useNavigate } from "react-router-dom";


/** Custom hook to be used as the delay Navigate (wrapper for useNavigate with delay) 
    args        
    - url to navigate
    - delay for redirection (in ms)
    
    `usage: const { dnav } = useDNavigate(url, delay);`
    \
    `invoke: dnav() to trigger`
*/
export function useDNavigate() {

    const nav = useNavigate()

    const dnav = (url: string, delay: number = 0) => {
        setTimeout(() => {
            nav(url)
        }, delay);
    }

    return { dnav };
}