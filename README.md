http://localhost:3000
Recipe App
The Recipe App is a web application designed to help users manage their recipes effectively. Whether you're an experienced chef or just getting started in the kitchen, this app provides a convenient platform for storing, organizing, and sharing your favorite recipes.
Features
•	User Registration: New users can create an account to access the app's features. Existing users can log in to their accounts to continue where they left off.
•	Recipe Categories: The app offers three main options upon logging in:
1.	Public Recipes: View all public recipes shared by other users. These recipes are accessible to everyone using the app.
2.	Private Recipes: Access your personal collection of private recipes. Each user has their own private folder where they can store recipes that are not shared with others.
3.	Create New Recipe: Create a new recipe and choose whether it will be shared publicly or kept private. This feature allows users to contribute their own recipes to the app's community or keep them for personal use.
Getting Started
To get started with the Recipe App, follow these steps:
1.	Register/Login: If you're a new user, sign up for an account to access the app. Existing users can log in with their credentials.
2.	Explore Recipes: Once logged in, explore the available options to view public recipes, access your private collection, or create a new recipe.
3.	Create and Share: If you decide to create a new recipe, provide the necessary details and choose whether it will be shared publicly or kept private.
Technologies Used
•	User Authentication: User registration and login functionalities are powered by a SQL database. User data, including encrypted passwords, is stored securely in the database.
•	Recipe Storage: Writing and saving recipes is facilitated by AWS S3. Each user's recipes are stored in separate folders within the S3 bucket. Public recipes are stored in a shared folder accessible to all users.































 
