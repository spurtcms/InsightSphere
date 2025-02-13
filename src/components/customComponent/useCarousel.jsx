import React, { useEffect, useRef, useState } from 'react'

const useCarousel = () => {
    //for multi carousel
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Function to check scroll position
    const checkScrollButtons = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            console.log("scrollLeft, scrollWidth, clientWidth ", scrollLeft, scrollWidth, clientWidth)
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    // Scroll functions
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -388, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 388, behavior: 'smooth' });
        }
    };

    // Add event listener for scroll on mount
    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons(); // Initial check
        }
        return () => {
            if (slider) {
                slider.removeEventListener('scroll', checkScrollButtons);
            }
        };
    }, [scrollLeft, scrollRight]);

    //multiscroll
    return { sliderRef ,  canScrollLeft , canScrollRight , scrollLeft , scrollRight

    }
}

export default useCarousel
