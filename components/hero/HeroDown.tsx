'use client';

import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { gsap } from '../gsap/gsap';
import { useRef, useContext } from 'react';
import { SmoothScrollContext } from '../gsap/SmoothScroll.context';

const HeroDown = () => {
    const el = useRef<HTMLButtonElement | null>(null);
    const { scroll } = useContext(SmoothScrollContext);

    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({ repeat: -1, paused: true });

        gsap.set('.hero-down', {
            opacity: 1,
        });
        gsap.fromTo(
            '.hero-down',
            {
                opacity: 0,
            },
            {
                delay: 2,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.inOut',
                onComplete: () => {
                    tl.paused(false);
                },
            }
        );

        const ctx = gsap.context(() => {
            tl.to(
                '.hero-down',
                {
                    y: '4.25rem',
                    duration: 2,
                    ease: 'power3.inOut',
                },
                0
            );
            tl.to(
                '.hero-down',
                {
                    height: '1.75rem',
                    duration: 1,
                    ease: 'power3.in',
                },
                0
            );
            tl.to(
                '.hero-down',
                {
                    height: '0.75rem',
                    duration: 1,
                    ease: 'power4.out',
                },
                1
            );
            tl.to(
                '.hero-down',
                {
                    y: 0,
                    duration: 1.5,
                    ease: 'power2.inOut',
                },
                2
            );
        }, el);

        gsap.to('.hero-down', {
            scrollTrigger: {
                trigger: el.current,
                start: 'center 40%',
                end: 'center 40%',
                onLeaveBack: () => {
                    gsap.to('.hero-down', {
                        opacity: 1,
                        ease: 'power3.inOut',
                        duration: 1,
                        onComplete: () => {
                            tl.paused(false);
                        },
                    });
                },
                onLeave: () => {
                    gsap.to('.hero-down', {
                        opacity: 0,
                        ease: 'power3.inOut',
                        duration: 1,
                        onComplete: () => {
                            tl.progress(0).paused(true);
                        },
                    });
                },
            },
        });
    }, []);

    return (
        <button
            className='absolute bottom-[8lvh] right-[6.5%] h-20 w-3'
            ref={el}
            data-speed='0.8'
            onClick={() => scroll.scrollTo(`#about`, true)}
            aria-label='Scroll down'
        >
            <div className='hero-down pointer-events-none absolute top-0 h-3 w-3 rounded-full bg-neutral-100'></div>
        </button>
    );
};

export default HeroDown;
