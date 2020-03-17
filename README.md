# Welcome to What2Cook!

**What2Cook** is an awesome app that allows you to drag and drop whatever you have in your refrigerator and searches what kind of recipes you can make with that food! Sometimes you are going to need a little more than what you give them, so it will also show some recipes that have some extra ingredients.


# User Interface
Upon loading, What2Cook shows you a list of all the possible ingredients in its database. You can scroll through the list, and select a food by either clicking it or dragging it into the fridge to the left. 

You can also type into the text box to filter your search, and What2Cook will find any ingredients if it has them in the database.

![](https://media.giphy.com/media/jpywDouD5T79gFi42w/giphy.gif)

Once ingredients are put in the fridge, you can click **Search Recipes!** and What2Cook will load some recipes for you on the bottom screen.

# API
### `GET: /searchFood`: URL query parameters: ingredient
 Example: `/searchFood?search=broccoli` searches for broccoli in the ingredient database.

### `GET: /recipes`: Request Params parameters:  array of ingredients
 Example: `/recipes?fridge[]=carrots&fridge[]=milk&fridge[]=butter` searches for recipes with carrots, milk and butter in the recipe database. Note that `fridge[]=` is required before each ingredient is listed.