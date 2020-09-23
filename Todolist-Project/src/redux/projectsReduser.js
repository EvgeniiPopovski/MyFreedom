import { firestoreAPI } from "../firebaseAPI/firebase"

const GET_PROJECTS ='GET_PROJECTS'

const InitialState = []

const projectsReduser = (state = InitialState , action) => {
    switch (action.type) {
        case GET_PROJECTS: 
            console.log(action.payload)
            return [ ...state, ...action.payload ]
        default: return state
    }
}

const getProgectsAC =(projects) => {
    return {
        type: GET_PROJECTS,
        payload : {
            projects
        }
    }
}

const getProgectsThunk = (dispatch , getState ) => {
    return async dispatch => {
        let response = await firestoreAPI.getData('projects')
        let projects = response.docs.map(doc => {
            return {id: doc.id , ...doc.data()}
        })
        dispatch(getProgectsAC(projects))
    }
}

export {projectsReduser , getProgectsThunk}