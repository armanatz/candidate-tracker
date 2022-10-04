import axios from 'axios';

const API_PROTO = import.meta.env.VITE_API_PROTO;
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const BASE_URL = `${API_PROTO}://${API_DOMAIN}/${API_ENDPOINT}`;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export default function useAxios() {
  return axiosPublic;
}
