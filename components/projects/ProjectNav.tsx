'use client';

import { useContext, useState } from 'react';
import { SmoothScrollContext } from '../gsap/SmoothScroll.context';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { ScrollTrigger } from '../gsap/gsap';

const ProjectNav = ({
    curKey,
    projectCount,
    colors,
    projectHeight,
}: {
    curKey: number;
    projectCount: number;
    colors: any;
    projectHeight: number;
}) => {
    const { scroll, isLarge } = useContext(SmoothScrollContext);
    const [progress, setProgress] = useState<number>(0);

    useIsomorphicLayoutEffect(() => {
        for (let i = 0; i < projectCount; i++) {
            ScrollTrigger.create({
                trigger: '.projects-section',
                start: `${i * projectHeight}px top`,
                end: `+=${i === projectCount ? 0 : projectHeight}px top`,
                onUpdate: (self) => {
                    setProgress(self.progress);
                },
            });
        }
    }, []);

    return (
        <div className='flex h-full w-full flex-col items-end justify-center gap-3'>
            {Array.from(Array(projectCount), (e, i) => {
                return (
                    <button
                        className={`h-8 w-2 overflow-hidden rounded-full transition-colors duration-1000 ${
                            colors[curKey + 1][0]
                        }`}
                        key={i}
                        onClick={() =>
                            scroll.scrollTo(scroll.offset(`#project-${i}`, '200px'), true)
                        }
                        aria-label={`Scroll to project ${i + 1}`}
                    >
                        <div
                            className={`h-full w-full origin-top transition-colors duration-1000
                            ${curKey === i ? colors[curKey + 1][2] : colors[curKey + 1][1]}
                            ${curKey > i ? '!scale-y-100' : curKey !== i ? '!scale-y-0' : ''}
                            `}
                            style={{ transform: `scaleY(${curKey > i ? '1' : progress})` }}
                        ></div>
                    </button>
                );
            })}
        </div>
    );
};

export default ProjectNav;
