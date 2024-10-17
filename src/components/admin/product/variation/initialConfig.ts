import { ActionTable, ColumnTable, OptionAction, OptionSearch } from "@/types/initialConfigAdmin"
import { Variation, VariationDto } from "@/types/product"
import { QueryParameter } from "@/types/queryParameter"




export const ColumnVariation: ColumnTable[] = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Thông tin giá trị ",
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
export const optionSearch: OptionSearch<Variation> = {
    modeShow: {
        style: {
            display: "none"
        }
    },
    attribute: 'name',
    SearchItems: [
    ]
}


export const initialForm: VariationDto =
{
    name: '',
    description: '',
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
        name: "",
        
    }
}
