import React from 'react';
import { connect } from 'react-redux';
import { toggleModal,buscarEnderecoPorCep} from '../actions/clienteActions'
import { reduxForm, Field,formValueSelector } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { required, minLength3, maxLength100,alphaNumeric,email} from '../../utils/formValidation'
import {mascaraCep,mascaraCpf,mascaraTelefone} from '../../utils/mascarasUtils'

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

  constructor(props) {
    super(props)
  }

  limparFormAndFecharModal(){
    
  }

  render() {
    const { handleSubmit, submitting ,cepSemMask,buscarEnderecoPorCep} = this.props
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
                    validate={[required,minLength3,maxLength100,alphaNumeric]}
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
                    name="endereco.cep"
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
                    name="endereco.logradouro"
                    component={renderField}
                    type="text"
                    placeholder="Logradouro"
                    validate={[required]}
                  />
              </div>
              <div>
              <label>Bairro:</label>
                <Field
                    name="endereco.bairro"
                    component={renderField}
                    type="text"
                    placeholder="Bairro"
                    validate={[required]}
                  />
              </div>
              <div>
              <label>Cidade:</label>
                <Field
                    name="endereco.cidade"
                    component={renderField}
                    type="text"
                    placeholder="Cidade"
                    validate={[required]}
                  />
              </div>
              <div>
              <label>UF:</label>
                <Field
                    name="endereco.uf"
                    component={renderField}
                    type="text"
                    placeholder="UF"
                    validate={[required]}
                  />
                  </div>
                  <div>
                  <label>Complemento:</label>
                <Field
                    name="endereco.complemento"
                    component={renderField}
                    type="text"
                    placeholder="Complemento"
                  />
                  </div>
                  <strong>Contato</strong><hr/>
                  
                  <div>
                  {
                    this.props.cliente &&
                    this.props.cliente.emails.map((cont,index)=>{
                    return (
                    <div key={index}>
                      <label>Email:</label>
                      <Field
                      name={"emails["+index+"].textoContato"}
                      component={renderField}
                      type="text"
                      placeholder="Email"
                      validate={email}
                    />
                    </div>)
                    })
                  }

{
                    this.props.cliente &&
                    this.props.cliente.telefones.map((cont2,index,array)=>{
                    return (
                    <div key={index}>
                      <label>Telefone:</label>
                      <Field
                      name={"telefones["+index+"].textoContato"}
                      component={renderField}
                      type="text"
                      placeholder="Telefone"
                      {...mascaraTelefone}
                    />
                    </div>)
                    })
                  }
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => { console.log('buttonTogtle') }}>Do Something</Button>{' '}
            <Button color="secondary" onClick={(e) => this.props.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}


ClienteModalForm = reduxForm({
  form: 'clienteForm'
})(ClienteModalForm)

const selector = formValueSelector('clienteForm');

const mapStateToProps = (state) => {
  const cep = selector(state, 'cep');
  return {
    clientes: state.clienteState.clientes,
    modalOpen: state.clienteState.modalCLienteIsOpen,
    initialValues :state.clienteState.cliente,
    cliente: state.clienteState.cliente,
    cep
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(toggleModal()),
    buscarEnderecoPorCep: (cep) => dispatch(buscarEnderecoPorCep(cep))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteModalForm);
