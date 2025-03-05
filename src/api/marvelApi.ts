import axios from 'axios';
import md5 from 'md5';

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
const ts = new Date().getTime();
const hash = md5(`${ts}${privateKey}${publicKey}`);

const api = axios.create({
  baseURL: baseApiUrl,
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

export default api;