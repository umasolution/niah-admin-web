
import * as actionTypes from '../actions';

const initalState = {
    authenticated : localStorage.getItem('username') ? true : false,
    username : localStorage.getItem('username'),
    profile : {
      general : {
        address1: "",
        address2: "",
        admin: null,
        country: "",
        email_id: "",
        firstname: "",
        lastname: "",
        parent: null,
        password: "",
        phone: "",
        state: "",
        status: "",
        username: ""
      }

    }
}

const authReducer  = (state = initalState, action) => {
    switch(action.type){
        case actionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated : action.authenticated,
                username : action.username,
                profile : {...state.profile,
                            general : {...state.profile.general, username : action.username, 
                                                    firstname : action.firstname, 
                                                    lastname : action.lastname}
                        }
                //username : action.username
            
            }

        case actionTypes.SET_PROFILE:
            return {
                ...state,
                profile : action.profile
            }
            
        default:
            return state;
    }
}

export default authReducer;