import { MutableRefObject, useEffect, useRef, useState } from "react";

const useIntersectionOnScreen = (options: IntersectionObserverInit): [MutableRefObject<null>, boolean] => {
    const containerRef: MutableRefObject<null> = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callBack = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callBack, options);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        }
    }, [containerRef, options]);

    return [containerRef, isVisible];
}

export default useIntersectionOnScreen;