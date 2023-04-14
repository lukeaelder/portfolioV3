const ProjectSides = ({
    projectColors,
    cur,
    projectCount,
}: {
    projectColors: string[][];
    cur: number;
    projectCount: number;
}) => {
    return (
        <div className='pointer-events-none absolute top-0 left-0 z-[100] h-full w-full'>
            <div
                className={`absolute top-0 left-0 h-full w-[.375rem] origin-left transition lg:w-2 ${
                    projectColors[cur + 1][1]
                } ${
                    cur === -1 || cur === projectCount
                        ? 'scale-x-0 duration-500'
                        : 'scale-x-100 duration-[1500ms]'
                }`}
            ></div>
            <div
                className={`absolute top-0 right-0 h-full w-[.375rem] origin-right transition lg:w-2 ${
                    projectColors[cur + 1][1]
                } ${
                    cur === -1 || cur === projectCount
                        ? 'scale-x-0 duration-500'
                        : 'scale-x-100 duration-[1500ms]'
                }`}
            ></div>
        </div>
    );
};

export default ProjectSides;
