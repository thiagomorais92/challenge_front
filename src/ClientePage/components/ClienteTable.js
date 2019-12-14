import React from 'react';
import { connect } from 'react-redux';
import {buscarClientes,removeClient,toggleModal,editarcliente} from '../actions/clienteActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faEdit } from '@fortawesome/free-solid-svg-icons'
import ClienteModalForm from './ClienteModalForm';


class ClientTable extends React.Component {

    constructor(props){
      super(props);
        this.props.buscarClientes();
        this.state = {modaFormIsOpen: false};
    }

    deleteCliente(cliente){
      this.props.removeClient(cliente);
    }

    

renderCliente (cliente){
  return (
        <tr key={cliente.id}>
          <td><button title="Editar Cliente" onClick={(e) =>this.props.editarcliente(cliente)}>
          <FontAwesomeIcon icon={faEdit} size="2x" style={{ '--fa-primary-color': 'green' ,margin:"2px"}}
            />
          </button>
          <button type="button" onClick={(e)=>{this.deleteCliente(cliente)}} className="btn btn-danger">Delete</button>
          </td>
          <td>{cliente.nome}</td>
          <td>{cliente.cpf}</td>
          <td>
            {cliente.telefones.map(tel=>{return (tel.textoContato)})}<br/>
            {cliente.emails.map(email=>{return (email.textoContato)})}
          </td>
        </tr>
  )
}

    render(){
      if(this.props.clientes){
        return (
        <div>
          <ClienteModalForm  />
          <button className="btn btn-success" title="Novo Cliente" onClick={(e) =>this.props.toggleModal()}>
          <FontAwesomeIcon
              icon={faPlusSquare}
              size="4x"
              style={{ '--fa-primary-color': 'green' ,"float":"left"}}
            />
          </button>
          
        <table className="table">
        <thead>
          <tr>
            <th>Ação</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Contatos</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.clientes.map(cliente=>{
              return this.renderCliente(cliente)
            })
          }
          
        </tbody>
      </table>
      </div>)
      }else{
        return <p>.</p>
      }
        
    }
}

const mapStateToProps = (state) =>{
    return {
        clientes: state.clienteState.clientes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buscarClientes: () => dispatch(buscarClientes()),
        removeClient:   (cliente) => dispatch(removeClient(cliente)),
        toggleModal:    () => dispatch(toggleModal()),
        editarcliente:  (cliente) => dispatch(editarcliente(cliente))
    }
}


//export default ClientTable
export default connect(mapStateToProps, mapDispatchToProps)(ClientTable);