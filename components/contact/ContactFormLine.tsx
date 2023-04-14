const ContactFormLine = ({ inputId, hasError }: { inputId: number; hasError: boolean }) => {
    return (
        <svg
            viewBox='0 0 300 100'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`input-line-${inputId} pointer-events-none absolute right-0 bottom-0 h-[90px] w-[300%] fill-none stroke-[1.75] transition-colors duration-300 will-change-transform ${
                hasError
                    ? 'stroke-red-500/70 peer-focus:!stroke-red-500'
                    : 'stroke-neutral-400/70 peer-focus:!stroke-neutral-100'
            }`}
            preserveAspectRatio='none'
        >
            <path d='M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300' />
        </svg>
    );
};

export default ContactFormLine;
