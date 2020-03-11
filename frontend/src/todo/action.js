import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGE',
    payload: event.target.value 
})

export const search = (description) => {
    const textSearch = description ? `&description__regex=/${description}/` : ''
    const request = axios.get(`${URL}?sort=-createdAt${textSearch}`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch({
                type: 'TODO_ADDED',
                payload: resp.data
            })).then(resp => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(res => dispatch(search()))
    }
}

export const del = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(
                search()
            ))
    }
}

export const markAsPeding = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => dispatch(search()))
    }
}

export const clearInput = () => {
    return [{
        type: 'CLEAR_INPUT',
        payload: ''
    }, search()]
}

