import axios from 'axios';
import { BASE_URL } from './apiPath';

const axoisInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor

axoisInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);

    }
);

// Response Interceptor

axoisInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) =>{
        //Handle common error golbally

        if(error.response){
            if(error.status === 401){
                //Redirect to login page
                window.location.href = "/login";
            } else if (error.response.status === 500){
                console.error("Servewr Error. Please try again later.")
            }
        }else if(error.code === "ENONNABORTED"){
            console,error("Request timeout. Please try agin");
        }
        return Promise.reject(error);
    }
);

export default axoisInstance;