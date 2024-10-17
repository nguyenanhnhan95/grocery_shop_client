'use client'
import { useFetchSearch } from "@/hooks/fetch-authencation/useFetchSearch";
import PageManage from "../paging/PageManage";
import "./styles/tableManage.css"
import { ColumnTable } from "@/types/initialConfigAdmin";
import { QueryListResult } from "@/types/queryListResult";
import React from "react";



 interface TableManageProps<T> {
    url: string;
    TBodyTable: React.FunctionComponent<{ list: QueryListResult<T>; url: string }>;
    nameColumn: ColumnTable[];
}



function TableManage<T>({ url, TBodyTable, nameColumn }: TableManageProps<T>) {


    const { data: list, isPending: isPendingList } = useFetchSearch<QueryListResult<T>>(
        `${url}/search`,
        { result: [], total: 0 },
    );
    return (
        <div className="main-content-data pb-3">
            <div className="container-fluid container-content-data">
                <table className="table table-hover tscrolls">
                    <thead className="table-thead sticky-header">
                        <tr>
                            {nameColumn.map((each, index) => (
                                <th scope="col" style={each.style} key={index}>
                                    {each.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ height: 35 * (list?.total || 1) }}>
                        <TBodyTable list={list} url={url} />
                    </tbody>
                </table>
            </div>
            <PageManage list={list} isPendingList={isPendingList} />
        </div>
    );
}

export default TableManage;