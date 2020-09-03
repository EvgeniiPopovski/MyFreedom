import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect, NavLink} from "react-router-dom";

import './App.css';
import {Breeds} from "./Breeds/Breeds";
import {BreedImage} from "./BreedImage/BreedImage";

function App() {
    const [breeds, setBreeds] = useState(null)
    const [error , setError] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch('https://dog.ceo/api/breeds/list/all')
                let breedsList = await response.json()
                setBreeds(breedsList.message)
            } catch (e) {
                setError(e.message)
            }
        }
        fetchData()
    }, [])
    if (!breeds) {
        return <p className='loading container'>...Loading...</p>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <BrowserRouter>
            <div className='menu__section'>
                <NavLink className='menu_item' exact to={'/breeds'}>Список пород</NavLink>
                <NavLink className='menu_item' exact to={'/breeds/random'}>Рандомная картинка</NavLink>
            </div>
            <Switch>
                <Route exact path={"/breeds"}>
                    <Breeds breeds={breeds}/>
                </Route>
                <Route exact path={"/:breed/:semiBreed/images"}>
                    <BreedImage />
                </Route>
                <Route exact path={"/:breed/images"}>
                    <BreedImage />
                </Route>
                <Route exact path={"/breeds/random"}>
                    <BreedImage />
                </Route>
                <Route exact path={"/"}>
                    <Redirect to={'/breeds'}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
