import React from 'react';
import { connect } from 'react-redux';
import {buscarClientes,removeClient} from '../actions/clienteActions'

class ClientTable extends React.Component {

    constructor(props){
      super(props);
        this.props.buscarClientes();
    }

    deleteCliente(cliente){
      this.props.removeClient(cliente);
    }

renderCliente (cliente){
  console.log(cliente)
  return (
        <tr key={cliente.id}>
          <td>{cliente.nome}</td>
          <td>{cliente.cpf}</td>
          <td>{cliente.contatos[0].textoContato}</td>
          <td><button type="button" onClick={(e)=>{this.deleteCliente(cliente)}} className="btn btn-danger">Delete</button></td>
        </tr>
  )
}

    render(){
      if(this.props.clientes){
        return (<table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Contato</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.clientes.map(cliente=>{
              return this.renderCliente(cliente)
            })
          }
          
        </tbody>
      </table>)
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
        removeClient: (cliente) => dispatch(removeClient(cliente))
    }
}


//export default ClientTable
export default connect(mapStateToProps, mapDispatchToProps)(ClientTable);