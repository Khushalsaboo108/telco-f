import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "react-cookies";
import { RootState } from "../store";
import { login } from "@/app/actions/user.action";

type TState = {
  userAccessToken: string;
  userRefreshToken: string;
  loading: boolean;
  message: string | null;
  password: string;
  email: string;
  name: string;
};

const initialState: TState = {
  userAccessToken: "",
  userRefreshToken: "",
  loading: false,
  message: null,
  password: "",
  email: "",
  name: "",
};

export const setCookieWithExpiry = (
  name: string,
  value: string,
  days: number,
  options: { secure?: boolean; sameSite?: "strict" | "lax" | "none" } = {}
) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  Cookies.save(name, value, {
    path: "/",
    expires: date,
    ...options,
  });
};

//create async thunk for login
const authLogin = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      let user;
      user = await login(data);

      setCookieWithExpiry("userAccessToken", user.tokens.accessToken ?? "", 1);
      setCookieWithExpiry(
        "userRefreshToken",
        user.tokens.refreshToken ?? "",
        7
      );

      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.name = action.payload.data.name ?? "";
      state.email = action.payload.data.email ?? "";
    });
    builder.addCase(authLogin.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    clearAuth: () => {
      return initialState;
    },
    logoutAuth: (state) => {
      state.userAccessToken = "";
      state.userRefreshToken = "";
      state.loading = false;
      Cookies.remove("userAccessToken", { path: "/" });
      Cookies.remove("userRefreshToken", { path: "/" });
    },
    setAdminPassword: (state, action) => {
      let data = action.payload;
      state.password = data;
    },
  },
});

export { authLogin };
export const authLoading = (state: RootState) => state.auth.loading;
export const accessToken = (state: RootState) => state.auth.userAccessToken;
export const refreshToken = (state: RootState) => state.auth.userRefreshToken;
export const AuthMessage = (state: RootState) => state.auth.message;
export const authName = (state: RootState) => state.auth.name;
export const { clearAuth, logoutAuth, setAdminPassword } = authSlice.actions;
export default authSlice.reducer;
