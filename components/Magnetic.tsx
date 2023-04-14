'use client';

import { gsap } from './gsap/gsap';
import { useRef, useState, useContext } from 'react';
import { SmoothScrollContext } from './gsap/SmoothScroll.context';

interface NavItemProps {
    children: React.ReactNode;
    strength?: number;
    slowStrength?: number;
    xOffFast?: number;
    yOffFast?: number;
    xOffSlow?: number;
    yOffSlow?: number;
    classes?: string;
    shrink?: boolean;
    shrinkAmount?: number;
    onClick?: (() => void) | undefined;
}

const Magnetic = ({
    children,
    strength = 30,
    slowStrength = 2,
    xOffFast = 0,
    yOffFast = 0,
    xOffSlow = 0,
    yOffSlow = 0,
    classes = '',
    shrink = false,
    shrinkAmount = 0.85,
    onClick = undefined,
}: NavItemProps) => {
    const el = useRef<HTMLDivElement | null>(null);
    const { isLarge } = useContext(SmoothScrollContext);

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isLarge) return;
        handleMouseUp();
        const ctx = gsap.context(() => {
            gsap.to('.mag-fast', {
                x: 0,
                y: 0,
                rotate: '0deg',
                duration: 1,
                ease: 'elastic.out',
            });
            gsap.to('.mag-slow', {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out',
            });
        }, el);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isLarge) return;
        const bounding = e.currentTarget.getBoundingClientRect();
        const ctx = gsap.context(() => {
            gsap.to('.mag-fast', {
                x:
                    ((e.clientX - bounding.left) / e.currentTarget.offsetWidth - 0.5) * strength +
                    xOffFast,
                y:
                    ((e.clientY - bounding.top) / e.currentTarget.offsetHeight - 0.5) * strength +
                    yOffFast,
                rotate: '0.001deg',
                ease: 'power3.out',
                duration: 1,
            });
            gsap.to('.mag-slow', {
                x:
                    ((e.clientX - bounding.left) / e.currentTarget.offsetWidth - 0.5) *
                        (strength / slowStrength) +
                    xOffSlow,
                y:
                    ((e.clientY - bounding.top) / e.currentTarget.offsetHeight - 0.5) *
                        (strength / slowStrength) +
                    yOffSlow,
                ease: 'power3.out',
                duration: 1,
            });
        }, el);
    };

    const handleMouseDown = () => {
        if (!shrink || !isLarge) return;
        const ctx = gsap.context(() => {
            gsap.to('.mag-shrink', {
                scale: shrinkAmount,
                duration: 0.75,
                ease: 'power4.out',
            });
        }, el);
    };

    const handleMouseUp = () => {
        if (!shrink || !isLarge) return;
        const ctx = gsap.context(() => {
            gsap.to('.mag-shrink', {
                scale: 1,
                duration: 1,
                ease: 'elastic.out',
            });
        }, el);
    };

    return (
        <div
            className={`group relative h-fit w-fit ${classes}`}
            onMouseLeave={(e) => handleMouseLeave(e)}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={() => handleMouseUp()}
            onClick={onClick}
            ref={el}
        >
            {shrink ? <div className={`mag-shrink ${classes}`}>{children}</div> : children}
        </div>
    );
};

export default Magnetic;
