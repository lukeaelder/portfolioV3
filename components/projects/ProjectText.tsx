'use client';

import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { gsap } from '../gsap/gsap';

const ProjectText = ({
    cur,
    curKey,
    title,
    desc,
    stack,
    git,
    url,
    colors,
}: {
    cur: { cur: number; prev: number };
    curKey: number;
    title: string;
    desc: string;
    stack: string[];
    git?: string;
    url: string;
    colors: any[];
}) => {
    const el = useRef<HTMLDivElement | null>(null);
    const el2 = useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        const titleAngle = Math.random() * 10 - 5;
        const ctx = gsap.context(() => {
            if (cur.cur === curKey) {
                gsap.set('.project-title', {
                    autoAlpha: 1,
                    rotateZ: `${titleAngle}deg`,
                    overwrite: true,
                });
                gsap.set('.project-description', {
                    autoAlpha: 1,
                    rotateZ: 'random(-5, 5)',
                    overwrite: true,
                });
                gsap.set('.project-stack', {
                    autoAlpha: 1,
                    rotateZ: 'random(-5, 5)',
                    overwrite: true,
                });
                gsap.set('.project-links', {
                    autoAlpha: 1,
                    rotateZ: 'random(-5, 5)',
                    overwrite: true,
                });
                gsap.to('.project-title', {
                    y: '0%',
                    rotateZ: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: cur.cur > cur.prev ? 0.2 : 0.3,
                });
                gsap.to('.project-description', {
                    y: '0%',
                    rotateZ: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: cur.cur > cur.prev ? 0.35 : 0.4,
                });
                gsap.to('.project-stack', {
                    y: '0%',
                    rotateZ: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: cur.cur > cur.prev ? 0.4 : 0.3,
                });
                gsap.to('.project-links', {
                    y: '0%',
                    rotateZ: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: cur.cur > cur.prev ? 0.4 : 0.2,
                });
            } else {
                gsap.to('.project-title, .project-description, .project-stack, .project-links', {
                    y: cur.cur > curKey ? '-200%' : '200%',
                    duration: 1.2,
                    ease: 'power3.out',
                    overwrite: true,
                    onComplete: () => {
                        gsap.set(
                            '.project-title, .project-description, .project-stack, .project-links',
                            {
                                autoAlpha: 0,
                            }
                        );
                    },
                });
            }
        }, el);

        const ctx2 = gsap.context(() => {
            if (cur.cur === curKey) {
                gsap.set('.project-title', {
                    autoAlpha: 1,
                    rotateZ: `${titleAngle}deg`,
                    overwrite: true,
                });
                gsap.to('.project-title', {
                    y: '0%',
                    rotateZ: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: cur.cur > cur.prev ? 0.2 : 0.3,
                });
            } else {
                gsap.to('.project-title', {
                    y: cur.cur > curKey ? '-200%' : '200%',
                    duration: 1.2,
                    ease: 'power3.out',
                    overwrite: true,
                    onComplete: () => {
                        gsap.set('.project-title', {
                            autoAlpha: 0,
                        });
                    },
                });
            }
        }, el2);
    }, [cur]);

    return (
        <>
            <div
                className='pointer-events-none absolute z-[-1] w-full max-w-5xl px-[6.5%] text-center lg:w-1/2 lg:text-start'
                ref={el2}
            >
                <div className='w-full overflow-hidden pb-1 text-[clamp(2.5rem,7.5vw+.1rem,15rem)] leading-[clamp(4rem,9vw+.1rem,15.5rem)] lg:w-fit'>
                    <div
                        className={`project-title py-2 tracking-[0.025em] transition-colors duration-700 lg:whitespace-nowrap lg:py-3 ${
                            colors[cur.cur + 1][3]
                        }`}
                    >
                        {title}
                    </div>
                </div>
                <div className='py-2 text-[1.5rem] opacity-0 lg:py-3'>{desc}</div>
                <div className='flex justify-center gap-3 py-2 text-[1.25rem] opacity-0 lg:justify-start lg:py-3'>
                    {stack.map((s, i) => {
                        return (
                            <div key={i}>
                                {i === 0 ? null : (
                                    <span key={`dot${i}`} className='mr-3'>
                                        •
                                    </span>
                                )}
                                <span key={i}>{s}</span>
                            </div>
                        );
                    })}
                </div>
                <div className='my-2 h-6 opacity-0 lg:my-3'></div>
            </div>
            <div
                ref={el}
                className='absolute z-[2] w-full max-w-5xl px-[6.5%] text-center lg:w-1/2 lg:text-start'
            >
                <div className='w-full overflow-hidden pb-1 text-[clamp(2.5rem,7.5vw+.1rem,15rem)] leading-[clamp(4rem,9vw+.1rem,15.5rem)] lg:w-fit'>
                    <div
                        className={`project-title transition-[text-stroke,-webkit-text-stroke] duration-700 lg:whitespace-nowrap ${
                            colors[cur.cur + 1][4]
                        } py-2 tracking-[0.025em] text-transparent lg:py-3`}
                    >
                        {title}
                    </div>
                </div>
                <div className='overflow-hidden text-[1.5rem]'>
                    <p className='project-description py-2 lg:py-3'>{desc}</p>
                </div>
                <div className='overflow-hidden text-[1.25rem]'>
                    <div className='project-stack flex justify-center gap-3 py-2 lg:justify-start lg:py-3'>
                        {stack.map((s, i) => {
                            return (
                                <div key={i}>
                                    {i === 0 ? null : (
                                        <span key={`dot${i}`} className='mr-3'>
                                            •
                                        </span>
                                    )}
                                    <span key={i}>{s}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='overflow-hidden text-[1rem]'>
                    <div className='project-links pointer-events-auto flex justify-center gap-3 py-2 lg:justify-start lg:py-3'>
                        {git ? (
                            <a
                                href={git}
                                className='flex'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <span>GitHub</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='icon icon-tabler icon-tabler-external-link'
                                    width={24}
                                    height={24}
                                    viewBox='0 0 24 24'
                                    strokeWidth='2'
                                    stroke='currentColor'
                                    fill='none'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                    <path d='M10 7H8A2 2 0 0 0 6 9V17A2 2 0 0 0 8 19H16A2 2 0 0 0 18 17V15M10 15L18 7M14 7L18 7L18 11'></path>
                                </svg>
                            </a>
                        ) : null}
                        <a href={url} className='flex' target='_blank' rel='noopener noreferrer'>
                            Visit Site
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-external-link'
                                width={24}
                                height={24}
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                <path d='M10 7H8A2 2 0 0 0 6 9V17A2 2 0 0 0 8 19H16A2 2 0 0 0 18 17V15M10 15L18 7M14 7L18 7L18 11'></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectText;
