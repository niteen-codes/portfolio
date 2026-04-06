import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioLayout from './components/PortfolioLayout';
import PageLoader from './components/PageLoader';
import './App.css';
import './index.css';

function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
            <PortfolioLayout className={`app-container ${loaded ? 'app-visible' : 'app-hidden'}`}>
                <Navbar />
                <main className="content">
                    <Hero />
                    <Experience />
                    <Education />
                    <Projects />
                    <Skills />
                    <Contact />
                </main>
                <Footer />
            </PortfolioLayout>
        </>
    );
}

export default App;
