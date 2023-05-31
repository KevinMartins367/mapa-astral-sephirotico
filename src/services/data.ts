import axios from 'axios';

export default function data(){

   
   const base_url = process.env.REACT_APP_BASE_URL ?? `http://localhost:3000/assets/`;

   const data = {

      getAngels: function getAngels() {
         return axios.get(`${base_url}angels.json`,{
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json;charset=UTF-8',
            }
         })
      },

      getCaractere_hebraico: function getCaractere_hebraico() {
         return axios.get(`${base_url}caractere_hebraico.json`,{
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json;charset=UTF-8',
            }
         })
      },

      getOdus: function getOdus() {
         return axios.get(`${base_url}odus.json`,{
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json;charset=UTF-8',
            }
         })
      },

      getSephiroth: function getSephiroth() {
         return axios.get(`${base_url}sephiroth.json`,{
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json;charset=UTF-8',
            }
         })
      },

      getTarot: function getTarot() {
         return axios.get(`${base_url}tarot.json`,{
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json;charset=UTF-8',
            }
         })
      },



   }
   
   return data;
}