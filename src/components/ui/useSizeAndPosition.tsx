'use client';
import { useState, useEffect, RefObject } from 'react';

interface SizeAndPosition {
    top: number;
    left: number;
    height: number;
    width: number;
}

const useSizeAndPosition = (ref: RefObject<HTMLElement>): SizeAndPosition => {
    const [sizeAndPosition, setSizeAndPosition] = useState<SizeAndPosition>({
        top: 0,
        left: 0,
        height: 0,
        width: 0,
    });

    useEffect(() => {
        if (ref.current) {
            const updateSizeAndPosition = () => {
                setSizeAndPosition({
                    top: ref.current!.offsetTop,
                    left: ref.current!.offsetLeft,
                    height: ref.current!.clientHeight,
                    width: ref.current!.clientWidth,
                });
            };

            updateSizeAndPosition();
            window.addEventListener('resize', updateSizeAndPosition);

            return () => {
                window.removeEventListener('resize', updateSizeAndPosition);
            };
        }
    }, [ref]);

    return sizeAndPosition;
};

export default useSizeAndPosition;