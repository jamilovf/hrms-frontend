import axios from "axios"

export default class AuthService{
    registerCandidate(values){
        return axios.post("http://localhost:8080/api/auth/registerCandidate",values)
    }

    registerEmployer(values){
        return axios.post("http://localhost:8080/api/auth/registerEmployer",values)
    }
    
    registerSystemPersonnel(values){
        return axios.post("http://localhost:8080/api/auth/registerSystemPersonnel",values)
    }

    loginUser(values){
        return axios.post("http://localhost:8080/api/auth/login",values)
    }
}