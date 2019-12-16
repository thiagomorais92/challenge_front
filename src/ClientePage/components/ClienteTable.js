import React from 'react';
import { connect } from 'react-redux';
import {buscarClientes,removeClient,adicionarCLiente,editarcliente,toggleModal,salvarCliente,logOut} from '../actions/clienteActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faEdit,faTrash,faSignInAlt} from '@fortawesome/free-solid-svg-icons'
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

    saveClient = formValues =>{
      this.props.salvarCliente(formValues);
    }

renderCliente (cliente){
  return (
        <tr key={cliente.id}>
          <td><button title="Editar Cliente" onClick={(e) =>this.props.editarcliente(cliente)}>
          <FontAwesomeIcon icon={faEdit} size="1x" style={{ '--fa-primary-color': 'green' ,margin:"2px"}}
            />
          </button>
          <button title="Deletar Cliente" onClick={(e) =>this.deleteCliente(cliente)}>
          <FontAwesomeIcon icon={faTrash} size="1x" style={{ '--fa-primary-color': 'green' ,margin:"2px"}}
            />
          </button>
          
          </td>
          <td>{cliente.nome}</td>
          <td>{cliente.cpfToShow}</td>
          <td>
            {cliente.emailPrincipal}<br/>
            {cliente.celularToShow}
            
          </td>
        </tr>
  )
}

    render(){
      if(this.props.clientes){
        return (
        <div>
          <ClienteModalForm onSubmit={this.saveClient} />
          <button className="btn btn-success" title="Novo Cliente" onClick={(e) => this.props.adicionarCLiente()}>
          <FontAwesomeIcon
              icon={faPlusSquare}
              size="2x"
              style={{ '--fa-primary-color': 'green' ,"float":"left"}}
            />
          </button>
          <button style={{"float":"right"}} title="Sair da aplicação" onClick={(e) =>this.props.logOut()}>
          <FontAwesomeIcon icon={faSignInAlt} size="2x" style={{ '--fa-primary-color': 'green' ,margin:"2px"}}
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
        buscarClientes:      ()           => dispatch(buscarClientes()),
        removeClient:        (cliente)    => dispatch(removeClient(cliente)),
        adicionarCLiente:    ()           => dispatch(adicionarCLiente()),
        editarcliente:       (cliente)    => dispatch(editarcliente(cliente)),
        toggleModal:         ()           => dispatch(toggleModal()),
        salvarCliente:       (formValues) => dispatch(salvarCliente(formValues)),
        logOut:              ()           => dispatch(logOut())
    }
}


//export default ClientTable
export default connect(mapStateToProps, mapDispatchToProps)(ClientTable);