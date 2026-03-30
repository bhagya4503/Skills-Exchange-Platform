// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000/api",
// });

// // attach token
// API.interceptors.request.use((req) => {
//     const user = JSON.parse(localStorage.getItem("userInfo"));

//     if (user?.token) {
//         req.headers.Authorization = `Bearer ${user.token}`;
//     }

//     return req;
// });

// export default API;


import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user?.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }

    return req;
});

export default API;