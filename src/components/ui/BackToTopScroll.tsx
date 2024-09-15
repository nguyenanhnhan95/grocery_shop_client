import { memo, useEffect, useState } from "react";
import style from "./backToTopScroll.module.css"
function BackToTopScroll() {
    const [showButtonBack, setShowButtonBack] = useState<boolean>(false);
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    useEffect(() => {
        const handleScroll = () => {
            setShowButtonBack(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <button className={`${style.backToTopScroll}  translate-middle badge rounded-pill`}
            style={{ display: showButtonBack === true ? 'block' : 'none' }} onClick={() => scrollUp()}>
            <i className="fa-solid fa-chevron-up"></i>
        </button>
    )
}
export default memo(BackToTopScroll)