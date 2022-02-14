import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, [])

    console.log(window.location.pathname);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar' id='hero'>
                <div className='navbar-container'>
                    <a href={useLocation().pathname !== '/website/' ? 'website' : '/'} onClick={closeMobileMenu}>
                        {console.log("UL: ", useLocation().pathname)}
                        <img height="120px" src={require("../assets/images/MNpx2.png")} className='img1' alt='MN'/>
                    </a>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <a href={useLocation().pathname !== '/website/' ? 'website' : '/'} className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </a>
                        </li>
                        <li className='nav-item'>
                            {useLocation().pathname === '/website/' && <a href='#projects' className='nav-links' onClick={closeMobileMenu}>
                                Projects
                            </a>}
                        </li>
                        <li className='nav-item'>
                            {useLocation().pathname === '/website/' && <a href='#about' className='nav-links' onClick={closeMobileMenu}>
                                About Me
                            </a>}
                        </li> 
                        {!button && 
                        <li className='nav-item'>
                            <a target="_blank" href='https://www.linkedin.com/in/martin-nastevski/' className='btn-li' rel="noreferrer"><i className='fab fa-linkedin' /></a>
                        </li>} 
                        {!button && 
                        <li className='nav-item'>
                            <a target="_blank" href='https://github.com/martinnaste/' className='btn-gh' rel="noreferrer"><i className='fab fa-github' /></a>
                        </li>}
                    </ul>
                    {button && <a target="_blank" href='https://www.linkedin.com/in/martin-nastevski/' className='btn-li' rel="noreferrer"><i className='fab fa-linkedin' /></a>}
                    {button && <a target="_blank" href='https://github.com/martinnaste/' className='btn-gh' rel="noreferrer"><i className='fab fa-github' /></a>} 
                </div>
            </nav>
        </>
    )
}

export default Navbar
