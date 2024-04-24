import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface RecipeFormData {
    recipeName: string;
    ingredients: string;
    instructions: string;
    visibility: 'private' | 'public';
    userEmail: string;
}

interface RecipeFormProps {
    onRecipeSubmit: (recipeData: RecipeFormData) => void;
    userId: string;
    userEmail: string;
}

function RecipeForm({ onRecipeSubmit, userEmail }: RecipeFormProps) {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [visibility, setVisibility] = useState<'private' | 'public'>('private'); // Initialize visibility state

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const recipeData: RecipeFormData = {
            recipeName,
            ingredients,
            instructions,
            visibility,
            userEmail
        };
        onRecipeSubmit(recipeData);

        // Reset form fields
        setRecipeName('');
        setIngredients('');
        setInstructions('');
        setVisibility('private');
    };

    const handleRecipeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipeName(e.target.value);
    };

    const handleIngredientsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setIngredients(e.target.value);
    };

    const handleInstructionsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInstructions(e.target.value);
    };

    const handleVisibilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setVisibility(e.target.value as 'private' | 'public');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="recipeName">Recipe Name:</label>
                <input
                    type="text"
                    id="recipeName"
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea
                    id="ingredients"
                    value={ingredients}
                    onChange={handleIngredientsChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                    id="instructions"
                    value={instructions}
                    onChange={handleInstructionsChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="visibility">Visibility:</label>
                <select
                    id="visibility"
                    value={visibility}
                    onChange={handleVisibilityChange}
                >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RecipeForm;
