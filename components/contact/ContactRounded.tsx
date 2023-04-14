'use client';

import { gsap } from '../gsap/gsap';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { useRef } from 'react';

const ContactRounded = () => {
    const el = useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.contact-round',
                { scaleY: 1 },
                {
                    scaleY: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.current,
                        scrub: 1,
                        start: 'center bottom',
                        end: 'center top ',
                    },
                }
            );
        }, el);
    }, []);

    return (
        <div
            ref={el}
            className='pointer-events-none absolute top-0 left-[-10%] z-10 h-[500px] md:h-[600px] lg:h-[800px] w-[120%] -translate-y-1/2'
        >
            <div className='contact-round h-full w-full rounded-[100%_100%] bg-[#F0F0F0]'></div>
        </div>
    );
};

export default ContactRounded;
