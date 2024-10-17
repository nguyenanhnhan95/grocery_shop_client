import React from "react";

type StyleDisplay = {
    display: string;
};


interface OptionItem {
    style: StyleDisplay;
    icon: string;
    name: string;
}


export type OptionAction = {
    add: OptionItem;
    excel: OptionItem;
};

// Kiểu ColumnTable với name và style (sử dụng Record để đại diện cho nhiều thuộc tính style)
export type ColumnTable = {
    name: string;
    style: Record<string, any>;
};

// Kiểu ActionTable với tên, icon và action (tùy chọn)
export type ActionTable = {
    name: string;
    icon: string;
    action?: string;
};

// Giao diện cho ActionDropdownProps với id, url, và mảng các action options
export interface ActionDropdownProps {
    id: number;
    url: string;
    optionActions: ActionTable[];
}

// SearchItem có thể chứa dữ liệu kiểu T hoặc mảng trống []
export interface SearchItem<T> {
    title: string;
    data?: T[];
    url?: string;
    attribute:string
    take?: string;
    show?:string;
    component: React.ComponentType<any>;
}


export interface OptionSearch<T> {
    modeShow: { style: StyleDisplay };
    attribute:string
    SearchItems: SearchItem<T>[];
}