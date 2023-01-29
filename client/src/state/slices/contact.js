import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postContact } from "../../services/contact";
const initialState = {
    errorMessage: ''    
};

export const contactUs = createAsyncThunk(
    'contact',
    async ({fullName, email, subject, message, enqueueSnackbar, navigate}, thunkApi) => {
        try {
            const response = await postContact(fullName, email, subject, message);
            enqueueSnackbar('successfully sent!', {variant: 'success'});
            navigate('/');
            return response.data;
        }
        catch (error) {
            enqueueSnackbar(error.response.data.error, {variant: 'error'});
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);


export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(contactUs.fulfilled, (state, action) => {
            state.errorMessage = '';
        });

        builder.addCase(contactUs.rejected, (state, action) => {
            state.errorMessage = action.payload.error;
        });
    }
});

// export const { setFullNameValue, setEmailValue, setSubjectValue, setMessageValue } = contactSlice.actions;
export default contactSlice.reducer;