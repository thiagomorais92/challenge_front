import axios from 'axios';
import {LOGIN_CONSTANTS} from './actionsConstants';
import AxiosInstance from '../../utils/AxiosInstance';
import { toast } from 'react-toastify';

const loginSucesso = ()=>{
    return {type:LOGIN_CONSTANTS.SUCCESS_LOGIN,payload:{isAuth:true}};
}

export const  realizarLogin = (formData) =>{
    return dispatch => {
        axios.post("http://localhost:8080/auth",formData,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(resp =>{
            if(resp.data.data.token){
                console.log(resp.data.data.token);
                new AxiosInstance("Bearer "+resp.data.data.token)
              }
            
            dispatch(loginSucesso());
        }).catch(err=>{
            toast("Sem Permissão.");
        })
        
    }
}