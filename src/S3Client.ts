import AWS from 'aws-sdk';

export interface RecipeData {
    recipeName: string;
    ingredients: string;
    instructions: string;
}

class S3Client {
    private readonly s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: "AKIA6ODU5SC2GRWFC35S",
            secretAccessKey: "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",
            region: "us-east-1"
        });
    }

    async uploadRecipe(recipe: RecipeData, userId: string, isPublic: boolean) {
        let key: string;
        if (isPublic) {
            key = `public/${recipe.recipeName}.txt`;
        } else {
            key = `${userId}/${recipe.recipeName}.txt`;
        }

        const params = {
            Bucket: 'recipes---app',
            Key: key,
            Body: `Recipe Name: ${recipe.recipeName}\nIngredients: ${recipe.ingredients}\nInstructions: ${recipe.instructions}`
        };

        try {
            await this.s3.upload(params).promise();
            console.log('Recipe uploaded successfully');
        } catch (error) {
            console.error('Error uploading recipe:', error);
            throw error;
        }
    }

    async listRecipes(directory: string): Promise<RecipeData[]> {
        const params = {
            Bucket: 'recipes---app',
            Prefix: directory + '/'
        };

        try {
            const data = await this.s3.listObjectsV2(params).promise();
            if (data.Contents) {
                const recipes = await Promise.all(data.Contents.map(async (obj) => {
                    const recipeKey = obj.Key as string;
                    const recipeData = await this.getRecipe(recipeKey);
                    return recipeData;
                }));
                return recipes;
            }
            return [];
        } catch (error) {
            console.error('Error listing recipes:', error);
            throw error;
        }
    }

    async getRecipe(recipeKey: string): Promise<RecipeData> {
        const params = {
            Bucket: 'recipes---app',
            Key: recipeKey
        };

        try {
            const data = await this.s3.getObject(params).promise();
            const recipeContent = data.Body?.toString('utf-8') || '';
            const lines = recipeContent.split('\n');
            const recipeName = lines[0].replace('Recipe Name: ', '');
            const ingredients = lines[1].replace('Ingredients: ', '');
            const instructions = lines[2].replace('Instructions: ', '');
            return {
                recipeName,
                ingredients,
                instructions
            };
        } catch (error) {
            console.error('Error getting recipe:', error);
            throw error;
        }
    }
}

export default S3Client;
