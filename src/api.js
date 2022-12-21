import axios from 'axios'

const API_URL = `https://code-samurai-22-backend.onrender.com/api`

export const getAllProjects = async () => {
    const data = await axios.get(`${API_URL}/projects/all`)
    return data.data
}

export const getAllProposals = async () => {
    const data = await axios.get(`${API_URL}/projects/proposals`)
    return data.data.data
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

export const addComment = async (project_id, comment) => {
    const data = await axios.post(`${API_URL}/projects/comment`, { project_id, comment })
    return data.data
}

export const getComments = async (project_id) => {
    const data = await axios.get(`${API_URL}/projects/comment/${project_id}`)
    return data.data.data
}

export const addProposal = async (proposal) => {
    const data = await axios.post(`${API_URL}/projects/proposal`, proposal)
    return data.data
}


axios.interceptors.request.use( config => {
    const jwt = localStorage.getItem('token')
    if (jwt && config.url.includes(API_URL))
        config.headers.Authorization = `${jwt}`
    return config
})