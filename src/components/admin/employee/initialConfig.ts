import { ActionTable, ColumnTable, OptionAction, OptionSearch, SearchItem } from "@/types/initialConfigAdmin"

import { ComponentSearchAdmin } from "@/types/search"


export const ColumnEmployee: ColumnTable[] = [
    {
        name: "STT",
        style: {
            'width': "40px"
        }
    },
    {
        name: "Họ Và Tên",
        style: {
            'width': "180px"
        }
    }
    ,
    {
        name: "Tên Đăng Nhập ",
        style: {
            'width': "180px"
        }
    },
    {
        name: "Avatar",
        style: {
            'width': "100px"
        }
    },
    {
        name: "Email",
        style: {
            'width': "250px"
        }
    },
    {
        name: "Trạng Thái",
        style: {
            'width': "150px"
        }
    }
    ,
    {
        name: "Ngày cập nhập",
        style: {
            'width': "150px"
        }
    }
    ,
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
            display: "none"
        }
    }
}
export const optionSearch: OptionSearch<EmployeeProjection> = {
    modeShow: {
        style: {
            display: "block"
        }
    },
    attribute: 'name',
    SearchItems: [
        {
            title: "Chọn vai trò",
            url: "role",
            attribute: 'roleId',
            take: 'id',
            show: 'name',
            component: ComponentSearchAdmin.select
        },
        {
            title: "Chọn trạng thái",
            url: "profile/account-status",
            attribute: 'status',
            take: 'id',
            show: 'name',
            component: ComponentSearchAdmin.select
        }
    ]
}
export interface initialForm {
    avatar: null | File,
    name: string | null,
    nameLogin: string | null,
    password: string | null,
    confirmPassword: string | null,
    provinces: string | null,
    districts: string | null,
    wards: string | null,
    accountStatus: string | null,
    phone: number | null,
    roles: string[] | null,
    address: string | null,
    birthOfDate: string | null,
    idCard: number | null
}
export const initialForm: initialForm =
{
    avatar: null,
    name: null,
    nameLogin: null,
    password: null,
    confirmPassword: null,
    provinces: '48',
    districts: null,
    wards: null,
    accountStatus: null,
    phone: null,
    roles: [],
    address: null,
    birthOfDate: null,
    idCard: null
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
        roleId: null,
        status: null,
        includeDeleted: false
    }
}
export const statusAccount = {
    "ACTIVATED": "badge rounded-pill badge-light-success",
    "INACTIVE": "badge rounded-pill badge-light-warning",
    "LOCK": "badge rounded-pill  badge-light-danger"
}

export const getStatusClassName = (status: keyof typeof statusAccount) => {
    return statusAccount[status];
};