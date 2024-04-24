import React from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './RecipesAccount.css';

function RecipesAccount() {
    return (
        <div className="recipes-account-container">
            <div className="content-wrapper">
                <Link to="/" className="logout-button">
                    <LogoutIcon />
                </Link>
                <h1>Recipes Account</h1>
                <div className="buttons-container">
                    <Link to="/my-recipes" className="my-recipes-button">My Recipes</Link>
                    <Link to="/shared-recipes" className="shared-recipes-button">Shared Recipes</Link>
                    <Link to="/new-recipes" className="add-recipe-button">Add Recipe</Link>
                </div>
            </div>
            <img src="images/cookbook.jpg" alt="Background" className="background-image" />
        </div>
    );
}

export default RecipesAccount;
