import { useState,useEffect } from "react";

export default function useDebounce<T>(value: string, delay: number) {
    const [debounceSearch ,setdebounceSearch ] = useState('')
    useEffect(()=>{
     const timer =   setTimeout(()=>{
            setdebounceSearch(value)

        },delay)
        return ()=>{
            clearTimeout(timer)
        }
    },[value, delay])
    
    return debounceSearch
} 