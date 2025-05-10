import axios from 'axios';

export default function GeoCode() {

    const base_url = `https://api.opencagedata.com/geocode/v1/json?key=1bae3473c72846aa98a8fcc666fa5b65&q=`;

    const data = {
        getLatLong: function getLatLong(address: string): Promise<any> {
            try {
                return axios.get(`${base_url}${address}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        return response.data.results;
                    }
                    throw new Error(`Erro ao buscar dados: ${response.status}`);
                }
                ).catch((error) => {
                    this.handleError(error);
                    return Promise.reject(error); // Ensure a return value in the catch block
                });
            } catch (error) {
                this.handleError(error);
                return Promise.reject(error); // Ensure a return value in the catch block
            }
        },

        handleError: function handleError(error: any) {
            let errorMessage = '';
            if (error.response) {
                // Erro ocorreu no lado do servidor
                errorMessage = `Código do erro: ${error.response.status}, mensagem: ${error.response.data}`;
            } else if (error.request) {
                // Erro ocorreu no lado do cliente
                errorMessage = 'Nenhuma resposta recebida do servidor.';
            } else {
                // Outro erro
                errorMessage = `Erro: ${error.message}`;
            }
            console.error(errorMessage);
            throw new Error(errorMessage);
        },
    };

    return data;
}