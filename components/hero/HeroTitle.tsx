'use client';

import { useRef } from 'react';
import { gsap } from '../gsap/gsap';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import HeroLine from './HeroLine';

const HeroTitle = () => {
    const el = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.to(
                '.title-text',
                { translateY: 0, duration: 1.75, rotateZ: 0, ease: 'power3.out' },
                2.15
            );
            tl.to(
                '.title-text-2',
                { translateY: 0, duration: 1.75, rotateZ: 0, ease: 'power3.out' },
                2.3
            );
            tl.to(
                '.title-text-3',
                { translateY: 0, duration: 1.75, rotateZ: 0, ease: 'power3.out' },
                2.15
            );
        }, el);
    }, []);

    return (
        <div ref={el}>
            <div className='relative mx-auto mt-6 w-fit translate-x-3 xl:absolute xl:opacity-0'>
                <HeroLine delay={2.15} pathClasses='origin-right translate-x-full' />
                <div className='overflow-hidden pb-2'>
                    <p className='title-text translate-y-[200%] -rotate-6 text-center'>FULLSTACK</p>
                </div>
            </div>
            <div className='relative mx-auto mt-6 w-fit -translate-x-3 xl:absolute xl:opacity-0'>
                <HeroLine delay={2.3} />
                <div className='overflow-hidden pb-2'>
                    <p className='title-text-2 translate-y-[200%] rotate-6 text-center'>
                        DEVELOPER
                    </p>
                </div>
            </div>
            <div className='absolute mx-auto mt-6 w-fit opacity-0 xl:relative xl:opacity-100'>
                <HeroLine delay={2.15} pathClasses='origin-right translate-x-full' />
                <div className='overflow-hidden pb-2'>
                    <p className='title-text-3 translate-y-[200%] -rotate-6 text-center '>
                        FULLSTACK DEVELOPER
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroTitle;
