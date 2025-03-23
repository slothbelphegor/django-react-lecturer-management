import AxiosInstance from "./AxiosInstance";
import { React, useEffect, useState } from "react";
import { Box } from "@mui/material"

const Home = () => {
    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)
    const getData = () => {
        AxiosInstance.get('users/').then((res) => {
            setMyData(res.data);
            console.log(res.data);
            setLoading(false);
        })
    }
    useEffect(() => {
        getData();
    }, []) // get data on initial load page
    return (
        <div>
            {loading ? <p>Loading...</p> :
                <div>
                    {myData?.map((item, index) => (
                        <Box key={index} sx={{ p: 2, m: 2, boxShadow: 3 }}>
                            <div>Username: {item.username}</div>
                            <div>Email: {item.email}</div>
                        </Box>
                    ))}
                </div>
            }

        </div>
    )
}

export default Home;