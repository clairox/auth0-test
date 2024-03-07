import axios from 'axios'

const baseURL = import.meta.env.VITE_AUTH0_AUDIENCE
const axiosInstance = axios.create({ baseURL })

export default axiosInstance
