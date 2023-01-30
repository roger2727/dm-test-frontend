import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./componets/Register";
import Login from "./componets/Login";
import AddRecipe from "./componets/AddRecipe";
import AddImage from "./componets/AddImage";
import UserRecipes from "./componets/RecipesList";
import Home from "./componets/Home";
import RecipeDetails from "./componets/RecipeDetails";
import RecipeCategory from "./componets/RecipeCategory";
import RecipeIngrediants from "./componets/SearchIngrediant";
import SearchTitle from "./componets/SearchTitle";
import RecipeServingSize from "./componets/SearchSize";
import UserPage from "./componets/UserPage";
import UpdateRecipe from "./componets/UpdateRecipe";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/search-serving-size/:servingSize"
          element={<RecipeServingSize />}
        />
        <Route path="category/:category" element={<RecipeCategory />} />
        <Route
          path="search-ingredients/:ingredient"
          element={<RecipeIngrediants />}
        />
        <Route path="update/:recipeId" element={<UpdateRecipe />} />
        <Route path=":id" element={<RecipeDetails />} />
        <Route path="search-title/:title" element={<SearchTitle />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<Home />} />
        <Route path="all" element={<UserRecipes />} />
        <Route path="upload-image/:recipeId" element={<AddImage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="AddRecipe" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
