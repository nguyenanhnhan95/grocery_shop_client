import { Route, Routes } from "react-router-dom";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setActionModel } from "../../../../redux/slice/admin/actionAdmin";
import { columnVariationOption, dataActions, initialForm, queryParameter, variationOptionAction, variationOptionHttp, variationOptionSearch } from "./initialConfig";
import TBodyTable from "./TBodyTable";
import LoadingPage from "../../../loading/LoadingPage";
import store from "../../../../store/store";
import { actionReducerStore, reducerSliceKey } from "../../../../utils/commonConstants";
import { fetchVariationSlice } from "../../../../redux/slice/product/variation";
function RouteVariationOption() {
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0, 'smooth')
        store.injectReducer(actionReducerStore.add, reducerSliceKey.productVariation, fetchVariationSlice.reducer)
        const initializeState = async () => {
            try {
                await dispatch(setActionModel({
                    httpNavigate: variationOptionHttp.variationOptionNavigate,
                    httpApi: variationOptionHttp.actionURL.instant(),
                    itemAction: variationOptionAction,
                    itemSearch: variationOptionSearch,
                    queryParameter: queryParameter,
                    nameColumn: columnVariationOption,
                    dataActions: dataActions,
                    initialForm: initialForm,
                    TBodyTable: TBodyTable
                }));
                setInitialized(true);
            } catch (error) {
                console.error("Error initializing state:", error);
                // Xử lý lỗi nếu cần thiết
            }
        };

        initializeState();
    }, [dispatch]);
    if (!initialized) {
        return <LoadingPage />; // Hoặc bất kỳ component nào khác bạn muốn hiển thị trong khi khởi tạo
    }

    return (
        <Routes>
            <Route path="/" element={<Manage />} />
            <Route path="/add" element={<FormBasic />} />
            <Route path="/edit/:id" element={<FormBasic />} />
        </Routes>
    );
}
export default RouteVariationOption;