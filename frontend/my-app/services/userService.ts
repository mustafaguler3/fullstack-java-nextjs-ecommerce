import { User } from "@/types/User";
import axiosClient from "./axiosClient";


const userService = {
     userAccount: () => axiosClient.get<User>("/users/account"),
     updateProfile: (formData: FormData) => {
        return axiosClient.put("/users/update", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
}

export default userService;