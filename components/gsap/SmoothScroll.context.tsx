'use client';

import useIsomorphicLayoutEffect from './UseIsomorphicLayoutEffect';
import { ScrollSmoother, gsap } from './gsap';
import { createContext, useState } from 'react';
import disableScroll from 'disable-scroll';
import Nav from '../nav/Nav';

export const SmoothScrollContext = createContext<any>({ scroll: null });

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const [scroll, setScroll] = useState<any>(null);
    const [isLarge, setIsLarge] = useState<boolean>(false);

    useIsomorphicLayoutEffect(() => {
        window.scrollTo(0, 0);

        const smoother = ScrollSmoother.create({
            smooth: 0.8,
            effects: true,
            ignoreMobileResize: true,
        });

        smoother.scrollTo(0);
        smoother.paused(true);
        disableScroll.on();
        setScroll(smoother);

        const handleLoad = () => {
            const tl = gsap.timeline();
            tl.add(() => {
                disableScroll.off();
                smoother.paused(false);
            }, 3.5);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }

        return () => {
            smoother.kill();
        };
    }, []);

    useIsomorphicLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && !isLarge) {
                setIsLarge(true);
            } else if (window.innerWidth < 1024 && isLarge) {
                setIsLarge(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [isLarge]);

    return (
        <SmoothScrollContext.Provider value={{ scroll, isLarge }}>
            <Nav />
            <div id='smooth-wrapper'>
                <div id='smooth-content'>{children}</div>
            </div>
        </SmoothScrollContext.Provider>
    );
};

export default SmoothScrollProvider;
