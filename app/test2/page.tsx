// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import useDebounce from '../hook/useDebounce';
import useStorage from '../hook/useStorage'
function page() {
    const [query, setQuery] = useStorage("query","")
    const [data, setData] = useState([])
    const debounce = useDebounce(query,1000)
    
    const call = async function callData() {
        if (!debounce.trim()) return
        try {
            const res = await fetch(`https://dummyjson.com/products/search?q=${debounce}`)
            console.log(res, 'jhhj')
            const json = await res.json();
            console.log(json, 'jjj');
            setData(json.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        call()
    }, [debounce])

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    flex: '1',
                    minWidth: '150px'
                }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: "20px",
                        padding: "20px",
                    }}
                >
                    {data.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #e5e5e5",
                                borderRadius: "12px",
                                padding: "15px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                                fontFamily: "sans-serif",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                background: "#fff",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                        >
                            {/* <img
                                src={item.thumbnail}
                                alt={item.title}
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            /> */}

                            <h3 style={{ margin: 0, fontSize: "16px" }}>
                                {item.title}
                            </h3>

                            <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
                                {item.brand} • {item.category}
                            </p>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    )

}
export default page