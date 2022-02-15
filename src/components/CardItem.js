import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';


function CardItem(props) {
    //0 - Link, 1 - <a/>, 2 - /
    const [link, setLink] = useState(0);
    const toastId = React.useRef(null);

    const linkType = () => {
        if (props.path.includes('http')){
            setLink(1);
        } else if(props.path === '') {
            setLink(2);
        } else {
            setLink(0);
        }
    }
    
    useEffect(() => {
        linkType();
    });

    const handleClick = () => {
        if(window.location.pathname !== '/capstone'){
            if(!toast.isActive(toastId.current)){
                toastId.current = toast.info("This repo is private, feel free to ask me about it!", {
                    className: 'toast'
                });
            }
        }
    }

    return (
        <>
            <li className='cards-item'>
                {link === 0 &&
                <Link className='cards-link' to={props.path}>
                    <figure className='item-img-wrap'>
                        <img className='item-img' src={props.src} alt='Project pic'/>
                    </figure>
                    <div className='item-info'>
                        <h5>
                            {props.text}
                        </h5>
                        <h6>
                            {props.info}
                        </h6>
                        <h6>
                            {props.tags}
                        </h6>
                    </div>
                </Link> 
                }
                {link === 1 &&
                <a className='cards-link' href={props.path} target="_blank" rel="noreferrer">
                    <figure className='item-img-wrap'>
                        <img className='item-img' src={props.src} alt='Project pic'/>
                    </figure>
                    <div className='item-info'>
                        <h5>
                            {props.text}
                        </h5>
                        <h6>
                            {props.info}
                        </h6>
                        <h6>
                            {props.tags}
                        </h6>
                    </div>
                </a> 
                }
                {link === 2 &&
                <button className='cards-link-button' onClick={handleClick}>
                    <figure className='item-img-wrap'>
                        <img className='item-img' src={props.src} alt='Project pic'/>
                    </figure>
                    <div className='item-info'>
                        <h5>
                            {props.text}
                        </h5>
                        <h6>
                            {props.info}
                        </h6>
                        <h6>
                            {props.tags}
                        </h6>
                    </div>
                </button> 
                }
            </li>
        </>
    )
}

export default CardItem
