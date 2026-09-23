'use client';
import {useState, useEffect} from 'react';

const useStorage = (key:string,value:string) => {
    const [values,setValue] = useState(()=>{
             if (typeof window !== "undefined") {

            return localStorage.getItem(key) || value
        }

        return value
    })
    
    useEffect(()=>{
        localStorage.setItem(key,values)
    },[key,values])

    return [values,setValue]
}
export default useStorage