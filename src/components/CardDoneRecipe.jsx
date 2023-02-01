import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Stack } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { AppContext } from '../context/AppProvider';

export default function CardDoneRecipe({ page }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [idRecipeCopied, setRecipeCopied] = useState('');
  const { doneRecipes, favRecipes, handleUnfavorite } = useContext(AppContext);

  const THREE = 3;
  const ONE_SECOND = 1000;

  let recipeArr;

  switch (page) {
  case 'done':
    recipeArr = doneRecipes;
    break;
  case 'fav':
    recipeArr = favRecipes;
    break;
  default:
    break;
  }

  useEffect(() => {
    let interval = null;
    if (linkCopied && seconds === THREE) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, ONE_SECOND);
    } else if (linkCopied && seconds === 0) {
      clearInterval(interval);
      setLinkCopied(false);
      setLinkCopied('');
    }
  }, [linkCopied, seconds]);

  const handleClick = useCallback(({ target: { name, id } }) => {
    const link = `http://localhost:3000/${name}s/${id}`;
    clipboardCopy(link);
    setRecipeCopied(id);
    setLinkCopied(true);
    setSeconds(THREE);
  }, []);

  return (
    <Stack
      direction="vertical"
      gap={ 3 }
    >
      { recipeArr && recipeArr.map((recipe, index) => (
        <Card key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <Card.Img
              variant="top"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ `image of ${recipe.name}` }
            />
          </Link>
          <Card.Body>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              className="text-decoration-none"
            >
              <Card.Title
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </Card.Title>
            </Link>
            <Card.Text
              data-testid={ `${index}-horizontal-top-text` }
              className="mb-2"
            >
              { recipe.nationality && `${recipe.nationality} - ` }
              { recipe.alcoholicOrNot && `${recipe.alcoholicOrNot} - ` }
              { recipe.category }
            </Card.Text>
            <Card.Subtitle
              className="text-muted mb-1"
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </Card.Subtitle>
            <Stack
              direction="horizontal"
              gap={ 1 }
              className="mb-3"
            >
              { recipe.tags && recipe.tags.map((tag) => (
                <Card.Subtitle
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                  className="text-muted"
                >
                  { tag }
                </Card.Subtitle>
              ))}
            </Stack>
            <ButtonGroup size="sm">
              <Button
                variant="info"
                onClick={ handleClick }
              >
                { linkCopied && idRecipeCopied === recipe.id
                  ? <span>Link copied!</span>
                  : (
                    <img
                      src={ shareIcon }
                      alt="share"
                      data-testid={ `${index}-horizontal-share-btn` }
                      name={ recipe.type }
                      id={ recipe.id }
                    />
                  )}
              </Button>
              { page === 'fav'
            && (
              <Button
                variant="primary"
                onClick={ handleUnfavorite }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Favorite icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  id={ recipe.id }
                />
              </Button>
            )}
            </ButtonGroup>

          </Card.Body>
        </Card>
      ))}

    </Stack>
  );
}

CardDoneRecipe.propTypes = {
  page: PropTypes.string.isRequired,
};
