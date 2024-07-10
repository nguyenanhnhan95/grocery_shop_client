import { Routes,Route } from "react-router-dom";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setActionModel } from "../../../../slice/main/actionAdmin";
import { columnProducts, dataActions, initialForm, productsAction, productsHttp, productsSearch, queryParameter } from "../../../../constants/admin/productManage/products";
import TBodyTable from "./TBodyTable";
function RouteProduct(){
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0, 'smooth')
        const initializeState = async () => {
            try {
                await dispatch(setActionModel({
                    httpNavigate: productsHttp.productsNavigate,
                    httpApi: productsHttp.actionURL.instant(),
                    itemAction: productsAction,
                    itemSearch: productsSearch,
                    queryParameter: queryParameter,
                    nameColumn: columnProducts,
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
export default RouteProduct;