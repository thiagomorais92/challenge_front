import axios from 'axios';
import { CLIENTE_CONSTANTES } from './clienteConstants';
import { toast } from 'react-toastify';

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

export const toggleModal = () => {
    return dispatch => {
        dispatch({ type: CLIENTE_CONSTANTES.TOGGLE_MODAL });
    }
}

export const editarcliente = cliente =>{
    return dispatch =>{
        dispatch({type:CLIENTE_CONSTANTES.EDITAR_CLIENTE,payload:{cliente,modalCLienteIsOpen:true}});
    }
}
function buscarClientesRest(dispatch) {
    axios.get('/api/cliente').then(resp => {
       const clientesDto = separarTelefonesAndEmails(resp.data.data);
        dispatch(clientesObtidos(clientesDto));
    }).catch(err => {
        console.log(err);
    });
}

function separarTelefonesAndEmails(listaClientes){
    listaClientes.forEach(cliente => {
        cliente.emails = cliente.contatos.filter(contato=>{
            return contato.tipoContato == "EMAIL";
        });
        cliente.telefones = cliente.contatos.filter(contato=>{
            return contato.tipoContato == "TELEFONE";
        });
        cliente.contatos = undefined;
    });
    return listaClientes;
}