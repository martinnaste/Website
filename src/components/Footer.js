import React from 'react'
import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='contact-container'>
                <div>
                    <a href='/#'>
                        <img height="120px" src={require("../assets/images/MNpx2.png")} className='img1' alt='MN'/>
                    </a>
                </div>
                <div className='text-container'>
                    <div className='text'>
                        <p className="footer-text">
                            Contact me via LinkedIn
                        </p>
                        <a target="_blank" href='https://www.linkedin.com/in/martin-nastevski/' rel="noreferrer"><i id='text-icon'className='fab fa-linkedin'></i></a>
                    </div>
                    <div className='text'>
                        <p className="footer-text">
                            Have a look at my GitHub
                        </p>
                        <a target="_blank" href='https://github.com/martinnaste/' rel="noreferrer"><i id='text-icon'className='fab fa-github'></i></a>
                    </div>
                </div>
            </div>
            <div>
                <small className="website-rights">Martin Nastevski Copyright 2022</small>
            </div>

        </div>
    )
}

export default Footer
