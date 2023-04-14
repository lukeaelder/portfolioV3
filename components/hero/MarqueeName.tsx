'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger } from '../gsap/gsap';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import HeroLine from './HeroLine';

const MarqueeName = ({ speed = 50 }: { speed?: number }) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween>();
    const scrollTriggerRef = useRef<ScrollTrigger>();
    const introRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        const section = mainRef.current;
        const container = wrapperRef.current;
        const child = container ? container.firstElementChild : null;

        const resizeObserver = new ResizeObserver(() => {
            window.requestAnimationFrame(() => {
                initAnimation();
            });
        });

        if (container) {
            const firstElementChild = container.firstElementChild;
            if (firstElementChild) resizeObserver.observe(firstElementChild);
        }

        if (section) {
            resizeObserver.observe(section);
        }

        function initAnimation() {
            if (section && container && child) {
                clearAnimation();
                cloneContent(section, container, child);

                const distance = child.clientWidth;
                const time = distance / speed;

                const tween = gsap.to(container, {
                    repeat: -1,
                    x: `-${distance}`,
                    ease: 'linear',
                    duration: time,
                    onReverseComplete: function () {
                        this.totalTime(time * 100 + this.rawTime());
                    },
                });

                let lastUpdateTimestamp: number;

                const scrollTrigger = ScrollTrigger.create({
                    animation: tween,
                    trigger: container,
                    // start: '300% 300%',
                    // end: '300% top',
                    // toggleActions: 'play pause resume pause',
                    onUpdate(self) {
                        let velocity = Math.abs(self.getVelocity());
                        velocity = Math.max(velocity, 40);
                        let speed = velocity * 0.01;
                        speed = Math.max(1, speed);
                        const direction = self.direction;
                        const timestamp = Date.now();
                        gsap.to(tween, {
                            duration: 0.1,
                            timeScale: speed * direction,
                            ease: 'none',
                            onStart() {
                                lastUpdateTimestamp = timestamp;
                            },
                            onComplete() {
                                if (timestamp === lastUpdateTimestamp) {
                                    gsap.to(tween, {
                                        duration: 0.7,
                                        ease: 'expo.out',
                                        timeScale: direction,
                                    });
                                }
                            },
                        });
                    },
                });

                tweenRef.current = tween;
                scrollTriggerRef.current = scrollTrigger;
            }
        }

        function cloneContent(section: Element, container: Element, child: Element) {
            const clones = container.querySelectorAll('[data-is-clone="true"]');
            clones.forEach((el) => el.remove());
            const count = Math.ceil(section.clientWidth / child.clientWidth) + 1;

            if (count !== Infinity) {
                for (let i = 0; i < count; i++) {
                    const clone = child.cloneNode(true) as HTMLElement;
                    clone.dataset.isClone = 'true';
                    container.appendChild(clone);
                }
            }
        }

        function clearAnimation() {
            if (tweenRef.current) tweenRef.current.progress(0).pause().revert().kill();
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
        }

        gsap.to(introRef.current, {
            translateY: 0,
            duration: 1.75,
            rotateZ: 0,
            ease: 'power3.out',
            delay: 2,
        });

        return () => {
            clearAnimation();
            resizeObserver.disconnect();
            window.removeEventListener('resize', initAnimation);
        };
    }, []);

    return (
        <div ref={mainRef} className='relative w-[120vw] -translate-x-[10vw]'>
            <HeroLine classes='w-[80vw] translate-x-[22vw]' delay={2} />
            <div className='overflow-hidden pb-2'>
                <div ref={introRef} className='translate-y-[200%] rotate-6'>
                    <div ref={wrapperRef} className='flex whitespace-nowrap'>
                        <span>
                            LUKE ELDER&nbsp;&nbsp;-&nbsp;&nbsp;LUKE
                            ELDER&nbsp;&nbsp;-&nbsp;&nbsp;LUKE ELDER&nbsp;&nbsp;-&nbsp;&nbsp;LUKE
                            ELDER&nbsp;&nbsp;-&nbsp;&nbsp;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarqueeName;
