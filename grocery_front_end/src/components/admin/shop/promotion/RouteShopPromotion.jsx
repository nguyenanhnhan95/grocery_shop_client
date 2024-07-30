
import { useEffect, useState } from "react";
import FormBasic from "./FormBasic";
import Manage from "./Manage";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setActionModel } from "../../../../redux/slice/admin/actionAdmin";
import { columnShopPromotion, dataActions, initialForm, queryParameter, shopPromotionAction, shopPromotionHttp, shopPromotionSearch } from "./initialConfig";
import TBodyTable from "./TBodyTable";
import LoadingPage from "../../../loading/LoadingPage";


function RouteShopPromotion() {
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0, 'smooth')
        const initializeState = async () => {
            try {
                await dispatch(setActionModel({
                    httpNavigate: shopPromotionHttp.shopPromotionNavigate,
                    httpApi: shopPromotionHttp.actionURL.instant(),
                    itemAction: shopPromotionAction,
                    itemSearch: shopPromotionSearch,
                    queryParameter: queryParameter,
                    nameColumn: columnShopPromotion,
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
        return <LoadingPage />;; // Hoặc bất kỳ component nào khác bạn muốn hiển thị trong khi khởi tạo
    }

    return (
        <Routes>
            <Route path="/" element={<Manage />} />
            <Route path="/add" element={<FormBasic />} />
            <Route path="/edit/:id" element={<FormBasic />} />
        </Routes>
    );
}

export default RouteShopPromotion;