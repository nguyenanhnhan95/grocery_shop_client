import { ActionTable, ColumnTable, OptionAction, OptionSearch } from "@/types/initialConfigAdmin"
import { VariationOption, VariationOptionDto } from "@/types/product"
import { QueryParameter } from "@/types/queryParameter"

import { ComponentSearchAdmin } from "@/types/search"


export const ColumnVariationOption: ColumnTable[] = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Phân loại kiểu sản phẩm",
        style: {
            'width': "250px"
        }
    },
    {
        name: "Giá trị",
        style: {
            'width': "250px"
        }
    },
    {
        name: "",
        style: {
            'width': "100px"
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
export const optionSearch: OptionSearch<VariationOption> = {
    modeShow: {
        style: {
            display: "block"
        }
    },
    attribute: 'name',
    SearchItems: [
        {
            title: "Loại kiểu sản phẩm",
            url: "variation",
            attribute: 'variation',
            show: 'name',
            take: 'id',
            component: ComponentSearchAdmin.select
        },
    ]
}

export const initialForm: VariationOptionDto =
{
    name: '',
    description: '',
    idVariation: null
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
