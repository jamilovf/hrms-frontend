import axios from "axios"
import authAxios from "./authAxios"


export default class CityService{
    getAll(){
        console.log("cities/getAll started");
        return axios.get("http://localhost:8080/api/cities/getAll", authAxios)
    }
}