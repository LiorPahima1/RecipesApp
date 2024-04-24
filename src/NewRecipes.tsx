import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeForm, { RecipeFormData } from './RecipeForm';
import S3Client, { RecipeData } from './S3Client';
import './NewRecipes.css';

function NewRecipes({ userEmail }: { userEmail: string }) {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const userId = userEmail;

    const handleRecipeSubmit = async (recipeData: RecipeFormData) => {
        const s3Client = new S3Client();
        try {
            await s3Client.uploadRecipe(recipeData, userId, recipeData.visibility === 'public');
        } catch (error) {
            console.error('Error uploading recipe to S3:', error);
        }
    };

    return (
        <div className="container">
            <div className="content-wrapper">
                <div className="title-container">
                    <h1 className="title">New Recipe</h1>
                </div>
                <div className="recipe-container">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="box">
                            <h3>{recipe.recipeName}</h3>
                            <p>Ingredients: {recipe.ingredients}</p>
                            <p>Instructions: {recipe.instructions}</p>
                        </div>
                    ))}
                </div>
                <RecipeForm onRecipeSubmit={handleRecipeSubmit} userId={userId} userEmail={userEmail} />
                <div className="back-button-container">
                    <Link to="/recipes-account" className="back-button">
                        <span className="arrow">&#8592;</span> Back to Recipes Account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NewRecipes;
