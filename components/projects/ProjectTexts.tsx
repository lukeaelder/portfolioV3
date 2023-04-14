import ProjectText from './ProjectText';

const ProjectTexts = ({
    cur,
    projectColors,
}: {
    cur: { cur: number; prev: number };
    projectColors: string[][];
}) => {
    return (
        <>
            <ProjectText
                cur={cur}
                curKey={0}
                colors={projectColors}
                title='Svg Icon Library'
                desc='A collection of easy-to-use, customizable SVG icons for use in web projects. Users can also quickly create brand new icons.'
                stack={['Next.js', 'TailwindCSS', 'Fuse.js', 'Rollup']}
                git='https://github.com/lukeaelder/eldicons'
                url='https://eldicons.com/'
            />
            <ProjectText
                cur={cur}
                curKey={1}
                colors={projectColors}
                title='Movie Database App'
                desc='Search and explore any movie to get information about it. Sign up to save movies to your watchlist and create movie list.'
                stack={['Python', 'Flask', 'PostgreSQL']}
                git='https://github.com/lukeaelder/MovieR-L'
                url='https://movierandl.herokuapp.com/'
            />
            <ProjectText
                cur={cur}
                curKey={2}
                colors={projectColors}
                title='Developer Toolbox'
                desc='A set of tools for web developers including string manipulation, code minifiers, data generators, and more.'
                stack={['Next.js', 'TailwindCSS', 'GSAP']}
                url='https://wdtoolbox.com/'
            />
            <ProjectText
                cur={cur}
                curKey={3}
                colors={projectColors}
                title='Group Task App'
                desc='Users can join groups to make announcements, assign tasks, track progress, send realtime messages, make video calls, and more.'
                stack={['React', 'Node.js', 'socket.io', 'WebRTC']}
                git='https://github.com/lukeaelder/Capstone2-groupscheduler'
                url='https://c2-scheduler.surge.sh/'
            />
        </>
    );
};

export default ProjectTexts;
