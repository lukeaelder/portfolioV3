'use client';

import { useRef, useState, useContext } from 'react';
import { gsap } from '../gsap/gsap';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { SmoothScrollContext } from '../gsap/SmoothScroll.context';

const HeroLine = ({
    classes,
    delay,
    pathClasses,
}: {
    classes?: string;
    delay?: number;
    pathClasses?: string;
}) => {
    const el = useRef<SVGPathElement>(null);
    const widthRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number | undefined>(0);
    const [path, setPath] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const { isLarge } = useContext(SmoothScrollContext);

    useIsomorphicLayoutEffect(() => {
        const handleResize = () => {
            setWidth(widthRef.current?.offsetWidth);
        };

        if (widthRef.current) handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useIsomorphicLayoutEffect(() => {
        const curWidth = widthRef.current?.offsetWidth;
        if (!curWidth) return;
        const loadPath = `M0 50Q${curWidth / 2} 100 ${curWidth} 50`;
        setPath(loadPath);
        gsap.to(el.current, {
            attr: {
                d: loadPath,
            },
            duration: 0.1,
            delay: 0,
        });
        const loadedPath = `M0 50Q${curWidth / 2} 50 ${curWidth} 50`;
        setPath(loadedPath);
        gsap.to(el.current, {
            scaleX: 1,
            duration: 1.5,
            delay: delay,
            ease: 'power3.out',
            onComplete: () => setLoaded(true),
            attr: {
                d: loadedPath,
            },
        });
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (typeof width === 'number' && loaded) setPath(`M0 50Q${width / 2} 50 ${width} 50`);
    }, [width, loaded]);

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (!loaded || !isLarge) return;
        const { clientX, clientY } = e;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        const curheight = e.currentTarget.clientHeight;
        const curwidth = e.currentTarget.clientWidth;
        const x = clientX - left;
        const y = clientY - top;
        if (typeof width !== 'number') return;
        gsap.to(el.current, {
            attr: {
                d: `M0 50Q${width / 2} ${y / 2.5 + 25} ${width} 50`,
            },
            duration: 0.3,
            ease: 'power1.out',
        });
    };

    const handleMouseLeave = () => {
        if (!loaded || !isLarge) return;
        gsap.to(el.current, {
            attr: { d: path },
            duration: 0.75,
            ease: 'elastic.out',
        });
    };

    return (
        <>
            <svg
                viewBox={`0 0 ${width} 100`}
                className={`absolute top-[-50px] left-0 stroke-white stroke-[1] ${classes} z-[1] fill-none`}
                style={{ width: width }}
                preserveAspectRatio='none'
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseLeave={() => handleMouseLeave()}
            >
                <path d={path} ref={el} className={`scale-x-0 ${pathClasses}`}></path>
            </svg>
            <span className={`absolute ${classes ? classes : 'w-full'}`} ref={widthRef}></span>
        </>
    );
};

export default HeroLine;
