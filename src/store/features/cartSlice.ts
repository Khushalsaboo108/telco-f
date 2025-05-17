import { ICourse } from "@/types/course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICartDetails } from "@/types/common";

interface CourseState {
  cart: ICartDetails[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    },

    addCourse: (state, action) => {
      const courseExists = state.cart.some(
        (course) => course._id === action.payload._id
      );

      if (!courseExists) {
        state.cart.push(action.payload);
      }
    },

    removeCourse: (state, action) => {
      state.cart = state.cart.filter((course) => course._id !== action.payload);
    },

    updateCourse: (state, action) => {
      const index = state.cart.findIndex(
        (course) => course._id === action.payload._id
      );
      if (index !== -1) {
        state.cart[index] = action.payload;
      }
    },

    removeLab: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCourses,
  addCourse,
  removeCourse,
  removeLab,
  updateCourse,
  setLoading,
  setError,
} = cartSlice.actions;

export const selectCourses = (state: RootState) => state.cart.cart;
export const selectLoading = (state: RootState) => state.cart.loading;
export const selectError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
