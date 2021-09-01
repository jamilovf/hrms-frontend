import axios from "axios"
import authAxios from "./authAxios"


export default class JobPositionService{
    getAll(){
        return axios.get("http://localhost:8080/api/jobPositions/getAll", authAxios)
    }
}