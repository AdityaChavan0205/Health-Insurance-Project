import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    token: localStorage.getItem("token") || null, // Persist token
  },
  loading: false,
  otpSent: false,
  otp: "",
  userId: "",
  error: "",
};

// Async actions
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup/user", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Error during signup.");
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/send-otp", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Error during OTP sending.");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup/user/verify-otp", { userId, otp });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Error during OTP verification.");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/login/user/forget-password", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Error during password reset request.");
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/user/reset-password/${resetToken}`, // ✅ This should match backend route
        { newPassword },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Invalid or expired token. Please request a new reset link.");
    }
  }
);



export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/login/user", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Error during login.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return null;
});

// Utility function for handling async states
const handleAsync = (builder, asyncThunk, successHandler) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      successHandler(state, action);
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong.";
    });
};

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
    // Sign Up
    handleAsync(builder, signUp, (state, action) => {
      state.otpSent = true;
      state.userId = action.payload.userId;
    });

    // Send OTP
    handleAsync(builder, sendOtp, (state) => {
      state.otpSent = true;
    });

    // Verify OTP
    handleAsync(builder, verifyOtp, (state) => {
      state.otpSent = false;
      state.userId = "";
    });

    // Forgot Password
    handleAsync(builder, forgotPassword, (state) => {
      state.otpSent = true;
    });

    // Reset Password
    handleAsync(builder, resetPassword, (state) => {
      state.otpSent = false;
    });

    // Login
    handleAsync(builder, login, (state, action) => {
      state.formData.token = action.payload.token;
      localStorage.setItem("token", action.payload.token); // Persist token
    });

    // Logout
    handleAsync(builder, logout, (state) => {
      state.formData = initialState.formData;
      localStorage.removeItem("token"); // Clear token
    });
  },
});

// Export actions and reducer
export const { setFormData, setOtp, resetError } = authSlice.actions;
export default authSlice.reducer;
