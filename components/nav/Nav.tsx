import NavHome from './NavHome';
import NavMenu from './NavMenu';

const Nav = () => {
    return (
        <nav className='pointer-events-none fixed top-0 left-0 z-[999] h-full w-full'>
            <NavHome />
            <NavMenu />
        </nav>
    );
};

export default Nav;
