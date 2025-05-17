import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "react-cookies";
import { RootState } from "../store";
import { loginAdmin, updateAdminProfile } from "@/app/actions/admin.action";
import { setCookieWithExpiry } from "./authSlice";

type TState = {
  adminAccessToken: string;
  adminRefreshToken: string;
  loading: boolean;
  message: string | null;
  password: string;
  email: string;
  name: string;
  status: string;
};

const initialState: TState = {
  adminAccessToken: "",
  adminRefreshToken: "",
  loading: false,
  message: null,
  password: "",
  email: "",
  status: "",
  name: "",
};

//create async thunk for login
const adminLogin = createAsyncThunk(
  "admin/login",
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      let user;
      user = await loginAdmin(data);

      setCookieWithExpiry(
        "adminAccessToken",
        user?.data?.tokens.accessToken ?? "",
        1,
        { secure: true, sameSite: "strict" }
      );
      setCookieWithExpiry(
        "adminRefreshToken",
        user?.data?.tokens.refreshToken ?? "",
        7,
        { secure: true, sameSite: "strict" }
      );

      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const updateProfile = createAsyncThunk(
  "admin/updateProfile",
  async (data: { name: string }, thunkApi) => {
    try {
      let user;
      user = await updateAdminProfile(data);

      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.adminAccessToken = action.payload?.data?.tokens.accessToken ?? "";
      state.adminRefreshToken = action.payload?.data?.tokens.refreshToken ?? "";
      state.name = action.payload?.data.admin?.name ?? "";
      state.email = action.payload?.data?.admin?.email ?? "";
      state.status = action.payload?.data?.admin?.status ?? "";
    });
    builder.addCase(adminLogin.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.name = action.payload?.data?.name ?? "";
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    clearadmin: () => {
      return initialState;
    },
    logoutAdmin: (state) => {
      state.adminAccessToken = "";
      state.adminRefreshToken = "";
      state.loading = false;
      Cookies.remove("adminAccessToken", { path: "/" });
      Cookies.remove("adminRefreshToken", { path: "/" });
    },
    setAdminPassword: (state, action) => {
      let data = action.payload;
      state.password = data;
    },
  },
});

export { adminLogin, updateProfile };
export const adminLoading = (state: RootState) => state.admin.loading;
export const accessToken = (state: RootState) => state.admin.adminAccessToken;
export const refreshToken = (state: RootState) => state.admin.adminRefreshToken;
export const adminMessage = (state: RootState) => state.admin.message;
export const adminName = (state: RootState) => state.admin.name;
export const { clearadmin, logoutAdmin, setAdminPassword } = adminSlice.actions;
export default adminSlice.reducer;
