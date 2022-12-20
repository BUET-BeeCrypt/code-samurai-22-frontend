import axios from 'axios'

const API_URL = `https://code-samurai-22-backend.onrender.com/api`

export const getAllProjects = async () => {
    const data = await axios.get(`${API_URL}/projects/all`)
    return data.data
}

export const login = async (username, password) => {
    const data = await axios.post(`${API_URL}/auth/login`, { username, password })
    return data.data
}

export const register = async (username, password) => {
    const data = await axios.post(`${API_URL}/auth/register`, { username, password })
    return data.data
}

export const setRating = async (project_id, rating) => {
    const data = await axios.post(`${API_URL}/projects/rating`, { project_id, rating })
    return data.data
}

axios.interceptors.request.use( config => {
    const jwt = localStorage.getItem('token')
    if (jwt && config.url.includes(API_URL))
        config.headers.Authorization = `${jwt}`
    return config
})