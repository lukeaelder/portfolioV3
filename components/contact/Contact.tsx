import Magnetic from '../Magnetic';
import Title from '../Title';
import ContactBackground from './ContactBackground';
import ContactForm from './ContactForm';
import ContactLink from './ContactLink';
import ContactRounded from './ContactRounded';

const Contact = () => {
    return (
        <section
            className='contact-section relative z-[0] min-h-[100svh] w-full overflow-x-clip'
            id='contact'
        >
            <ContactBackground />
            <ContactRounded />
            <div className='w-full overflow-hidden px-[5%]'>
                <div className='contact-content relative flex min-h-[100svh] w-full flex-col items-center justify-between pt-12'>
                    <Title title='Contact' classes='text-neutral-100' />
                    <ContactForm />
                    <div className='flex w-full justify-between py-12'>
                        <div>
                            <p className='mb-4 text-neutral-400'>VERSION</p>
                            <a
                                href='https://github.com/lukeaelder/portfolioV3'
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label='GitHub Repository'
                            >
                                <Magnetic strength={15}>
                                    <p className='mag-fast text-neutral-200'>V3 / 2023</p>
                                    <div className='mag-slow pointer-events-none'>
                                        <div className='absolute -bottom-[2px] h-[2px] w-full origin-center scale-x-0 rounded-full bg-neutral-100 transition-transform group-hover:translate-y-2 group-hover:scale-x-100'></div>
                                    </div>
                                </Magnetic>
                            </a>
                        </div>
                        <div>
                            <p className='mb-4 text-neutral-400'>LINKS</p>
                            <div className='flex stroke-neutral-200'>
                                <ContactLink
                                    href='https://github.com/lukeaelder'
                                    label='Github'
                                    path='M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5A4.6 4.6 0 0 0 18.7 6.3A4.2 4.2 0 0 0 18.6 3.1C18.6 3.1 17.5 2.8 15.1 4.4A12.3 12.3 0 0 0 8.9 4.4C6.5 2.8 5.4 3.1 5.4 3.1A4.2 4.2 0 0 0 5.3 6.3A4.6 4.6 0 0 0 4 9.5C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21'
                                />
                                <ContactLink
                                    href='https://www.linkedin.com/in/lukeaelder'
                                    label='LinkedIn'
                                    path='M16 16V13A2 2 0 0 0 12 13M12 16V11M8 8V8.001M8 11L8 16M6 4L18 4A2 2 0 0 1 20 6L20 18A2 2 0 0 1 18 20L6 20A2 2 0 0 1 4 18L4 6A2 2 0 0 1 6 4'
                                />
                                <ContactLink
                                    href='mailto:lukeaeld@gmail.com'
                                    label='Email'
                                    path='M3 8A2 2 0 0 1 5 6H19A2 2 0 0 1 21 8V17A2 2 0 0 1 19 19H5A2 2 0 0 1 3 17V8M3 9L10.5 13.5A3 3 0 0 0 13.5 13.5L21 9'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
