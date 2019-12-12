import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginPageReducer from '../LoginPage/reducer/loginPageReducer';
import clienteState from '../ClientePage/reducer/clientStateReducer'

const reducersCombineds = combineReducers({
    form:formReducer,
    loginPageReducer,
    clienteState
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
const store = createStore(reducersCombineds,composeEnhancers(applyMiddleware(...middlewares)));

export default store;