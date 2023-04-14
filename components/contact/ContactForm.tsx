'use client';

import { useRef, useState } from 'react';
import { gsap } from '../gsap/gsap';
import useIsomorphicLayoutEffect from '../gsap/UseIsomorphicLayoutEffect';
import Magnetic from '../Magnetic';
import ContactFormLine from './ContactFormLine';

const ContactForm = () => {
    const el = useRef<HTMLDivElement>(null!);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        message: false,
    });
    const [sent, setSent] = useState<boolean>(false);
    const [sendError, setSendError] = useState<boolean>(false);

    useIsomorphicLayoutEffect(() => {
        gsap.fromTo(
            '.contact-content',
            { translateY: '-50%' },
            {
                translateY: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.contact-section',
                    scrub: true,
                    start: 'top bottom',
                    end: 'top top',
                },
            }
        );
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (sent) {
            const timer = setTimeout(() => {
                setSent(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [sent]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const curErrors = { name: false, email: false, message: false };
        setSendError(false);
        setSent(false);
        if (!name.length) {
            curErrors.name = true;
        }
        if (
            !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                email
            )
        ) {
            curErrors.email = true;
        }
        if (message.length < 3) {
            curErrors.message = true;
        }
        setErrors(curErrors);
        if (curErrors.name || curErrors.email || curErrors.message) {
            return;
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        };
        const response = await fetch('/api/contact', options);
        const { result } = await response.json();
        if (result === 0 || result === 7) {
            setSent(false);
            setSendError(true);
            return;
        }
        if (result === 1) {
            setErrors({
                name: true,
                email: true,
                message: true,
            });
            return;
        }
        if (result === 2 || result === 3 || result === 4 || result === 5) {
            setErrors({
                name: result === 2,
                email: result === 3 || result === 5,
                message: result === 4,
            });
            return;
        }
        if (result === 6) {
            setName('');
            setEmail('');
            setMessage('');
            setSent(true);
            return;
        }
    };

    const handleFocus = (inputId: number) => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                `.input-line-${inputId}`,
                { translateX: 0 },
                {
                    translateX: '66%',
                    duration: 1,
                    ease: 'power1.out',
                }
            );
        }, el);
    };

    const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div
            className='mx-auto mb-12 flex w-full max-w-[90rem] flex-col gap-3 text-[clamp(1.5rem,3vw+.1rem,2rem)] text-neutral-100'
            ref={el}
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='group'>
                    <div className='relative overflow-hidden'>
                        <input
                            type='text'
                            placeholder='Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => handleFocus(1)}
                            className='peer w-full bg-transparent py-5 outline-none placeholder:text-neutral-400'
                        />
                        <ContactFormLine inputId={1} hasError={errors.name} />
                    </div>
                    {errors.name ? (
                        <span className='block text-sm font-light text-red-500 lg:text-base'>
                            Please enter a valid name
                        </span>
                    ) : null}
                </div>
                <div className='group'>
                    <div className='relative overflow-hidden'>
                        <input
                            type='text'
                            placeholder='Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => handleFocus(2)}
                            className='peer w-full bg-transparent py-5 outline-none placeholder:text-neutral-400'
                        />
                        <ContactFormLine inputId={2} hasError={errors.email} />
                    </div>
                    {errors.email ? (
                        <span className='block text-sm font-light text-red-500 lg:text-base'>
                            Please enter a valid Email
                        </span>
                    ) : null}
                </div>
                <div className='group'>
                    <div className='relative overflow-hidden'>
                        <textarea
                            placeholder='Your Message'
                            value={message}
                            onChange={(e) => updateTextArea(e)}
                            onFocus={() => handleFocus(3)}
                            className='peer min-h-[11rem] w-full resize-none bg-transparent py-5 outline-none placeholder:text-neutral-400'
                        />
                        <ContactFormLine inputId={3} hasError={errors.message} />
                    </div>
                    {errors.message ? (
                        <span className='block text-sm font-light text-red-500 lg:text-base'>
                            Please enter a message atleast 3 character long
                        </span>
                    ) : null}
                </div>
                <button type='submit' className='mt-4'>
                    <Magnetic>
                        <p
                            className={`mag-fast py-3 transition-colors duration-200 ${
                                sent
                                    ? 'text-green-500 group-hover:text-green-300'
                                    : sendError
                                    ? 'text-red-500 group-hover:text-red-300'
                                    : 'text-neutral-400 group-hover:text-neutral-100'
                            }`}
                        >
                            {' '}
                            Send Message
                        </p>
                        <div
                            className={`mag-slow absolute bottom-0 left-0 h-[2px] w-full  transition-colors duration-200 ${
                                sent
                                    ? 'bg-green-500/70 group-hover:bg-green-300'
                                    : sendError
                                    ? 'bg-red-500/70 group-hover:bg-red-300'
                                    : 'bg-neutral-400/70 group-hover:bg-neutral-100'
                            }`}
                        >
                            <span
                                className={`absolute left-0 -bottom-3 translate-y-full text-sm font-light transition-colors duration-200 lg:text-base ${
                                    sent
                                        ? 'text-green-500 group-hover:text-green-300'
                                        : sendError
                                        ? 'text-red-500 group-hover:text-red-300'
                                        : ''
                                }`}
                            >
                                {sent ? 'Message Sent :)' : sendError ? 'Error Sending :(' : ''}
                            </span>
                        </div>
                    </Magnetic>
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
