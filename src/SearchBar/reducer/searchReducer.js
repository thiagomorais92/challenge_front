const INITIAL_STATE = {
        videos:[],
        carregando:false,
        erro:false
};


export default  function  searchReducer (state = INITIAL_STATE,action) {
    switch(action.type){
        case 'BUSCA_VIDEO_INICIO':
            return {state,...action.payload}
        case 'BUSCA_VIDEO_SUCESSO':
            return {state,...action.payload}
        case 'BUSCA_VIDEO_ERRO':
            return {state,...action.payload}
        case 'CEP_ENCONTRADO':
            return {state,...{endereco:action.payload}}
        default: return {...state};
    }
}