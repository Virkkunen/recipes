/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Container,
  Image,
  ListGroup,
  Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import { FaHeart, FaShareAlt, FaRegHeart, FaCheck } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import useFavorite from '../hooks/useFavorite';
import { RecipesContext } from '../context/RecipesProvider';

const NUMBER_THIRTY_TWO = 32;

function RecipeDetails() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  const [copied, setCopied] = useState(false);
  const { toggleFavorite } = useFavorite();
  const {
    ingredients,
    recommended,
    getPageInfo,
    done,
    inProgress,
    favorite,
    setFavorite,
    checkRecipeStatus,
    recipe,
  } = useContext(RecipesContext);

  useEffect(() => {
    getPageInfo(id, page);
  }, [page, id]);

  useEffect(() => {
    checkRecipeStatus();
  }, [recipe]);

  const urlToEmbedUrl = (url) => `https://www.youtube.com/embed/${url.slice(NUMBER_THIRTY_TWO)}`;

  const handleClick = useCallback(() => {
    history.push(`${location.pathname}/in-progress`);
  }, [history, location]);

  const handleShare = useCallback(() => {
    copy(`http://localhost:3000${location.pathname}`);

    setCopied(true);
  }, [location]);

  const handleFavorite = useCallback(() => {
    setFavorite(!favorite);

    toggleFavorite(recipe[0]);
  }, [favorite, recipe, toggleFavorite]);

  const renderRecipe = useCallback(() => (
    <>
      { recipe.map(({
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strAlcoholic = '',
        strInstructions = '',
        strYoutube = '',
        idDrink,
        strDrink,
        strDrinkThumb,
      }, index) => (
        (idMeal || idDrink) && (
          <Container
            key={ `${idMeal || idDrink}${index}` }
            className="pt-3 col-md-5 mx-auto"
          >
            <Row>
              <ButtonGroup className="mb-3">
                <Button
                  variant="secondary"
                  onClick={ () => history.push(idMeal ? '/meals' : '/drinks') }
                >
                  <MdArrowBack size="1.6em" color="#ffffffee" />
                </Button>
                <Button
                  data-testid="share-btn"
                  onClick={ handleShare }
                  variant="info"
                >
                  {copied
                    ? (<FaCheck size="1.2em" color="#ffffffee" />)
                    : (<FaShareAlt size="1.2em" color="#ffffffee" />) }
                </Button>
                <Button
                  data-testid="favorite-btn"
                  onClick={ handleFavorite }
                >
                  {favorite
                    ? (<FaHeart size="1.2em" color="#ffffffee" />)
                    : (<FaRegHeart size="1.2em" color="#ffffffee" />)}
                </Button>
              </ButtonGroup>
            </Row>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title data-testid="recipe-title">{strMeal || strDrink}</Card.Title>
                <Card.Subtitle
                  data-testid="recipe-category"
                  className="text-muted"
                >
                  {`${strCategory} ${strAlcoholic}`}
                </Card.Subtitle>
              </Card.Body>
              <Card.Img
                src={ strMealThumb || strDrinkThumb }
                data-testid="recipe-photo"
                variant="bottom"
              />
            </Card>
            <Row>
              <ListGroup
                as="ul"
                className="px-3 mb-3"
              >
                <ListGroup.Item
                  as="li"
                  className="text-bold"
                  variant="secondary"
                >
                  Ingredients
                </ListGroup.Item>
                { ingredients.map((
                  { ingredient, measure },
                ) => (
                  <ListGroup.Item
                    key={ `${ingredient}${measure}` }
                    enabled="false"
                    as="li"
                  >
                    { ` ${ingredient} ${measure}` }
                  </ListGroup.Item>
                )) }
              </ListGroup>
            </Row>
            <Row>
              <h3>Instructions</h3>
              <p
                data-testid="instructions"
                className="mb-4"
              >
                { strInstructions }
              </p>
            </Row>
            { page === 'meals' && (
              <Row className="mb-4">
                <iframe
                  width="853"
                  height="480"
                  data-testid="video"
                  src={ urlToEmbedUrl(strYoutube) }
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </Row>
            ) }
            <Row
              className="pb-3 mb-5"
            >
              <h2>Recommendations</h2>
              <Carousel fade>
                { recommended.map(({
                  strDrinkThumb: imageDrink,
                  strMealThumb: imageMeal,
                  strDrink: nameDrink,
                  strMeal: nameMeal,
                  id: recipeId,
                }) => (
                  <Carousel.Item
                    key={ `recipes${recipeId}` }
                  >
                    <Image
                      className="d-block w-100"
                      src={ imageMeal || imageDrink }
                      alt={ nameMeal || nameDrink }
                      rounded
                    />
                    <Carousel.Caption>
                      <h3
                        data-testid={ `${recipeId}-recommendation-title` }
                        className="text-shadow"
                      >
                        { nameMeal || nameDrink }
                      </h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                )) }
              </Carousel>
            </Row>
            { !done && (
              <Row>
                <Button
                  className="button-done-recipe col-md-5"
                  variant="primary"
                  size="lg"
                  data-testid="start-recipe-btn"
                  fixed="bottom"
                  onClick={ handleClick }
                >
                  { inProgress ? 'Continue Recipe' : 'Start Recipe'}
                </Button>
              </Row>
            ) }
          </Container>
        )
      ))}
    </>
  ));
  return (
    renderRecipe()
  );
}

export default RecipeDetails;
