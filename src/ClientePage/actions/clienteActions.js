import axios from 'axios';
import { CLIENTE_CONSTANTES } from './clienteConstants';
import { toast } from 'react-toastify';
import {reset} from 'redux-form'
import parseJson from 'parse-json';

const makePostClient = (dispatch,cliente)=>{
    axios.post("/api/cliente",cliente).then(resp=>{
        dispatch({type:CLIENTE_CONSTANTES.CLIENTE_SALVO})
        dispatch({type:CLIENTE_CONSTANTES.TOGGLE_MODAL})
        buscarClientesRest(dispatch);

});
}

const makePutClient = (dispatch,cliente)=>{
    axios.put("/api/cliente",cliente).then(resp=>{
        dispatch({type:CLIENTE_CONSTANTES.CLIENTE_ATUALIZADO})
        dispatch({type:CLIENTE_CONSTANTES.TOGGLE_MODAL})
        buscarClientesRest(dispatch);
    })
}

export const salvarCliente = formValues =>{
    return dispatch =>{
        if(formValues.id){
            makePutClient(dispatch,formValues);
        }
        else{
            makePostClient(dispatch,formValues);
        }
    }
}

export const buscarEnderecoPorCep = cep =>{
    if(cep.indexOf("_") == -1){

        return dispatch => {
            cep = cep.replace("-","");
            axios.get(`api/cep/${cep}`).then(resp =>{
                if(resp.data.data.indexOf("erro") == -1){
                const endereco = parseJson(resp.data.data);
                const enderecoCerto = {
                    cidade : endereco.localidade,
                    cep  : endereco.cep.replace("-",""),
                    logradouro : endereco.logradouro,
                    complemento : endereco.complemento,
                    bairro:endereco.bairro,
                    uf:endereco.uf
                }
                
                    endereco.cep = endereco.cep.replace("-","");
                    dispatch({type:CLIENTE_CONSTANTES.ENDERECO_POR_CEP_DIGITADO,payload:enderecoCerto});
                }
                    
            });
        }
    }else{
        return dispatch => dispatch({type:'default'});
    }
    
}

export const removeClient = cliente => {
    return dispatch => {
        axios.delete('/api/cliente/' + cliente.id)
            .then(resp => {
                buscarClientesRest(dispatch);
            })
            .catch(err => {
                toast("Sem Permissão para excluir");
            });
    }
}

const startObterClientes = () => {
    return {
        type: CLIENTE_CONSTANTES.START_OBTER_CLIENTES
    }
}

const clientesObtidos = clientes => {
    return {
        type: CLIENTE_CONSTANTES.CLIENTES_OBTIDOS,
        payload: { clientes }
    }
}

export const buscarClientes = () => {
    return dispatch => {
        dispatch(startObterClientes());
        buscarClientesRest(dispatch);
    }
}

export const adicionarCLiente = () => {
    
    return dispatch => {
        var cliente = {};
        dispatch({ type: CLIENTE_CONSTANTES.ADD_CLIENTE ,payload:{cliente,modalCLienteIsOpen:true}});
    }
}

export const toggleModal = () =>{
    return dispatch => {
        dispatch(reset("clienteForm"));
        var cliente = {};
        dispatch({ type: CLIENTE_CONSTANTES.ADD_CLIENTE ,payload:{cliente,modalCLienteIsOpen:false}});
    }
}

export const editarcliente = cliente =>{
    return dispatch =>{
        dispatch({type:CLIENTE_CONSTANTES.EDITAR_CLIENTE,payload:{cliente,modalCLienteIsOpen:true}});
    }
}
function buscarClientesRest(dispatch) {
    axios.get('/api/cliente').then(resp => {
       dispatch(clientesObtidos(resp.data.data));
    }).catch(err => {
        console.log(err);
    });
}
