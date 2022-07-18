// import redux tool kit
// create store and configure it with combined reducers
// export store
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import registerReducer  from '../slices/register';
import loginReducer from '../slices/login';
import contactReducer from '../slices/contact';


const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    contact : contactReducer,

});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
