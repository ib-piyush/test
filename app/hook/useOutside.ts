
import { useRef, useEffect } from "react"
function hook(callBack: () => void) {
      const outsideRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
        if (outsideRef.current && !outsideRef.current.contains(event.target as Node) ) {
            callBack()
        }
        document.addEventListener("click" ,handleClickOutside)
        return()=>{
            document.removeEventListener("click",handleClickOutside)
        }
        };
    }, [callBack])


    return outsideRef
}

export default hook