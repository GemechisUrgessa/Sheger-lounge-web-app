// Description: This file contains the register slice of the redux store
import { register } from "../../services/register";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  phoneNumber: "",
  errorMessage: "",
};
// thunk function that takes in phoneNumber, email, password, location and fullName and registers user
// export thunk and return response from register function
// if error return error
export const registerUser = createAsyncThunk(
  "register",
  async (
    { phoneNumber, email, password, location, fullName, enqueueSnackbar , navigate},
    thunkApi
  ) => {
    try {
      const response = await register(
        phoneNumber,
        email,
        password,
        location,
        fullName
      );

      enqueueSnackbar("successfully registered!", { variant: "success" });
      navigate(`/login?phoneNumber=${phoneNumber}`);
      return response.data;
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
// create slice
// create reducers
// export slice
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.errorMessage = "";
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
    });
  },
});

// export const { setPhoneNumberValue } = registerSlice.actions;
export default registerSlice.reducer;
