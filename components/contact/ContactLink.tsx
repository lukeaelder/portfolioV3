import Magnetic from '../Magnetic';

const ContactLink = ({ href, label, path }: { href: string; label: string; path: string }) => {
    return (
        <a
            href={href}
            target={label !== 'Email' ? '_blank' : '_self'}
            rel={label !== 'Email' ? 'noopener noreferrer' : ''}
            aria-label={label}
            className='mx-2'
        >
            <Magnetic strength={15}>
                <svg
                    className='mag-fast h-6 w-6 stroke-inherit stroke-2'
                    viewBox='0 0 24 24'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d={path}></path>
                </svg>
                <div className='mag-slow pointer-events-none'>
                    <div className='absolute -bottom-[2px] h-[2px] w-full origin-center scale-x-0 rounded-full bg-neutral-100 transition-transform group-hover:translate-y-2 group-hover:scale-x-100'></div>
                </div>
            </Magnetic>
        </a>
    );
};

export default ContactLink;
