import { ActionTable, ColumnTable, OptionAction, OptionSearch} from "@/types/initialConfigAdmin"
import { QueryParameter } from "@/types/queryParameter"

import { ComponentSearchAdmin } from "@/types/search"
import { Employee, EmployeeAddOrEdit } from "@/types/user"


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
export const optionSearch: OptionSearch<Employee> = {
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


export const initialForm: EmployeeAddOrEdit =
{
    avatar: [],
    name: '',
    nameLogin: '',
    email: '',
    password: '',
    confirmPassword: '',
    provinces: '48',
    districts: '',
    wards: '',
    accountStatus: null,
    phone: '',
    roles: [],
    address: '',
    birthOfDate: null,
    idCard: ''
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
const accountStatus = {
    ACTIVATED: "Đã kích hoạt",
    INACTIVE: "Chưa kích hoạt",
    LOCK: "Đã khóa"
}
export const getStatusClassName = (status: keyof typeof statusAccount) => {
    return statusAccount[status];
};
export const getStatusName = (status: keyof typeof accountStatus) => {
    return accountStatus[status];
};