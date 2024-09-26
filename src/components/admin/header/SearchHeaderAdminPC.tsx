'use client'
import { memo, useEffect, useRef, useState } from "react";
import "./styles/headerSearchAdminPC.css"
function SearchHeaderAdminPC() {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchMainHeaderTotal = useRef<HTMLLIElement>(null);

    // Add/remove event listener for clicking outside the search bar
    useEffect(() => {
        const handleClickOutsideMainSearch = (event: MouseEvent) => {
            if (searchMainHeaderTotal.current && !searchMainHeaderTotal.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('click', handleClickOutsideMainSearch);

        return () => {
            document.removeEventListener('click', handleClickOutsideMainSearch);
        };
    }, []);


    const handleMainSearchOnClick = () => {
        setIsFocused((prev) => !prev);
    };

    return (
        <li className="main-content-search nav-item" ref={searchMainHeaderTotal}>
            <input
                type="text"
                className={`main-content-search-input ${isFocused ? 'focus' : ''}`}
                placeholder="Tìm kiếm"
            />
            <i className="fa-solid fa-magnifying-glass" onClick={handleMainSearchOnClick} />
        </li>
    );
}

export default memo(SearchHeaderAdminPC);
