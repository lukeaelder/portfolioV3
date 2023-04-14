'use client';

import { useRef, useState, useContext } from 'react';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { gsap } from '../gsap/gsap';
import disableScroll from 'disable-scroll';
import NavMenuLink from './NavMenuLink';
import NavMenuLine from './NavMenuLine';
import NavMenuSocial from './NavMenuSocial';
import NavMenuBtn from './NavMenuBtn';
import { SmoothScrollContext } from '../gsap/SmoothScroll.context';

const NavMenu = () => {
    const [open, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuBgRef = useRef<HTMLDivElement | null>(null);
    const { scroll } = useContext(SmoothScrollContext);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (open) {
                disableScroll.on();
                gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: 'power3.inOut' });
                gsap.to('.nav-rounded', { scaleX: 0, duration: 0.8, ease: 'power3.inOut' });
                gsap.to(menuBgRef.current, { opacity: 1, duration: 0.8, ease: 'power3.inOut' });
            } else {
                disableScroll.off();
                gsap.to(menuRef.current, {
                    x: '140%',
                    duration: 0.8,
                    ease: 'power3.inOut',
                });
                gsap.to('.nav-rounded', { scaleX: 1, duration: 0.8, ease: 'power3.inOut' });
                gsap.to(menuBgRef.current, { opacity: 0, duration: 0.8, ease: 'power3.inOut' });
            }
        }, menuRef);
    }, [open]);

    useIsomorphicLayoutEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const handleScroll = ({ id, offset }: { id: string; offset: string }) => {
        scroll.scrollTo(scroll.offset(id, offset), true);
        setOpen(false);
    };

    return (
        <>
            <div
                ref={menuBgRef}
                className={`nav-menu-bg absolute top-0 left-0 h-screen w-full bg-gradient-to-r from-black/[.13] via-black/[.16] to-black/[.35] opacity-0 ${
                    open ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                onClick={() => setOpen(false)}
            ></div>
            <div
                ref={menuRef}
                className={`nav-menu pointer-events-auto absolute top-0 right-0 flex h-full w-full max-w-lg translate-x-[150%] flex-col justify-between bg-neutral-800 pt-[clamp(3.5rem,10vh,5rem)] pb-12 text-6xl text-white will-change-transform [-webkit-perspective:1000]`}
            >
                <div className='nav-rounded absolute top-[-10%] left-0 z-[-1] h-[120%] w-[80%] -translate-x-1/2 rounded-[100%_100%] bg-neutral-800 will-change-transform [-webkit-perspective:1000]'></div>
                <div>
                    <NavMenuLine title={'Navigation'} />
                    <div>
                        <NavMenuLink
                            title={'About'}
                            open={open}
                            duration={0.9}
                            handleScroll={() => handleScroll({ id: '#about', offset: '0px' })}
                        />
                        <NavMenuLink
                            title={'Projects'}
                            open={open}
                            duration={1}
                            handleScroll={() => handleScroll({ id: '#projects', offset: '150px' })}
                        />
                        <NavMenuLink
                            title={'Contact'}
                            open={open}
                            duration={1.1}
                            handleScroll={() => handleScroll({ id: '#contact', offset: '0px' })}
                        />
                    </div>
                </div>
                <div>
                    <NavMenuLine title={'Links'} />
                    <div className='flex px-[clamp(1.25rem,3vw,2.5rem)] text-base'>
                        <NavMenuSocial
                            title={'GitHub'}
                            open={open}
                            classes={'pr-6'}
                            duration={0.9}
                            link={'https://github.com/lukeaelder'}
                        />
                        <NavMenuSocial
                            title={'LinkedIn'}
                            open={open}
                            classes={'px-6'}
                            duration={1}
                            link={'https://www.linkedin.com/in/lukeaelder'}
                        />
                        <NavMenuSocial
                            title={'Email'}
                            open={open}
                            classes={'px-6'}
                            duration={1.1}
                            link={'mailto:lukeaeld@gmail.com'}
                        />
                    </div>
                </div>
            </div>
            <NavMenuBtn open={open} toggleMenu={() => setOpen(!open)} />
        </>
    );
};

export default NavMenu;
