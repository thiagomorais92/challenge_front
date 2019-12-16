import {  createTextMask } from 'redux-form-input-masks';
 
 
 export const mascaraTelefone = createTextMask({
    pattern: '(99) 99999-9999',
  });

  export const mascaraCpf = createTextMask({
    pattern: '999.999.999-99',
  });

  export const mascaraCep = createTextMask({
    pattern: '99999-999',
  });