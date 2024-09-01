import * as storage from "./storage"

export const initState = {
    view: 'home', //home, existing, create, restore,dashboard
    wallet: null,
    error: ''
}

export const reducer = (state = InitState, action) => {
    switch (action.type) {
        case 'SET_VIEW':
            return {
                ...state,
                view: action.param
            }
        case 'SET_WALLET':
            return {
                ...state,
                wallet: action.param
            }
        case 'EXIT':
            storage.clearTempWallet()
            return {
                ...state,
                wallet: null,
                view: 'home'
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.param
            }
        default:
            return state
    }
}

