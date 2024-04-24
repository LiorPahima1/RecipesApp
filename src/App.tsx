import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import NewRecipes from './NewRecipes';
import RecipesAccount from "./RecipesAccount";
import LoginPage from './LoginPage';
import UserContext from "./UserContext"; // Assuming UserContext is defined
import MyRecipes from './MyRecipes'; // Import MyRecipes component
import SharedRecipes from './SharedRecipes'; // Import SharedRecipes component
import RecipeDetails from './RecipeDetails'; // Import RecipeDetails component

function App() {
    const [userEmail, setUserEmail] = useState<string>("");

    const handleLogin = (email: string) => {
        const x =localStorage.getItem('userEmail');
        if (x !== null){
            setUserEmail(x);
        }
    };

    return (
        <Router>
            <UserContext.Provider value={userEmail}>
                <Routes>
                    <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/new-recipes" element={<NewRecipes userEmail={userEmail} />} />
                    <Route path="/recipes-account" element={<RecipesAccount />} />
                    <Route path="/my-recipes" element={<MyRecipes userEmail={userEmail} />} />
                    <Route path="/shared-recipes" element={<SharedRecipes />} />
                    <Route path="/shared-recipes/:recipeName" element={<RecipeDetails />} />
                    <Route path="/my-recipes/:recipeName" element={<RecipeDetails />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}

export default App;


