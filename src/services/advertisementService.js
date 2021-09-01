import axios from "axios"
import authAxios from "./authAxios"

export default class AdvertisementService{
    getAllActiveAdvertisements(){
        console.log("advertisement/getAll started")
        console.log(authAxios)
        return axios.get("http://localhost:8080/api/advertisements/getAllActiveAdvertisements", authAxios)
    }
}