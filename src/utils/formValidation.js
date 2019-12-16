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
  
export const  validarCPF = (cpf) => {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return "CPF inválido.";			
  var add = 0;
  var i;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		var rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return "CPF inválido.";		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return "CPF inválido.";		
	return undefined;   
}