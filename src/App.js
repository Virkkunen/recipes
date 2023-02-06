/* eslint-disable max-len */
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthProvider from './context/AuthProvider';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <RecipesProvider>
          <Header />
          <Switch>
            <Route exact path="/recipes" component={ Login } />
            <Route exact path="/recipes/meals" component={ Recipes } />
            <Route exact path="/recipes/drinks" component={ Recipes } />
            <Route exact path="/recipes/meals/:id" component={ RecipeDetails } />
            <Route exact path="/recipes/drinks/:id" component={ RecipeDetails } />
            <Route exact path="/recipes/meals/:id/in-progress" component={ RecipeInProgress } />
            <Route
              exact
              path="/recipes/drinks/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route exact path="/recipes/profile" component={ Profile } />
            <Route exact path="/recipes/done-recipes" component={ DoneRecipes } />
            <Route exact path="/recipes/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
          <Footer />
        </RecipesProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
