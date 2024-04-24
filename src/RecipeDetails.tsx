import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link
import S3Client, { RecipeData } from './S3Client';
import './RecipeDetails.css'; // Import the CSS file

function RecipeDetails() {
    const { pathname } = useLocation();
    const parts = pathname.split('/');
    const recipeType = parts[1];
    const recipeName = parts[2];
    const [recipe, setRecipe] = useState<RecipeData | null>(null);

    useEffect(() => {
        if (recipeType && recipeName) {
            fetchRecipe(recipeName, recipeType);
        }
    }, [recipeType, recipeName]);

    const fetchRecipe = async (recipeName: string, recipeType: string) => {
        const s3Client = new S3Client();
        try {
            let keyPrefix = '';
            if (recipeType === 'my-recipes') {
                // Retrieve userEmail from local storage
                const userEmail = localStorage.getItem('userEmail');
                if (userEmail) {
                    keyPrefix = `${userEmail}/`;
                }
            } else if (recipeType === 'shared-recipes') {
                keyPrefix = 'public/';
            }
            const recipeData = await s3Client.getRecipe(`${keyPrefix}${recipeName}.txt`);
            setRecipe(recipeData);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setRecipe(null); // Set recipe to null in case of an error
        }
    };

    return (
        <div className="recipe-details-container">
            <div className="white-container">
                {recipe ? (
                    <div>
                        <h2>{recipe.recipeName}</h2>
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>Instructions: {recipe.instructions}</p>
                        <Link to="/recipes-account" className="return-button">Return to Recipes Account</Link>
                    </div>
                ) : (
                    <div>Loading recipe...</div>
                )}
            </div>
        </div>
    );
}

export default RecipeDetails;
