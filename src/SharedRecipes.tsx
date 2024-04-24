import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import S3Client, { RecipeData } from './S3Client';
import './SharedRecipes.css';

function SharedRecipes() {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);

    useEffect(() => {
        fetchSharedRecipes();
    }, []);

    const fetchSharedRecipes = async () => {
        const s3Client = new S3Client();
        try {
            const sharedRecipes = await s3Client.listRecipes('public'); // Fetch recipes from the public directory
            setRecipes(sharedRecipes);
        } catch (error) {
            console.error('Error fetching shared recipes:', error);
        }
    };

    return (
        <div className="shared-recipes-container">
            <h2>Shared Recipes</h2>
            <ul className="shared-recipes-list">
                {recipes.map((recipe, index) => (
                    <li className="shared-recipes-list-item" key={index}>
                        <Link className="shared-recipes-link" to={`/shared-recipes/${recipe.recipeName}`}>
                            {recipe.recipeName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SharedRecipes;
