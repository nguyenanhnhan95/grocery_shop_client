'use client'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { createActionURL, getURICurrent, removeURIDomain } from "@/utils/commonUtils";
import { ConstraintErrors } from "@/types/constraintErros";
// Định nghĩa kiểu cho dữ liệu menu
export interface Menu {
  title: string;
  isActive: boolean;
  href: string;
  subMenus: Menu[];
  resources: string[];
  iconClass: string;
  header: boolean;
  requiredPermissions: string[];
}

const loadMenuParentActive = (menus: Menu[]) => {
  try {
    const resourceCurrent = removeURIDomain(getURICurrent());
    let matchingParent = null;
    let longestMatchLength = 0;
    menus.forEach((parent) => {
      if (parent.subMenus.length > 0) {
        parent.subMenus.forEach((child) => {
          if (
            resourceCurrent.length >= child.href.length &&
            resourceCurrent.startsWith(child.href) &&
            child.href.length > longestMatchLength
          ) {
            matchingParent = parent;
            longestMatchLength = child.href.length;
          }
        });
      }
    });

    if (matchingParent) {
      return matchingParent;
    }
    return null;
  } catch (error) {
    console.error("Lỗi Hệ thống")
    return null;
  }
}

interface MenuContentMainState {
  menu: Menu | null;
  error: string | null;
  menuParentActive: Menu | null;
  loadingMenus: boolean | null;
  loadingMenu: boolean | null;
  menus: Menu[];
  errorPathAdmin: string | null;
}

// Initial state cho slice
const initialState: MenuContentMainState = {
  menu: null,
  error: null,
  menuParentActive: null,
  loadingMenus: null,
  loadingMenu: null,
  menus: [],
  errorPathAdmin: null
};

// Async thunk để lấy danh sách menus từ API
export const getSidebarMenusAdmin = createAsyncThunk<Menu[], void, { rejectValue: object }>(
  'getSidebarMenus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${createActionURL('menu/admin-side').instant()}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as ConstraintErrors | {};
      return rejectWithValue(responseData );
    }
  }
);

// Async thunk để lấy menu theo path
export const getMenuByPathAdmin = createAsyncThunk<Menu, string, { rejectValue: string }>(
  '/menu/admin-side/path',
  async (path, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${createActionURL('menu/admin-side/path').requestParam([{ key: 'path', value: path }])}`, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice quản lý state của menuContentMain
export const menuContentMainSlice = createSlice({
  name: 'menuContentMainSlice',
  initialState,
  reducers: {
    transferMenuToContentMain: (state, action: PayloadAction<Menu | null>) => {
      state.menu = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSidebarMenusAdmin.pending, (state) => {
      state.loadingMenus = true;
    })
      .addCase(getSidebarMenusAdmin.rejected, (state, action) => {
        state.loadingMenus = false;
        // state.error = action.payload || null;
      })
      .addCase(getSidebarMenusAdmin.fulfilled, (state, action) => {
        state.error = null;
        state.loadingMenus = false;
        state.menus = action.payload;
        state.menuParentActive = loadMenuParentActive(state.menus);
      })
      .addCase(getMenuByPathAdmin.pending, (state) => {
        state.loadingMenu = true;
      })
      .addCase(getMenuByPathAdmin.rejected, (state, action) => {
        state.loadingMenu = false;
        state.errorPathAdmin = action.payload ?? null;
      })
      .addCase(getMenuByPathAdmin.fulfilled, (state, action) => {
        state.errorPathAdmin = null;
        state.loadingMenu = false;
        state.menu = action.payload;
      });
  }
});

// Export action
export const { transferMenuToContentMain } = menuContentMainSlice.actions;

// Export reducer
export default menuContentMainSlice.reducer;
