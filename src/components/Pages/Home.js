import React from 'react';
import '../../App.css';
import About from '../About';
import Cards from '../Cards';
import HeroSection from '../HeroSection';

function Home() {
    return (
        <>
            <HeroSection />
            <Cards />
            <About />
        </>
    )
}

export default Home;