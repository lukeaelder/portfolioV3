'use client';

import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { gsap } from '../gsap/gsap';
import Magnetic from '../Magnetic';

const NavMenuBtn = ({ open, toggleMenu }: { open: boolean; toggleMenu: () => void }) => {
    const el = useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });
            tl.to(el.current, { x: 0, duration: 2, ease: 'power4.inOut' }, 0);
            tl.to(
                '.line1',
                {
                    scaleX: 1,
                    duration: 1.25,
                    ease: 'power3.inOut',
                    transformOrigin: '0% 50%',
                    x: 0.5,
                },
                0.5
            );
            tl.to(
                '.line2',
                {
                    scaleX: 1,
                    duration: 1.25,
                    ease: 'power3.inOut',
                    transformOrigin: '100% 50%',
                    x: 0.5,
                },
                0.5
            );
        }, el);
    }, []);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (open) {
                gsap.to('.line1', {
                    rotate: 225,
                    translateY: 0,
                    duration: 0.6,
                    ease: 'back.out',
                    transformOrigin: '50% 50%',
                });
                gsap.to('.line2', {
                    rotate: 135,
                    translateY: 0,
                    duration: 0.6,
                    ease: 'back.out',
                    transformOrigin: '50% 50%',
                });
            } else {
                gsap.to('.line1', {
                    rotate: 0,
                    translateY: -6,
                    duration: 0.6,
                    ease: 'back.out',
                    transformOrigin: '50% 50%',
                });
                gsap.to('.line2', {
                    rotate: 0,
                    translateY: 6,
                    duration: 0.6,
                    ease: 'back.out',
                    transformOrigin: '50% 50%',
                });
            }
        }, el);
    }, [open]);

    return (
        <div
            ref={el}
            className='nav-menu pointer-events-auto absolute top-4 right-[2.5%] z-[51] translate-x-[calc(5rem+2.5vw)]'
        >
            <Magnetic
                onClick={() => toggleMenu()}
                shrink={true}
                classes='h-20 w-20 rounded-full'
                strength={40}
            >
                <button
                    className={`mag-slow h-20 w-20 rounded-full shadow-lg shadow-neutral-900/10 transition-colors group-hover:bg-indigo-500 ${
                        open ? 'bg-indigo-500' : 'bg-white'
                    }`}
                    aria-label='Menu'
                ></button>
                <div className='mag-fast pointer-events-none absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center'>
                    <div className='line1 absolute h-[6px] w-8 -translate-y-[6px] translate-x-2 scale-x-0 rounded-full bg-neutral-800'></div>
                    <div className='line2 absolute h-[6px] w-8 translate-y-[6px] -translate-x-2 scale-x-0 rounded-full bg-neutral-800'></div>
                </div>
            </Magnetic>
        </div>
    );
};

export default NavMenuBtn;
