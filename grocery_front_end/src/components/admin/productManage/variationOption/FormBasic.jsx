import { memo, useEffect } from "react";
import SaveAction from "../../common/SaveAction";
import FormManage from "../../common/FormManage";
import ContentForm from "./ContentForm"
import { FETCH_PRODUCT_VARIATION } from "../../../../redux/action/admin/productManage/variation";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_CONTENT_FORM } from "../../../../utils/commonConstants";
import { findAllVariation } from "../../../../redux/slice/product/variation";

function FormBasic() {
    const dispatch = useDispatch();
    const {statusVariation} = useSelector(state=>state.productVariation)
    useEffect(()=>{
        if(statusVariation===FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_INITIAL){
            dispatch(findAllVariation())
        }
    },[ statusVariation, dispatch])
    return (
        <div className={ statusVariation===FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_LOADING && LOADING_CONTENT_FORM }>
            <SaveAction />
            {/* <ContentForm /> */}
            <FormManage Form={ContentForm}  />
        </div>
    )
}
export default memo(FormBasic);