import { memo, useEffect, useMemo } from "react";
import FormManage from "../../common/FormManage";
import SaveAction from "../../common/SaveAction";
import ContentForm from "./ContentForm";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_PRODUCT_CATEGORY_CHILDREN, LOADING_CONTENT_FORM } from "../../../../utils/commonConstants";
import { findChildrenCategory } from "../../../../redux/slice/product/productCategory";
import { FETCH_PRODUCT_VARIATION } from "../../../../redux/action/admin/productManage/variation";
import { findAllVariation } from "../../../../redux/slice/product/variation";
import { FETCH_SHOP_PROMOTION } from "../../../../redux/action/admin/shop/promotion";
import { findAllPromotion } from "../../../../redux/slice/shop/promotion";



function FormBasic() {
    const { statusChildren } = useSelector(state => state.productCategoryMenus);
    const { statusVariation } = useSelector(state => state.productVariation)
    const { statusPromotion } = useSelector(state => state.shopPromotion)
    const dispatch = useDispatch();
    useEffect(() => {
        if (statusChildren === FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_INITIAL) {
            dispatch(findChildrenCategory())
        }
        if (statusVariation === FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_INITIAL) {
            dispatch(findAllVariation())
        }
        if (statusPromotion === FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_INITIAL) {
            dispatch(findAllPromotion())
        }
    }, [statusChildren, statusVariation, dispatch])
    const isLoading = useMemo(() => {
        return statusChildren === FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_LOADING ||
            statusVariation === FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_LOADING ||
            statusPromotion === FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_LOADING
    }, [statusChildren, statusVariation, statusPromotion])
    return (
        <div className={isLoading ? LOADING_CONTENT_FORM : ''}>
            <SaveAction />
            <FormManage Form={ContentForm} />
        </div>
    )
}
export default memo(FormBasic);