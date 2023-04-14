'use client';

import Magnetic from '../Magnetic';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { gsap } from '../gsap/gsap';
import { useRef } from 'react';

const NavMenuSocial = ({
    title,
    open,
    classes,
    duration,
    link,
}: {
    title: string;
    open: boolean;
    classes: string;
    duration: number;
    link: string;
}) => {
    const el = useRef<HTMLAnchorElement | null>(null);
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

        return () => ctx.revert();
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (open) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [open]);

    return (
        <a ref={el} href={link} target={title === 'Email' ? '_self' : '_blank'}>
            <Magnetic strength={20} classes={`${classes} pt-1 cursor-pointer`}>
                <p className='mag-fast'>{title}</p>
                <div className='mag-slow mt-3'>
                    <div className='h-[2px] w-full origin-center -translate-y-2 scale-x-0 rounded-full bg-white transition group-hover:translate-y-0 group-hover:scale-x-100'></div>
                </div>
            </Magnetic>
        </a>
    );
};

export default NavMenuSocial;
