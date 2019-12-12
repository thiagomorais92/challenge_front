import React from 'react'
import { connect } from 'react-redux';


class ClientePage extends React.Component {
    
    submit = values =>{
        this.props.realizarLogin(values);
    }
    
    render() {
        return (<h1>ClientePageClientePage</h1>)
    }
}


export default connect(null, null)(ClientePage);