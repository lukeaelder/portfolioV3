'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import { Mesh } from 'three/src/objects/Mesh';
import { gsap, ScrollTrigger } from '../gsap/gsap';
import { uid } from 'uid';

const Spawner = ({ rerender }: { rerender: boolean }) => {
    const [items, setItems] = useState<any[]>([]);
    const [active, setActive] = useState<boolean>(false);

    const removeItem = (id: number) => {
        let newItems = [...items];
        newItems.splice(id, 1);
        setItems(newItems);
    };

    const createShape = ({ bottom = true }: { bottom?: boolean }) => {
        const random = Math.floor(Math.random() * 4);
        let geometry: { args: number[] } | null = null;
        if (random === 0) geometry = { args: [0.7, 1, 4, 1, 0, Math.PI * 2] }; // sqaure
        if (random === 1) geometry = { args: [0.6, 1, 3] }; // triangle
        if (random === 2) geometry = { args: [0.8, 1, 50, 1, 0, Math.PI / 1.25] }; // arc
        if (random === 3) geometry = { args: [0.8, 1, 50, 1, 0, Math.PI * 2] }; // circle
        const key = uid();
        const newItem = { uid: key, geometry, bottom, type: random };
        setItems((items) => [...items, newItem]);
    };

    useIsomorphicLayoutEffect(() => {
        const timer = setInterval(() => {
            if (active) createShape({});
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [active]);

    useIsomorphicLayoutEffect(() => {
        setItems([]);
        for (let i = 0; i < 14; i++) {
            createShape({ bottom: i <= 10 ? false : true });
        }
    }, [rerender]);

    useIsomorphicLayoutEffect(() => {
        ScrollTrigger.create({
            trigger: '.contact-bg',
            start: 'top 30%',
            end: 'top 30%',
            onEnter: () => setActive(true),
        });
        ScrollTrigger.create({
            trigger: '.contact-bg',
            start: 'top bottom',
            end: 'top bottom',
            onLeaveBack: () => setActive(false),
        });
    }, []);

    return (
        <>
            {items.map((item, i) => (
                <Shape
                    key={item.uid}
                    item={item}
                    removeSelf={() => removeItem(i)}
                    selfId={i}
                    active={active}
                />
            ))}
        </>
    );
};

const Shape = ({
    item,
    removeSelf,
    selfId,
    active,
}: {
    item: { uid: string; geometry: any; bottom: boolean; type: number };
    removeSelf: () => void;
    selfId: number;
    active: boolean;
}) => {
    const { viewport } = useThree();
    const el = useRef<Mesh>(null!);
    const tl = useRef<gsap.core.Timeline>(null!);
    const tl2 = useRef<gsap.core.Timeline>(null!);
    const x = useRef<number>(Math.random() * viewport.width - viewport.width / 2);
    const y = useRef<number>(
        item.bottom
            ? -(viewport.height / 2 + 2)
            : Math.random() * viewport.height - viewport.height / 2
    );
    const floatSpeed = useRef<number>(Math.floor(Math.random() * 100) + 40);
    const spinSpeed = useRef<number>(Math.floor(Math.random() * 70) + 30);
    const direction = useRef<number>(Math.random() < 0.5 ? -1 : 1);
    const scale = useRef<number>(
        Math.random() * (0.3 - 0.15) + (viewport.width / 2) * Math.random() * (0.4 - 0.25) + 0.25
    );
    const [alive, setAlive] = useState<boolean>(false);

    useIsomorphicLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true });
        tl2.current = gsap.timeline({ paused: true, repeat: -1 });
        gsap.set(el.current.position, { x: x.current, y: y.current });
        tl.current.to(el.current.position, {
            y: 2 + viewport.height / 2,
            duration: floatSpeed.current,
            ease: 'none',
        });
        tl2.current.to(el.current.rotation, {
            z: Math.PI * 2 * direction.current,
            duration: spinSpeed.current,
            ease: 'none',
            repeat: -1,
        });
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (active) {
            tl.current.paused(false);
            tl2.current.paused(false);
            if (alive) {
                gsap.fromTo(
                    [tl.current, tl2.current],
                    { timeScale: 10 },
                    {
                        timeScale: 1,
                        duration: 3,
                        delay: selfId * 0.05,
                        ease: 'power3.out',
                        overwrite: true,
                    }
                );
                gsap.to(el.current.scale, {
                    x: scale.current,
                    y: scale.current,
                    duration: 1.5,
                    delay: selfId * 0.05,
                    ease: 'power3.out',
                });
            }
        } else {
            tl.current.paused(true);
            tl2.current.paused(true);
            gsap.set(el.current.scale, { x: 0, y: 0 });
        }
        if (!alive) setAlive(true);
    }, [active]);

    useFrame(() => {
        if (el.current.position.y >= 1 + viewport.height / 2) removeSelf();
    });

    return (
        <mesh ref={el} scale={scale.current}>
            <ringGeometry {...item.geometry} />
            <meshBasicMaterial color='#252525' />
        </mesh>
    );
};

const ContactBackground = () => {
    const el = useRef<HTMLCanvasElement>(null!);
    const [rerender, setRerender] = useState<boolean>(false);

    useIsomorphicLayoutEffect(() => {
        let timer: any = null;
        const handleResize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setRerender(!rerender);
            }, 500);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    useIsomorphicLayoutEffect(() => {
        gsap.fromTo(
            '.nav-home',
            {
                color: '#262626',
            },
            {
                color: '#f5f5f5',
                scrollTrigger: {
                    trigger: '.contact-bg',
                    start: '10% 16%',
                    end: '10% 10%',
                    scrub: 0.8,
                },
            }
        );
    }, []);

    return (
        <div className='contact-bg absolute top-0 left-0 z-[-10] h-full w-full overflow-hidden bg-[#262626]'>
            <div className='h-full w-full' data-speed='0.4'>
                <Canvas
                    orthographic
                    camera={{ position: [0, 0, 10], zoom: 100 }}
                    flat
                    ref={el}
                    resize={{ scroll: false }}
                >
                    <Spawner rerender={rerender} />
                </Canvas>
            </div>
        </div>
    );
};

export default ContactBackground;
