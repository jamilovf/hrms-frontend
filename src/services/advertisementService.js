import axios from "axios"

export default class AdvertisementService{
    getAllActiveAdvertisements(){
        return axios.get("http://localhost:8080/api/advertisements/getAllActiveAdvertisements")
    }
}