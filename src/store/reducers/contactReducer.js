const initialState = {
    contacts: [],
    conact: null
}

export default function ContactReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_CONTACTS':
            return { ...state, contacts: action.contacts }
        case 'SET_CURR_CONTACT':
            return { ...state, contact: action.contact }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                if (contact._id === action.contact._id) return action.contact;
                return contact;
                })
            }
        case 'ADD_ROBOT':
            return {
            ...state,
            contacts: [...state.contacts, action.contact]
        }
        case 'DELETE_ROBOT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => {
                return contact._id !== action.id
            })
        }
        default:
            return state
    }
}

