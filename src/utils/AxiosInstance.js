import axios from 'axios';



class AxiosInstance{
    instance = null;
    
    constructor(token){
        this.instance =  axios.create({
            baseURL: "https://localhost:8080"
          });
        this.instance.defaults.headers.common["Authorization"] = token;  
    }
    getInstance(){
        return this.instance;
    }
}

export default AxiosInstance;