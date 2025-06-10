import axios from 'axios';

export default function data() {


    const base_url = (process.env.REACT_APP_BASE_URL ?? `${window.location.origin}`) + '/assets/';

    const data = {

        getAngels: function getAngels() {
            return axios.get(`${base_url}angels.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getCaractere_hebraico: function getCaractere_hebraico() {
            return axios.get(`${base_url}caractere_hebraico.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getOdus: function getOdus() {
            return axios.get(`${base_url}odus.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getSephiroth: function getSephiroth() {
            return axios.get(`${base_url}sephiroth.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getTarot: function getTarot() {
            return axios.get(`${base_url}tarot.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getTarot_Arcana_Major: function getTarot_Arcana_Major() {
            return axios.get(`${base_url}tarot_arcana_major.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },
        getTarot_Arcana_Minor: function getTarot_Arcana_Minor() {
            return axios.get(`${base_url}tarot_arcana_minor.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getSigns: function getSigns() {
            return axios.get(`${base_url}signs.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getPlanet: function getPlanet() {
            return axios.get(`${base_url}planets.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },

        getMarkdown: function getMarkdown(link: string) {
            return axios.get(`${base_url}markdowns/${link}`)
        },

        getReferences: function getReferences() {
            return axios.get(`${base_url}references.json`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
        },



    }

    return data;
}