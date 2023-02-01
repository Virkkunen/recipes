import React, { useContext } from 'react';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';
import CardDoneRecipe from '../components/CardDoneRecipe';
import { AppContext } from '../context/AppProvider';

function FavoriteRecipes() {
  const { handleFavRecipesFilter } = useContext(AppContext);

  return (
    <Container className="pb-5 mb-4">
      <Row>
        <ButtonGroup
          size="sm"
          className="mb-2"
        >
          <Button
            variant="outline-dark"
            data-testid="filter-by-all-btn"
            name="all"
            onClick={ handleFavRecipesFilter }
          >
            All
          </Button>
          <Button
            variant="outline-dark"
            data-testid="filter-by-meal-btn"
            name="meal"
            onClick={ handleFavRecipesFilter }
          >
            Meals
          </Button>
          <Button
            variant="outline-dark"
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ handleFavRecipesFilter }
          >
            Drinks
          </Button>
        </ButtonGroup>
      </Row>
      <CardDoneRecipe page="fav" />
    </Container>
  );
}

export default FavoriteRecipes;
