import {LOGIN_CONSTANTS} from '../actions/actionsConstants';
const INITIAL_STATE = {};


export default  function  searchReducer (state = INITIAL_STATE,action) {
switch(action.type){
    case LOGIN_CONSTANTS.SUCCESS_LOGIN:
        return {state,...action.payload};
    default: return {...state};
}
}