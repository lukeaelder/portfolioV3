'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../gsap/gsap';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { Gradient } from './Gradient';

const HeroBackground = () => {
    const el = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        const seed = Math.floor(Math.random() * 1000);
        const gradient = new Gradient();

        gradient.initGradient('#gradient-canvas');
        gradient.connect();
        gradient.seed = seed;

        const ctx = gsap.context(() => {
            gsap.to('.open-1', {
                translateY: '-100%',
                duration: 2,
                ease: 'power3.out',
                delay: 1.5,
            });
            gsap.to('.open-2', {
                translateY: '100%',
                duration: 2,
                ease: 'power3.out',
                delay: 1.5,
            });
            gsap.to('.open-1-rounded, .open-2-rounded', {
                scaleY: 0,
                duration: 2,
                ease: 'power3.out',
                delay: 1.5,
                onComplete: () => {
                    gsap.set('.open-animation', { autoAlpha: 0 });
                },
            });
        }, el);

        ScrollTrigger.create({
            trigger: el.current,
            start: 'top top',
            end: 'bottom top',
            onEnterBack: () => {
                gradient.play();
            },
            onLeave: () => {
                gradient.pause();
            },
        });
    }, []);

    return (
        <div
            className='absolute top-0 left-0 flex h-full w-full flex-col justify-between overflow-hidden'
            ref={el}
        >
            <canvas
                id='gradient-canvas'
                className='h-full w-full'
                data-speed='0.6'
                data-transition-in
                data-js-darken-top
            ></canvas>
            <div className='open-animation absolute top-0 left-0 flex h-[100lvh] w-full flex-col justify-between'>
                <div className='open-1 relative h-full w-full origin-top bg-neutral-100'>
                    <div className='open-1-rounded absolute left-[-10%] bottom-0 h-[60rem] w-[120%] translate-y-1/2 rounded-[100%_100%] bg-neutral-100'></div>
                </div>
                <div className='open-2 relative h-full w-full origin-bottom bg-neutral-100'>
                    <div className='open-2-rounded absolute left-[-10%] top-0 h-[60rem] w-[120%] -translate-y-1/2 rounded-[100%_100%] bg-neutral-100'></div>
                </div>
            </div>
        </div>
    );
};

export default HeroBackground;
