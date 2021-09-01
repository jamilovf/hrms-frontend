import axios from "axios"
import authAxios from "./authAxios"


export default class CompanyService{
    getAll(){
        return axios.get("http://localhost:8080/api/employers/getAll", authAxios)
    }
}