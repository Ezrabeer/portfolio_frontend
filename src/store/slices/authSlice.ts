import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { HttpResponseStatusCodes } from '@/utils/http-response-status-codes';
import { AuthGuard } from '@/services/auth-guard';

/**
 * get currently logged in user from DB.
 *
 * This usually happens after a successful login
 * or after a page refresh when there is currently
 * an active user.
 */
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/api/user');

    // User was loaded successfully.
    if (response.status !== HttpResponseStatusCodes.OK) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

interface UserProps {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserProps, thunkAPI) => {
    try {
      await AuthGuard.getCsrfCookie();

      const response = await axios.post('/login', {
        email,
        password,
      });

      if (response.status !== HttpResponseStatusCodes.OK) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (e) {
      const error = e as AxiosError;

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/logout');

    if (response.status !== HttpResponseStatusCodes.NO_CONTENT) {
      return thunkAPI.rejectWithValue(response.data);
    }

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const { loadUser } = authSlice.actions;

export default authSlice.reducer;
