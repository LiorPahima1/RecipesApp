import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import S3Client, { RecipeData } from './S3Client';
import './MyRecipes.css'; // Import the CSS file

function MyRecipes({ userEmail }: { userEmail: string }) {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);

    useEffect(() => {
        fetchRecipes(userEmail);
    }, [userEmail]);

    const fetchRecipes = async (email: string) => {
        const s3Client = new S3Client();
        try {
            const userRecipes = await s3Client.listRecipes(email);
            setRecipes(userRecipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="my-recipes-container">
            <h2 className="my-recipes-title">My Recipes</h2>
            <ul className="my-recipes-list">
                {recipes.map((recipe, index) => (
                    <li key={index} className="my-recipes-list-item">
                        <Link to={`/my-recipes/${recipe.recipeName}`} className="my-recipes-link">{recipe.recipeName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyRecipes;
