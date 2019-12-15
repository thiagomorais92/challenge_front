export const required = value => (value || typeof value === 'number' ? undefined : 'Campo Obrigatório')
export const maxLength = max => value =>
  value && value.length > max ? `Maximo de ${max} caracteres permitidos` : undefined
export const maxLength100 = maxLength(100)

 export const minLength = min => value =>
  value && value.length < min ? `Minimo de ${min} caracteres permitidos` : undefined
 export const minLength3 = minLength(3)
export const number = value =>
  value && isNaN(Number(value)) ? 'Tem que ser número' : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email Inválido'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Cararteres especiais não permitidos'
    : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Número de telefone inválido, deve conter 10 digitos'
    : undefined