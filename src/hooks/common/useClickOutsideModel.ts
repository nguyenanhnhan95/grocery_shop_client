'use client'
import { useState, useEffect, useRef } from 'react';

function useClickOutsideModal(initialVisibility = false) {
  const [isModalVisible, setIsModalVisible] = useState(initialVisibility);
  const modalRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleModalVisibility = () => {
    setIsModalVisible((prevVisibility) => !prevVisibility);
  };

  return {
    isModalVisible,
    modalRef,
    setIsModalVisible,
    toggleModalVisibility,
  };
}

export default useClickOutsideModal;