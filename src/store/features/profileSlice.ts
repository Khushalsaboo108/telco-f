import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "react-cookies";
import { RootState } from "../store";
import { adminProfile, loginAdmin } from "@/app/actions/admin.action";
import { setCookieWithExpiry } from "./authSlice";
import { IPermission, IRole } from "@/types/role";

type TState = {
  loading: boolean;
  message: string | null;
  email: string;
  name: string;
  permission: IPermission[] | null;
};

const initialState: TState = {
  loading: false,
  message: null,
  email: "",
  name: "",
  permission: null,
};

//create async thunk for login
const profileData = createAsyncThunk("profile/login", async (_, thunkApi) => {
  try {
    let user;
    user = await adminProfile();

    return thunkApi.fulfillWithValue(user);
  } catch (error) {
    throw thunkApi.rejectWithValue(error);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(profileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(profileData.fulfilled, (state, action) => {
      state.loading = false;
      state.permission = action.payload?.data.role.permissions || null;
    });
    builder.addCase(profileData.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    clearprofile: () => {
      return initialState;
    },
  },
});

export { profileData };
export const profileLoading = (state: RootState) => state.profile.loading;
export const profileMessage = (state: RootState) => state.profile.message;
export const progilePermission = (state: RootState) => state.profile.permission;
export const profileName = (state: RootState) => state.profile.name;
export const { clearprofile } = profileSlice.actions;
export default profileSlice.reducer;
