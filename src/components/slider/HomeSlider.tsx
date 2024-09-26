'use client'
import oneSlider from "./../../../public/image/one_slider.jpg";
import twoSlider from "./../../../public/image/two_slider.jpg";
import threeSlider from "./../../../public/image/two_slider.jpg";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import './styles/homeSlider.css'
function HomeSlider() {
    const [active, setActive] = useState<number>(0);
    const listRef = useRef<any | null>(null);
    const dotsRef = useRef<HTMLLIElement[]>([]);
    const refreshSlider = useRef<NodeJS.Timeout | null>(null);
    const items = [
        oneSlider,
        twoSlider,
        threeSlider
    ];
    const lengthItems = items.length;

    const nextSlide = useCallback(() => {
        setActive((prevActive) => (prevActive + 1) % lengthItems);
    }, [lengthItems]);

    const reloadSlider = useCallback(() => {
        if (listRef.current) {
            const checkLeft = listRef.current.children[active].offsetLeft;
            listRef.current.style.left = -checkLeft + 'px';

            dotsRef.current.forEach((dot, index) => {
                if (index === active) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            if (refreshSlider.current) {
                clearInterval(refreshSlider.current);
            }
            refreshSlider.current = setInterval(() => {
                nextSlide();
            }, 3000);
        }
    }, [active, nextSlide]);
    useEffect(() => {
        refreshSlider.current = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => {
            if (refreshSlider.current) {
                clearInterval(refreshSlider.current);
            }
        };
    }, [nextSlide]);
    useEffect(() => {

        reloadSlider();
    }, [reloadSlider]);

    const prevSlide = () => {
        setActive((prevActive) => (prevActive - 1 + lengthItems) % lengthItems);
    };



    const goToSlide = (index: number) => {
        setActive(index);
    };

    return (
        <div className="slider container-lg ">
            <div className="list" ref={listRef}>
                {items.map((src, index) => (
                    <div className="item" key={index}>
                        <img loading="lazy" src={src.src} alt={`slide-${index}`}
                             />
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button className="slider-prev" onClick={prevSlide}>&lt;</button>
                <button className="slider-next" onClick={nextSlide}>&gt;</button>
            </div>
            <div className="dots">
                {items.map((_, index) => (
                    <li
                        key={index}
                        className={index === active ? 'active' : ''}
                        onClick={() => goToSlide(index)}
                        ref={(el) => {
                            if (el) {
                                dotsRef.current[index] = el;
                            }
                        }}
                    ></li>
                ))}
            </div> 


        </div>
    )
}
export default HomeSlider;