import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'

const BreedImage = () => {
    const [images , setImages ] = useState( null )
    const {breed , semiBreed} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            let url = 'https://dog.ceo/api/breeds/image/random'
            if (breed && semiBreed) {
                url = `https://dog.ceo/api/breed/${breed}/${semiBreed}/images`
            }
            if (!semiBreed && breed) {
                url = `https://dog.ceo/api/breed/${breed}/images`
            }
            let response = await fetch(url)
            let imagesList = await response.json()
            setImages(imagesList.message)
        }
        fetchData()
    }, [breed , semiBreed])
    if (!images) {
        return <p className='loading container'>...Loading...</p>
    }
    return (
        <div className='pictures container'>
            <h2 className='header__breed'>{breed}</h2>
            <h3 className='header__breed'>{semiBreed}</h3>
            {Array.isArray(images)
                ?   images.map( (image,index) => <img key={index} src={image} width={100} height={100}/> )
                : <img src={images} width={250} height={250}/>}
        </div>
    )
}

export {BreedImage}