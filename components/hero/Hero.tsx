import HeroBackground from './HeroBackground';
import HeroDown from './HeroDown';
import HeroTitle from './HeroTitle';
import MarqueeName from './MarqueeName';

const Hero = () => {
    return (
        <section
            className='relative flex min-h-[110lvh] cursor-default items-center overflow-hidden pb-36 pt-48 text-[clamp(6rem,15vw,10rem)] leading-[clamp(6rem,15vw,10rem)] tracking-tight text-white'
            id='hero'
        >
            <HeroBackground />
            <div className='h-fit w-screen -rotate-6' data-speed='0.7'>
                <MarqueeName />
                <HeroTitle />
            </div>
            <HeroDown />
        </section>
    );
};

export default Hero;
