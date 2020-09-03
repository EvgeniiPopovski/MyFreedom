import React from "react"
import {Link} from "react-router-dom";

const Breeds = ({breeds}) => {
    return (
    <ul className='breed__list'>
        {Object.keys(breeds).map((breed, index) => {
                return (
                    <li  key={index}><Link className='link__breed' to={`/${breed}/images`}>{breed}</Link>
                        <ul className='semiBriid__list'>
                            {breeds[breed] === [] ? '' : breeds[breed].map((semiBreed, index) => <li
                                key={index}> <Link className='link__semiBreed' to={`/${breed}/${semiBreed}/images`}> {semiBreed} </Link> </li>)}
                        </ul>
                    </li>
                )
            }
        )}
    </ul>
    )
}

export {Breeds}