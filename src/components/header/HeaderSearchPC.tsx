'use client';
import { memo,  useRef } from "react";
import "./styles/headerSearchPc.css"
import useClickOutsideModal from "@/hooks/common/useClickOutsideModel";
function HeaderSearchPC() {
    const { isModalVisible, modalRef,setIsModalVisible } = useClickOutsideModal(false);
    const searchHeaderRef = useRef<HTMLLIElement | null>(null);
    const handleSearchHeaderClick = () => {
        if(searchHeaderRef.current){
            if (isModalVisible) {
                searchHeaderRef.current.style.display = 'none';
                setIsModalVisible(false);
            } else {
                searchHeaderRef.current.style.display = 'block';
                setIsModalVisible(true);
            }
        }
       
    };
  return (
      <li className="header-search nav-item " ref={searchHeaderRef}>
        <i className="header-search-show fa-solid fa-magnifying-glass  " onClick={handleSearchHeaderClick} />
        <div className="header-search-input   align-items-center" style={{ display: isModalVisible ? 'block' : 'none' }} ref={modalRef}>
          {/* <div className="d-flex align-items-center">
            <input className="header-search-input-enter form-control " />
            <div className="header-search-input-press ">
              <i className="fa-solid fa-magnifying-glass fa-lg" />
            </div>
          </div> */}
          <div className="input-group mb-3">
            <input type="text" className="header-search-input-enter form-control" placeholder="Nhập tên sản phẩm" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append ">
              <button className="header-search-input-press" type="button">
                <i className="fa-solid fa-magnifying-glass fa-lg" />
              </button>
            </div>
          </div>
        </div>
      </li>
  )
}
export default memo(HeaderSearchPC);