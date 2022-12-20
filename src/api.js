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