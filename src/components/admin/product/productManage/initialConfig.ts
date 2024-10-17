import { ActionTable, ColumnTable, OptionAction, OptionSearch } from "@/types/initialConfigAdmin"
import { ProductDto, ProductManage } from "@/types/product"
import { QueryParameter } from "@/types/queryParameter"

import { ComponentSearchAdmin } from "@/types/search"


export const ColumnProduct: ColumnTable[] = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Tên Sản Phẩm ",
        style: {
            'width': "200px"
        }
    },
    {
        name: "Hình Ảnh",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Thương hiệu",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Loại Sản Phẩm",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Số lượng",
        style: {
            'width': "180px"
        }
    },
    {
        name: "",
        style: {
            'width': "150px"
        }
    }
]
export const sectionActions: OptionAction = {
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
export const optionSearch: OptionSearch<ProductManage> = {
    modeShow: {
        style: {
            display: "block"
        }
    },
    attribute: 'name',
    SearchItems: [
        {
            title: "Mã Code",
            url: "shop-promotion/codes",
            attribute: 'brand',
            component: ComponentSearchAdmin.text
        },
        {
            title: "Loại sản phẩm",
            url: "product-category/children",
            attribute: 'productCategory',
            show: 'name',
            take: 'id',
            component: ComponentSearchAdmin.select
        },
    ]
}


export const initialForm: ProductDto =
{
    images: [],
    name: null,
    brand: null,
    productCategory: null,
    variation: null,
    description: null,
    productItems: [
        {
            images: [],
            price: null,
            qtyInStock: null,
            sku: null,
            promotions: [],
            variationOptions: []
        }
    ]
}
export const optionActions: ActionTable[] = [
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
export const queryParameterInitial: QueryParameter = {
    size: 5,
    page: 0,
    criterias: {
        name: ""
    }
}
