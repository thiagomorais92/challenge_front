import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required} from '../../utils/formValidation'

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
                            validate={[required]} />
                    </div>
                    <div>
                        <Field 
                        name="senha" 
                        label="Senha*" 
                        type="text"
                        component={renderField}
                        validate={[required]} />
                    </div>

                    <input type="submit" disabled={submitting} className="fadeIn fourth" value="Log In"></input>
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