import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    token: null, // Added to store token
  },
  loading: false,
  otpSent: false,
  otp: "",
  userId: "",
  error: "",
};

// Async actions
export const signUp = createAsyncThunk("auth/signUp", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/signup/user", formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || "Error during signup.");
  }
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ userId, otp }, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/signup/user/verify-otp", { userId, otp });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || "Error during OTP verification.");
  }
});

export const login = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/login/user", formData);
    return response.data; // Assuming response contains { token, user }
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || "Error during login.");
  }
});

// Logout action to clear token and user data
export const logout = createAsyncThunk("auth/logout", async () => {
  return null; // We're just clearing the data on logout
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.userId = action.payload.userId;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = false;
        state.userId = "";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.formData.token = action.payload.token; // Save token from API response
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.formData = initialState.formData; // Reset form data
      });
  },
});

// Export actions and reducer
export const { setFormData, setOtp, resetError } = authSlice.actions;
export default authSlice.reducer;
