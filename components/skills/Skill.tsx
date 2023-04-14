const Skill = ({ title, path, fillPath }: { title: string; path: string; fillPath: string }) => {
    return (
        <div className={`skill flex flex-col items-center`}>
            <div className='overflow-hidden'>
                <svg
                    className='skill-icon h-7 w-7'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path fill='none' stroke='none' d='M0 0h24v24H0z' />
                    <path className='fill-black/10 stroke-none' d={fillPath} />
                    <path className='fill-none stroke-2' d={path} />
                </svg>
            </div>
            <span className='skill-line h-[1px] w-full origin-left bg-neutral-300'></span>
            <div className='overflow-hidden px-1'>
                <p className='skill-title'>{title}</p>
            </div>
        </div>
    );
};

export default Skill;
