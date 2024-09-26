'use client'
import {  OptionAction } from "@/types/initialConfigAdmin";
import Link from "next/link";
import { memo } from "react";
import "./styles/sectionAction.css"
import { usePathname } from "next/navigation";
function SectionAction({ itemAction }: { itemAction: OptionAction }) {

    const pathname = usePathname()
    return (
        <>
            <div className="main-content-action">
                <div className="container-fluid container-content-action">
                    <div className="row">
                        <div className="col-6 col-md-6 d-flex justify-content-start">
                            <Link href={`${pathname}/add`} passHref>
                                <button type="button" style={{ display: itemAction.add.style.display }}>
                                    <i className={itemAction.add.icon} />
                                    {itemAction.add.name}
                                </button>
                            </Link>
                        </div>
                        <div className="col-6 col-md-6 d-flex justify-content-end">
                            <button type="button" style={{ display: itemAction.excel.style.display }}>
                                <i className={itemAction.excel.icon} />
                                {itemAction.excel.name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default memo(SectionAction);