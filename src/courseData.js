import React from 'react';

    const getData = async(setData) => {
        const result = await fetch("https://gist.githubusercontent.com/jwass91/f8c0b4f887c5db63434b41ad04d56d03/raw/6b532445911a4a871fc8f29bb00b367c7dd2dc61/carta-courses.json")
        const data = await result.json()
        for (let i = 0; i < data.length; i++) {
            data[i].bar_seen = false
        }
        setData(data)
    }

    export default getData