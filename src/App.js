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
            <Route path="/meals" component={ Recipes } />
            <Route path="/drinks" component={ Recipes } />
            <Route path="/meals/:id" component={ RecipeDetails } />
            <Route path="/drinks/:id" component={ RecipeDetails } />
            <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
            <Route
              path="/drinks/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route path="/profile" component={ Profile } />
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
          <Footer />
        </RecipesProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
