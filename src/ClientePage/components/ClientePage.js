import React from 'react'
import { connect } from 'react-redux';
import ClientTable from './ClienteTable.js';
import { ToastContainer } from 'react-toastify';
import {Redirect} from 'react-router-dom';

class ClientePage extends React.Component {

    submit = values =>{
        this.props.realizarLogin(values);
    }
    
    render() {
        if(!this.props.isAuth){
            return <Redirect to='/'/>
        }else{
        return (
            <div>
                <ToastContainer />
                <ClientTable/>
            </div>
        )
    }
    }
}

const mapStateToProps = (state) =>{
    return {
        isAuth: state.loginPageReducer.isAuth,
    }
}


export default connect(mapStateToProps, null)(ClientePage);