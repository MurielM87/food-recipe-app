const searchBtn = document.getElementById('search_btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal_details_content');
const recipeCloseBtn = document.getElementById('recipe_close_btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search_input').value.trim();
    let urlMealList = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`;
    fetch(urlMealList)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal_item" data-id = "${meal.idMeal}">
                        <div class = "meal_img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal_name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe_btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe_btn')){
        let mealItem = e.target.parentElement.parentElement;
        let urlMealRecipe = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
        fetch(urlMealRecipe)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe_title">${meal.strMeal}</h2>
        <p class = "recipe_category">${meal.strCategory}</p>
        <div class = "recipe_instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe_meal_img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe_link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}