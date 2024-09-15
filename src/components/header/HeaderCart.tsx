'use client';
import useClickOutsideModal from "@/hooks/common/useClickOutsideModel";
import { useRef } from "react";
import "./styles/headerCart.css"
function HeaderCart() {
    const { isModalVisible, modalRef,setIsModalVisible } = useClickOutsideModal(false);
    const cartHeaderRef = useRef<HTMLLIElement | null>(null);
    const handleCartHeaderClick = () => {
        if(cartHeaderRef.current){
            if (isModalVisible) {
                cartHeaderRef.current.style.display = 'none';
                setIsModalVisible(false);
            } else {
                cartHeaderRef.current.style.display = 'block';
                setIsModalVisible(true);
            }
        }
       
    };
    return (
            <li className="nav-item  header-cart " ref={cartHeaderRef}>
                <i className="fa-solid fa-cart-shopping " onClick={handleCartHeaderClick} />
                <div className="header-cart-numbers  translate-middle badge rounded-circle">15</div>
                <div className="header-cart-modal" style={{ display: isModalVisible ? 'block' : 'none' }} ref={modalRef}>
                    <div className="row header-cart-modal-head">
                        <div className="col-4">Sản phẩm</div>
                        <div className="col-4">Số lượng</div>
                        <div className="col-4">Số tiền</div>
                    </div>
                    <hr />
                    <div className="card card-cart">
                        <div className="row card-cart-item">
                            <div className="col-4">
                                <img src="logo-sky.png" alt="" />
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-center">x2</div>
                            <div className="col-4 d-flex align-items-center justify-content-center">790.000VNĐ</div>
                        </div>
                    </div>
                    <div className="card card-cart">
                        <div className="row card-cart-item">
                            <div className="col-4">
                                <img src="logo-sky.png" alt="" />
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-center">x2</div>
                            <div className="col-4 d-flex align-items-center justify-content-center">790.000VNĐ</div>
                        </div>
                    </div>
                    <div className="row header-cart-modal-total-money py-2">
                        <div className="col-4 text-center fw-500">Tổng tiền</div>
                        <div className="col-4" />
                        <div className="col-4 text-center">79.000.000VNĐ</div>
                    </div>
                    <hr />
                    <div className="card-cart-seen-all d-flex align-items-center justify-content-center ">
                        Xem tất cả !
                    </div>
                </div>
            </li>
    )
}
export default HeaderCart;