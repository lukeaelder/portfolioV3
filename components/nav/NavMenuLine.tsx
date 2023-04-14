const NavMenuLine = ({ title }: { title: string; }) => {
    return (
        <div className='px-[clamp(1.25rem,3vw,2.5rem)]'>
            <span className='text-base text-neutral-500'>{title}</span>
            <div className='mt-6 mb-4 h-[1px] w-full bg-neutral-600'></div>
        </div>
    );
};

export default NavMenuLine;
