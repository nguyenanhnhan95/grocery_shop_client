import { ActionTable, ColumnTable, OptionAction, OptionSearch, SearchItem } from "@/types/initialConfigAdmin"

import { ComponentSearchAdmin } from "@/types/search"


export const ColumnPromotion: ColumnTable[] = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Tên mã giảm giá",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Thông tin giảm giá",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Mã code",
        style: {
            'width': "100px"
        }
    },
    {
        name: "Ngày bắt đầu",
        style: {
            'width': "100px"
        }
    },
    {
        name: "Ngày kêt thúc",
        style: {
            'width': "100px"
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
export const optionSearch: OptionSearch<Promotion> = {
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
            attribute: 'code',
            take: 'id',
            component: ComponentSearchAdmin.dataList
        },
        {
            title: "Chọn ngày bắt đầu",
            attribute: 'startDate',
            component: ComponentSearchAdmin.date
        },
        {
            title: "Chọn ngày kết thúc",
            attribute: 'endDate',
            component: ComponentSearchAdmin.date
        }
    ]
}
export interface InitialForm {
    id? : number | null,
    name: string | null,
    code: string | null,
    description: string | null,
    discountRate:number,
    startDate: Date | null,
    endDate: Date | null,
}

export const initialForm: InitialForm =
{
    name: '',
    code: '',
    description: '',
    discountRate:0,
    startDate: new Date(),
    endDate:null
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
