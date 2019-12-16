import React from 'react';
import { connect } from 'react-redux';
import { toggleModal,buscarEnderecoPorCep} from '../actions/clienteActions'
import { reduxForm, Field} from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { required, minLength3, maxLength100,email} from '../../utils/formValidation'
import {mascaraCep,mascaraCpf,mascaraTelefone,mascaraUF} from '../../utils/mascarasUtils'

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
    <div>
      <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
          ((error && <div><span style={{color: "red"}}>{error}</span></div>) ||
            (warning && <div ><span style={{color: "yellow"}}>{warning}</span></div>))}
      </div>
    </div>
  )

 

class ClienteModalForm extends React.Component {



  render() {
    const { handleSubmit ,buscarEnderecoPorCep} = this.props
    return (
      <div>

        <Modal isOpen={this.props.modalOpen} size={'lg'}  scrollable={true} returnFocusAfterClose={false} autoFocus={true} className="container-lg" centered={true}>
          <ModalHeader toggle={(e) => this.props.toggleModal()}>Dados do Cliente</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
            <strong>Identificação</strong><hr/>
              <div>
                <label>Nome:</label>
                <Field
                    name="nome"
                    component={renderField}
                    type="text"
                    placeholder="Nome completo"
                    validate={[required,minLength3,maxLength100]}
                  />
              </div>
              <div>
              <label>CPF:</label>
                <Field
                    name="cpf"
                    component={renderField}
                    type="text"
                    placeholder="CPF"
                    validate={[required]}
                    {...mascaraCpf}
                  />
              </div>
              <strong>Endereço</strong><hr/>
              <div>
              <label>CEP:</label>
                <Field
                    name="cep"
                    component={renderField}
                    type="text"
                    placeholder="CEP"
                    validate={[required]}
                    {...mascaraCep}
                    onBlur={(e)=>{buscarEnderecoPorCep(e.currentTarget.defaultValue)}}
                  />
              </div>
              <div>
              <label>Logradouro:</label>
                <Field
                    name="logradouro"
                    component={renderField}
                    type="text"
                    placeholder="Logradouro"
                    validate={[required]}
                  />
              </div>
              <div>
              <label>Bairro:</label>
                <Field
                    name="bairro"
                    component={renderField}
                    type="text"
                    placeholder="Bairro"
                    validate={[required]}
                  />
              </div>
              <div>
              <label>Cidade:</label>
                <Field
                    name="cidade"
                    component={renderField}
                    type="text"
                    placeholder="Cidade"
                    validate={[required]}
                  />
              </div>
              <div>
              <label>UF:</label>
                <Field
                    name="uf"
                    component={renderField}
                    type="text"
                    placeholder="UF"
                    validate={[required]}
                    {...mascaraUF}
                  />
                  </div>
                  <div>
                  <label>Complemento:</label>
                <Field
                    name="complemento"
                    component={renderField}
                    type="text"
                    placeholder="Complemento"
                  />
                  </div>
                  <strong>Contato</strong><hr/>
                  
                  <div>
                  <div >
                      <label>Email Principal *:</label>
                      <Field
                      name={"emailPrincipal"}
                      component={renderField}
                      type="text"
                      placeholder="Email"
                      validate={[email,required]}
                    />
                    </div>
                    <div >
                      <label>Email:</label>
                      <Field
                      name={"emailOpc1"}
                      component={renderField}
                      type="text"
                      placeholder="Email"
                      validate={email}
                    />
                    </div>
                    <div >
                      <label>Email:</label>
                      <Field
                      name={"emailOpc2"}
                      component={renderField}
                      type="text"
                      placeholder="Email"
                      validate={email}
                    />
                    </div>
                    
                    
                    <div>
                      <label>Telefone Celular *:</label>
                      <Field
                      name={"telefoneCelular"}
                      component={renderField}
                      type="text"
                      placeholder="Telefone"
                      {...mascaraTelefone}
                      validate={[required]}
                    />
                    </div>
                    <div>
                      <label>Telefone Comercial:</label>
                      <Field
                      name={"telefoneComercial"}
                      component={renderField}
                      type="text"
                      placeholder="Telefone"
                      {...mascaraTelefone}
                    />
                    </div>
                    <div>
                      <label>Telefone Residencial:</label>
                      <Field
                      name={"telefoneResidencial"}
                      component={renderField}
                      type="text"
                      placeholder="Telefone"
                      {...mascaraTelefone}
                    />
                    </div>

              </div>
              <Button  type="submit" color="primary" >Salvar</Button>
            <Button color="secondary" style={{"float":"right"}} onClick={(e) => this.props.toggleModal()}>Cancel</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}


ClienteModalForm = reduxForm({
  form: 'clienteForm',
  enableReinitialize:true,
})(ClienteModalForm)


const mapStateToProps = (state) => {

  return {
    clientes: state.clienteState.clientes,
    modalOpen: state.clienteState.modalCLienteIsOpen,
    initialValues :state.clienteState.cliente,
    cliente: state.clienteState.cliente

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(toggleModal()),
    buscarEnderecoPorCep: (cep) => dispatch(buscarEnderecoPorCep(cep))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteModalForm);
