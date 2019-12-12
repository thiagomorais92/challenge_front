import youtubeSearch from 'youtube-api-v3-search';
import YTApi from '../../api';
import axios from 'axios';

const API_KEY = YTApi;

const cepEncontrado = (cepDados) =>{
    return{
        type:'CEP_ENCONTRADO',
        payload:cepDados.data
    }
}

export const buscaVideoInicio = () => {
    return {
            type:'BUSCA_VIDEO_INICIO',
            payload: {
                carregando:true,
                erro:false
            }
        }
}

export const buscaVideoSucesso = videos =>{
    return {
        type:'BUSCA_VIDEO_SUCESSO',
        payload:{
            videos,
            carregando:false,
            erro:false  
        }
    }
}

export const buscaVideoErro = err =>{
    return {
        type:'BUSCA_VIDEO_ERRO',
        payload:{
            videos:[],
            carregando:false,
            erro:true
        }
    }
}

export const  buscaVideo = (termo) =>{
    return dispatch => {
        dispatch(buscaVideoInicio());
        youtubeSearch(API_KEY,{q:termo})
            .then(data =>{
                dispatch(buscaVideoSucesso(data.items));
                axios.get('https://viacep.com.br/ws/72025050/json/')
                .then(function (response) {
                    dispatch(cepEncontrado(response));
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            })
            .catch(err => dispatch(buscaVideoErro(err)));
    }
}
