// Description: This file contains the login slice of the redux store
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/login";

const initialState = {
    user: {
        email: '',
        phoneNumber: '',
        location: '',
        fullName: '',
    },
    errorMessage : '',
    token: '',

}

export const loginUser = createAsyncThunk(
    'login',
    async ({phoneNumber, password, enqueueSnackbar, navigate}, thunkApi) => {
        try {
            const response = await login(phoneNumber, password);
            enqueueSnackbar('successfully logged in!', {variant: 'success'});
            // navigate('/dashboard');

            console.log(response.data, 'response.data');
            return response.data;
        } catch (error) {
            enqueueSnackbar(error.response.data.error, {variant: 'error'});
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.errorMessage = '';
            state.user.email = action.payload.user.email;
            state.user.phoneNumber = action.payload.user.phoneNumber;
            state.user.location = action.payload.user.location;
            state.user.fullName = action.payload.user.fullName;
            state.token = action.payload.token;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.errorMessage = action.payload.error;
        });
    }
});

export const { setPhoneNumberValue } = loginSlice.actions;
export default loginSlice.reducer;