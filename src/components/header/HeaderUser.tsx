'use client'
import useClickOutsideModal from "@/hooks/common/useClickOutsideModel";
import { memo, useCallback, useEffect, useRef } from "react";
import AvatarUser from "./AvatarUser";
import HeaderUserModal from "./HeaderUserModal";
import { updateSrcAvatar } from "@/redux/slice/common/currentUser";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import RedirectLogin from "./RedirectLogin";
import { useFetchImageUrl } from "@/hooks/aws/useFetchImageUrl";
import "./styles/headerUser.css"
function HeaderUser() {
    const { isModalVisible, modalRef, setIsModalVisible } = useClickOutsideModal(false);
    const headerModalUserRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const { srcAvatar, user, loading, error,authenticate } = useAppSelector((state: RootState) => state.currentUser)
    const { fetchUrlImage, data, isPending } = useFetchImageUrl();

    useEffect(() => {
        if (isPending!==true && srcAvatar === null && user && user?.avatar !== null) {
            fetchUrlImage(user.avatar)
        } 
    }, [srcAvatar, user])
    useEffect(() => {
        if (data != null) {
            dispatch(updateSrcAvatar({ srcAvatar: data, error: error }))
        }
    }, [data])


    const handleHeaderUserClick = useCallback(() => {
        if (headerModalUserRef.current) {
            if (isModalVisible) {
                headerModalUserRef.current.style.display = 'none';
                setIsModalVisible(false);
            } else {
                headerModalUserRef.current.style.display = 'block';
                setIsModalVisible(true);
            }
        }

    }, [modalRef, isModalVisible]);
    return (
        <li className={`nav-item   header-user  ${loading !== false ? 'loading-information-user':''} `} ref={modalRef} >
            <AvatarUser handleHeaderUserClick={handleHeaderUserClick} />
            {authenticate === false && loading ===false &&  <RedirectLogin />}
            {authenticate && <HeaderUserModal headerUserModalRef={headerModalUserRef} isModalUserVisible={isModalVisible} />}
        </li>
    )
}
export default memo(HeaderUser);