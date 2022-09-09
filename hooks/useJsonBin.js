import React from 'react'

const MASTER_KEY = "$2b$10$f7NO2A0DZKjCZYMOgkx0yu.T4IPoPvjyijg8Zz7XHPUlrBT6ZGgti";
const API_URL = "https://api.jsonbin.io/v3/b"
function useJsonBin() {

    const uploadJSON = async (data) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "X-Master-key": MASTER_KEY
            }
        });
        const response = await res.json();
        console.log({response})
        return response.metadata.id

    }
    const fetchJSON = async (id) => {
        const res = await fetch(API_URL+"/631b3b66e13e6063dca17f95", {
            method: 'GET',
            headers: {
                "X-Master-key": MASTER_KEY
            }
        });
        const response = await res.json();
        console.log({response})
        return response.metadata.record

    }
    
    return {
        fetchJSON,
        uploadJSON
    }
}

export default useJsonBin