import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, minLength, maxLength} from '../../utils/formValidation'

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
          ((error && <div><span style={{color: "red"}}>{error}</span></div>) ||
            (warning && <div ><span style={{color: "yellow"}}>{warning}</span></div>))}
            </div>
        </div>
    )

let LoginFormComponent = props => {
    const { handleSubmit,  submitting } = props
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div id="formFooter">
                    <a className="underlineHover" href="#">Mirante/Cooperforte</a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="username"
                            label="Nome de Usuário*"
                            type="text"
                            component={renderField} 
                            validate={[required,minLength(3),maxLength(100)]} />
                    </div>
                    <div>
                        <Field 
                        name="senha" 
                        label="Senha*" 
                        type="text"
                        component={renderField}
                        validate={[required]} />
                    </div>

                    <input type="submit" disabled={submitting} className="fadeIn fourth" value="Entrar"></input>
                </form>

            </div>
        </div>


    )
}

LoginFormComponent = reduxForm({
    // a unique name for the form
    form: 'formularioLogin'
})(LoginFormComponent)

export default LoginFormComponent;