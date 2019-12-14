import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/clienteActions'
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { required } from '../../utils/formValidation'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
    <div>
      <div>
        <input {...input} className="fadeIn second" placeholder={label} type={type} />
        {touched &&
          ((error && <div><span>{error}</span></div>) ||
            (warning && <div><span>{warning}</span></div>))}
      </div>
    </div>
  )



class ClienteModalForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <div>

        <Modal isOpen={this.props.modalOpen} size={'lg'}  scrollable={true} returnFocusAfterClose={false} autoFocus={true} className="container-lg" centered={true}>
          <ModalHeader toggle={(e) => this.props.toggleModal()}>Dados do Cliente</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
            <strong>Identificação</strong><hr/>
              <div>
                <Field
                    name="nome"
                    component="input"
                    type="text"
                    placeholder="Nome completo"
                  />
              </div>
              <div>
                <Field
                    name="cpf"
                    component="input"
                    type="text"
                    placeholder="CPF"
                  />
              </div>
              <strong>Endereço</strong><hr/>
              <div>
                <Field
                    name="endereco.cep"
                    component="input"
                    type="text"
                    placeholder="CEP"
                  />
              </div>
              <div>
                <Field
                    name="endereco.logradouro"
                    component="input"
                    type="text"
                    placeholder="Logradouro"
                  />
              </div>
              <div>
                <Field
                    name="endereco.bairro"
                    component="input"
                    type="text"
                    placeholder="Bairro"
                  />
              </div>
              <div>
                <Field
                    name="endereco.cidade"
                    component="input"
                    type="text"
                    placeholder="Cidade"
                  />
              </div>
              <div>
                <Field
                    name="endereco.uf"
                    component="input"
                    type="text"
                    placeholder="UF"
                  />
                  </div>
                  <div>
                <Field
                    name="endereco.complemento"
                    component="input"
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
                      <Field
                      name={"emails["+index+"].textoContato"}
                      component="input"
                      type="text"
                      placeholder="Email"
                    />
                    </div>)
                    })
                  }

{
                    this.props.cliente &&
                    this.props.cliente.telefones.map((cont2,index,array)=>{
                    return (
                    <div key={index}>
                      <Field
                      name={"telefones["+index+"].textoContato"}
                      component="input"
                      type="text"
                      placeholder="Telefone"
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
    toggleModal: () => dispatch(toggleModal())
  }
}

ClienteModalForm = reduxForm({
  form: 'clienteForm'
})(ClienteModalForm)

export default connect(mapStateToProps, mapDispatchToProps)(ClienteModalForm);
