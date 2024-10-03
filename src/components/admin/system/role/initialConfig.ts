import { ActionTable, ColumnTable, OptionAction, OptionSearch } from "@/types/initialConfigAdmin"

export const columnRoles: ColumnTable[] = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Tên ",
        style: {
            'width': "150px"
        }
    },
    {
        name: "Mô Tả",
        style: {
            'width': "300px"
        }
    },
    {
        name: "",
        style: {
            'width': "70px"
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
            display: "none"
        }
    }
}
export const optionSearch: OptionSearch<Role> = {
    modeShow: {
        style: {
            display: "none"
        }
    },
    attribute: 'name',
    SearchItems: []
}
export interface InitialForm{
    id? : number | null,
    name:string|null,
    alias:string|null,
    description: string|null,
    permissions:string[]|[]
}
export const initialForm =
{
    name: '',
    alias:'',
    description: '',
    permissions:[]
}
export const optionActions:ActionTable[] = [
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
        includeDeleted:false
    }
}