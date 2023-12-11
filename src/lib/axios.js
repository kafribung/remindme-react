import Axios from "axios"

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default axios;