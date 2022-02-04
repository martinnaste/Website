import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
    return (
        <>
            <li className='cards-item'>
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
            </li>
        </>
    )
}

export default CardItem
