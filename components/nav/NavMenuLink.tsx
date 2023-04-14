'use client';

import Magnetic from '../Magnetic';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { gsap } from '../gsap/gsap';
import { useRef } from 'react';

const NavMenuLink = ({
    title,
    open,
    duration,
    handleScroll,
}: {
    title: string;
    open: boolean;
    duration: number;
    handleScroll: () => void;
}) => {
    const el = useRef<HTMLDivElement | null>(null);
    const tl = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current.fromTo(
                el.current,
                { x: 150 },
                { x: 0, duration: duration, ease: 'power3.inOut' },
                0
            );
        }, el);
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (open) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [open]);

    return (
        <div ref={el}>
            <Magnetic
                classes='flex items-center justify-between px-[clamp(1.25rem,3vw,2.5rem)] py-3 !w-full cursor-pointer'
                strength={30}
                xOffFast={8}
                onClick={() => handleScroll()}
            >
                <div className='mag-fast'>{title}</div>
                <div className='mag-slow mr-3'>
                    <div className='h-3 w-3 origin-center scale-0 rounded-full bg-white transition group-hover:scale-100'></div>
                </div>
            </Magnetic>
        </div>
    );
};

export default NavMenuLink;
