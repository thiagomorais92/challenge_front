import axios from 'axios';
import {LOGIN_CONSTANTS} from './actionsConstants';
import { toast } from 'react-toastify';

const loginSucesso = ()=>{
    return {type:LOGIN_CONSTANTS.SUCCESS_LOGIN,payload:{isAuth:true}};
}


export const verificaIsLogado = () =>{
    return dispatch =>{
        if(window.sessionStorage.getItem("token")){
            dispatch(loginSucesso());
        }
    }
}

export const  realizarLogin = (formData) =>{
    return dispatch => {
        axios.post("/auth",formData,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(resp =>{
            if(resp.data.data.token){
                window.sessionStorage.setItem("token","Bearer "+resp.data.data.token);
              }
            
            dispatch(loginSucesso());
        }).catch(err=>{
            toast("Sem Permissão.");
        })
        
    }
}