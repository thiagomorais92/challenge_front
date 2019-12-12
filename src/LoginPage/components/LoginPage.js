import React from 'react'
import { connect } from 'react-redux';
import LoginFormComponent from './LoginFormComponent';
import {realizarLogin} from '../actions/loginPageActions';
import {Redirect} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


class LoginPage extends React.Component {
    
    

    submit = values =>{
        this.props.realizarLogin(values);
    }
    
    render() {
        if(this.props.err){
            toast(this.props.err);
        }
        if(this.props.isAuth){
           return <Redirect to='/client-page'/>
        }
        return (<div>
            <ToastContainer />
            <LoginFormComponent onSubmit={this.submit} />
                <hr/>
                <span>Por: Thiago Araújo de Morais</span><br/>
                <a href="https://www.linkedin.com/in/devthiago/">LinkedIn</a><br/>
                <a href="https://github.com/thiagomorais92">Github</a>
                </div>)
    }
}

const mapStateToProps = (state) =>{
    return {
        isAuth: state.loginPageReducer.isAuth,
        err: state.loginPageReducer.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        realizarLogin: (formValues) => dispatch(realizarLogin(formValues))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);