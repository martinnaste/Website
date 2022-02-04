import React from 'react';
import './About.css';

function About() {
  return (
    <div className='about-container'>
        <div id='about'></div>
        <h1>About Me</h1>
        <div className='about-text'>
            <p className='text-info'>My name is Martin Nastevski. I graduated from the University of Western Australia in 2021 with a Bachelors Degree in Science, Majoring in Computer Science.
                During my final year of university I found a new love for front end web development, specifically using React, which has led me to building a few things using JavaScript.
                When I'm not coding I am <span style={{"textDecoration":"line-through", "display":"inline-block"}}>coding</span> training Bujinkan, researching into the blockchain, its projects and various crypto assets, playing soccer, and working out.
            </p>
        </div>
    </div>
  );
}

export default About;
