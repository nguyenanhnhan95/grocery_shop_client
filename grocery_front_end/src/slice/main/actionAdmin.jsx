import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createHeader } from "../../utils/commonUtils";
import { toastError, toastSuccess } from "../../config/toast";

export const saveDataAdmin = createAsyncThunk('saveDataAdmin',
    async ({ http, data }, { rejectWithValue }) => {
        try {
            const response = await axios.post(http, data, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const editDataAdmin = createAsyncThunk('editDataAdmin',
    async ({ http, id, data }, { rejectWithValue ,getState}) => {
        try {
            const response = await axios.patch(`${http}/?id=${id}`, data, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getDataByIdAdmin = createAsyncThunk('getDataByIdAdmin',
    async ({ http, data }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${http}/?id=${data}`, createHeader());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const deleteDataAdmin = createAsyncThunk('deleteDataAdmin',
    async ({ http, data }, { rejectWithValue,dispatch }) => {
        try {
            const response = await axios.delete(`${http}/?id=${data}`, createHeader());
            if(response.data.code===200){
                dispatch(resetPage())
                toastSuccess(response.data.message)
            }
            return response.data;
        } catch (error) {
            toastError(rejectWithValue(error.response.data).payload.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const searchDataAdmin = createAsyncThunk('searchDataAdmin',
    async ({ http, data }, { rejectWithValue }) => {
        try {
            const response = await axios.get(http + `?query=${data}`, createHeader());
            if (response.data.status === 204) {
                return [];
            } else {
                return response.data;
            }

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const actionAdminSlice = createSlice({
    name: "actionAdmin",
    initialState: {
        loading: false,
        list: { result: [], total: 0 },
        data: [],
        onClickAction: null,
        close: false,
        httpApi: '',
        httpNavigate: '',
        itemAction: null,
        initialForm: {},
        editForm:{},
        itemSearch: [],
        nameColumn: [],
        dataActions: [],
        TBodyTable: null,
        success: false,
        error: null,
        queryParameter: {
            size: 5,
            page: 0,
            criterias: {
                name: ''
            }
        }
    },
    reducers: {
        actionSave: (state, action) => {
            state.save = action.payload.save
            state.close = action.payload.close;
        },
        selectSize: (state, action) => {
            state.queryParameter.size = action.payload;
        },
        choicePage: (state, action) => {
            state.queryParameter.page = action.payload;
        },
        onClickSaveAction: (state, action) => {
            state.onClickAction = action.payload;
        },
        createQueryParameter: (state, action) => {
            state.queryParameter = action.payload;
        },
        resetPage: (state, action) => {
            const queryParameterTemp = { ...state.queryParameter, page: 0 }
            state.queryParameter = queryParameterTemp;

        },
        createDataEdit: (state, action) => {
            state.editForm = action.payload;
        },
        setActionModel: (state, action) => {
            state.initialForm = action.payload.initialForm;
            state.editForm = action.payload.initialForm;
            state.httpApi = action.payload.httpApi;
            state.httpNavigate = action.payload.httpNavigate;
            state.itemAction = action.payload.itemAction;
            state.itemSearch = action.payload.itemSearch;
            state.queryParameter = action.payload.queryParameter;
            state.nameColumn = action.payload.nameColumn;
            state.dataActions = action.payload.dataActions;
            state.TBodyTable = action.payload.TBodyTable;
            state.list={ result: [], total: 0 };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveDataAdmin.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(saveDataAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.success = true;
                state.error = null;
            })
            .addCase(saveDataAdmin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
        builder.addCase(editDataAdmin.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(editDataAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(editDataAdmin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.result;
            })
        builder.addCase(deleteDataAdmin.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(deleteDataAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(deleteDataAdmin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.result;
            })
        builder.addCase(searchDataAdmin.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(searchDataAdmin.fulfilled, (state, action) => {
                state.success = true;
                state.error = null;
                state.loading = false;
                if (action.payload.result !== undefined) {
                    state.list = action.payload.result
                } else {
                    state.list = {
                        result: [],
                        total: 0
                    }
                }
                // const queryParameterTemp= {...state.queryParameter,page:0}
                // state.queryParameter=queryParameterTemp;

            })
            .addCase(searchDataAdmin.rejected, (state, action) => {
                console.log(action)
                state.loading = false;
                state.success = false;
                state.list = {
                    result: [],
                    total: 0
                }
                // state.error = action.payload.result;

            })
        builder.addCase(getDataByIdAdmin.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getDataByIdAdmin.fulfilled, (state, action) => {
                state.success = true;
                state.error = null;
                state.loading = false;
                if (action.payload.result !== undefined) {
                    state.dataEdit = action.payload.result
                }

            })
            .addCase(getDataByIdAdmin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.result;
            })
    }
})
export const { actionSave, selectSize, choicePage, createQueryParameter, createDataEdit,
    onClickSaveAction, setActionModel, resetPage } = actionAdminSlice.actions