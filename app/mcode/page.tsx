// @ts-nocheck
'use client';

import { useState, useEffect } from 'react'
import useDebounce from '../hook/useDebounce';

const Page = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const debounceQuery = useDebounce(query, 2000)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/users/search?q=${debounceQuery}&limit=10`)
      console.log(response, 'gg');
      const json = await response.json();
      console.log(json.users, 'jjjjjj');
      setData(json?.users)
    } catch (error) {
      console.log(error, 'hjh');

      setError(true)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser()
  }, [debounceQuery])
  if (error) {
    return (
      <>
        <p>Error loading data</p>
        <button
          onClick={fetchUser}
        >
          try again
        </button>
      </>
    )
  }
  return (
    <>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />



      {
        loading ? (<h1>loading</h1>) : data.length === 0 ? (
          <h1>no record found</h1>
        ) : (
          data.map((user) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {data.map((user) => (
                <div
                  key={user.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    backgroundColor: "#fff",
                  }}
                >
             

                  <h3>{user.firstName} {user.lastName}</h3>

                  <p>{user.email}</p>

                  <p>{user.phone}</p>
                </div>
              ))}
            </div>
          ))
        )
      }
    </>
  );

}

export default Page