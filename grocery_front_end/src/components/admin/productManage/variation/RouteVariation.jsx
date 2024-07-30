import { Routes, Route } from "react-router-dom";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setActionModel } from "../../../../redux/slice/admin/actionAdmin";
import { columnVariation, dataActions, initialForm, queryParameter, variationAction, variationHttp, variationSearch } from "./initialConfig";
import TBodyTable from "./TBodyTable";

function RouteVariation() {
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0, 'smooth')
        const initializeState = async () => {
            try {
                await dispatch(setActionModel({
                    httpNavigate: variationHttp.variationNavigate,
                    httpApi: variationHttp.actionURL.instant(),
                    itemAction: variationAction,
                    itemSearch: variationSearch,
                    queryParameter: queryParameter,
                    nameColumn: columnVariation,
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
        return <div>Loading...</div>; // Hoặc bất kỳ component nào khác bạn muốn hiển thị trong khi khởi tạo
    }

    return (
        <Routes>
            <Route path="/" element={<Manage />} />
            <Route path="/add" element={<FormBasic />} />
            <Route path="/edit/:id" element={<FormBasic />} />
        </Routes>
    );
}

export default RouteVariation;