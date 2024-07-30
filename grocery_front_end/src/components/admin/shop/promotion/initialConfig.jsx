import { typeSearchAdvanced } from "../../../../utils/commonConstants"
import { createActionURL } from "../../../../utils/commonUtils"

export const shopPromotionHttp={
    actionURL: createActionURL('shop-promotion'),
    shopPromotionNavigate:"/admin/shop-promotion",
    shopPromotionCode:"http://localhost:8080/shop-promotion/codes"
}
export const shopPromotionAction = {
    add: {
        icon: "fa-solid fa-plus fa-sm pr-1",
        name: "Thêm mới",
        style: {
            display: "block"
        }
    },
    excel: {
        icon: "fa-solid fa-file-arrow-down fa-sm pr-1",
        name: "Xuất Excel",
        style: {
            display: "block"
        }
    }
}
export const initialForm = { name: "", code: "", description: "", discountRate: 0, startDate: new Date(), endDate: null }
export const shopPromotionSearch = {
    searchAdvanced: {
        style: {
            display: "block"
        }
    },
    items: [
        {
            title: "Mã code",
            callApi: true,
            data: shopPromotionHttp.shopPromotionCode,
            search: { code: null },
            component: typeSearchAdvanced.InputDataSearch
        },
        {
            title: "Ngày bắt đầu",
            search: { startDate: null },
            component: typeSearchAdvanced.DateItemSearch
        },
        {
            title: "Ngày kết thúc",
            search: { endDate: null },
            component: typeSearchAdvanced.DateItemSearch
        },
    ]
}
export const columnShopPromotion = [
    {
        name: "STT",
        style: {
            'min-width': "10px"
        }
    },
    {
        name: "Tên mã giảm giá",
        style: {
            'min-width': "180px"
        }
    },
    {
        name: "Thông tin giảm giá",
        style: {
            'min-width': "180px"
        }
    },
    {
        name: "Mã code",
        style: {
            'min-width': "100px"
        }
    },
    {
        name: "Ngày bắt đầu",
        style: {
            'min-width': "100px"
        }
    },
    {
        name: "Ngày kêt thúc",
        style: {
            'min-width': "100px"
        }
    },
    {
        name: "",
        style: {
            'min-width': "100px"
        }
    }
]
export const dataActions = [
    {
        name: "Sửa",
        icon: "fa-solid fa-pencil mr-2",
        action: "edit"
    },
    {
        name: "Xóa",
        icon: "fa-regular fa-trash-can mr-2",
        action: "delete",
    }
]
export const queryParameter = {
    size: 2,
    page: 0,
    criterias: {
        name: ""
    }
}

