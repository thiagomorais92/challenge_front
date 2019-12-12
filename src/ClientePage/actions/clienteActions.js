import axios from 'axios';
import {CLIENTE_CONSTANTES} from './clienteConstants';
import { toast } from 'react-toastify';
 
export const removeClient = cliente =>{
    return dispatch =>{
        axios.delete('/api/cliente/'+cliente.id)
        .then(resp=>{
            axios.get('/api/cliente').then(resp =>{
                dispatch(clientesObtidos(resp.data.data));
                }).catch(err=>{
                    console.log(err);
                });
            
        })
        .catch(err=>{
            toast("Sem Permissão para excluir");
    })
    }
}

const startObterClientes = ()=>{
    return {
        type:CLIENTE_CONSTANTES.START_OBTER_CLIENTES
    }
}

const clientesObtidos = clientes =>{
    return {
        type: CLIENTE_CONSTANTES.CLIENTES_OBTIDOS,
        payload:{clientes}
    }
}

export const  buscarClientes = () =>{
    return dispatch => {
        dispatch(startObterClientes());
        axios.get('/api/cliente').then(resp =>{
        dispatch(clientesObtidos(resp.data.data));
        }).catch(err=>{
            console.log(err);
        });
        
    }
}