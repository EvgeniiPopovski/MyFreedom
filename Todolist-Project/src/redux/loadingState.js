const SET_ISLOADING = 'SET_ISLOADING'

const loadingReduser = ( state =  false , action) => {
    if (action.type === SET_ISLOADING) {
        return action.payload.isLoading
    } 
    return state
}

const isloadingAC = (bool) => {
    return {
        type: SET_ISLOADING,
        payload: {
            isLoading: bool
        }
    }
}

export {loadingReduser , isloadingAC}