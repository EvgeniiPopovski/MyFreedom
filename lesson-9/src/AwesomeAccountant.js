import React, { useState, useEffect } from 'react'
import { getFirebaseData, docToObject, deleteItems, addItems, editItems } from './firebaseAPI/firebase';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './component/common/ProptectedRoute/ProtectedRoute';
import { CategoryPage } from './component/CategoryPage/CategoryPage';
import { ExpencesPage } from './component/ExpencesPage/ExpencesPage';
import { HomePage } from './component/HomePage';
import { useUserContext } from './component/context/UserContext';
import { Preloader } from './component/common/Preloader/Preloader';


const AwesomeAccountant = ({ children }) => {
    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");

    const { user } = useUserContext()

    useEffect(() => {
        const getCategories = async () => {
            try {
                setIsLoading(true)                
                let collection = await getFirebaseData("categories", user.id);
                setCategories(collection.docs.map(docToObject));
                setIsLoading(false)
            } catch (e) {
                setError(`Error: ${e.message} `);
            }
        };
        if (user) {
            getCategories();
        }

    }, [user]);

    const deleteCategory = async (categoryId) => {
        try {
            deleteItems(categoryId, "categories");
            setCategories(categories.filter((item) => categoryId !== item.id));
        } catch (e) {
            setError(`Error: ${e.message} `);
        }
    };

    const addCategory = async (newDataObj) => {
        try {
            let response = await addItems(newDataObj, "categories");
            setCategories([...categories, { id: response.id, ...newDataObj }]);
        } catch (e) {
            setError(`Error: ${e.message} `);
        }
    };

    const editCategory = async (categoryId, newData) => {
        try {
            editItems(newData, "categories", categoryId);
            let obj = categories.find((item) => categoryId === item.id);
            let index = categories.indexOf(obj);
            setCategories([
                ...categories.slice(0, index),
                { id: categoryId, ...newData },
                ...categories.slice(index + 1),
            ]);
        } catch (e) {
            setError(`Error: ${e.message} `);
        }
    };

    if(isLoading) {
        return (
            <Preloader/>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Error </h1> <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="app__container">
            <div className="app__wrapper">
                <Switch>
                    <ProtectedRoute path="/categories">
                        <CategoryPage
                            categories={categories}
                            deleteCategory={deleteCategory}
                            addCategory={addCategory}
                            editCategory={editCategory}
                        />
                    </ProtectedRoute>

                    <ProtectedRoute path="/expences">
                        <ExpencesPage categories={categories} />
                    </ProtectedRoute>

                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </div>

    )
}

export { AwesomeAccountant }