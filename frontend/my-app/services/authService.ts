import axiosClient from "./axiosClient"

const authService =  {
    register: (data) : Promise<any>  => axiosClient.post("/auth/register", data),
    login: (data): Promise<any> => axiosClient.post("/auth/login",data),
}

export default authService;