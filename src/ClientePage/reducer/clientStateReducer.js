import {CLIENTE_CONSTANTES} from '../actions/clienteConstants';
const INITIAL_STATE = {};


export default  function  clienteState (state = INITIAL_STATE,action) {
switch(action.type){
    case CLIENTE_CONSTANTES.START_OBTER_CLIENTES:
        return {...state};
    case CLIENTE_CONSTANTES.CLIENTES_OBTIDOS:
        return Object.assign(state,action.payload)
    default: return {...state};
}
}