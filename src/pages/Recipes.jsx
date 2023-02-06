import React, { useCallback, useContext, useEffect } from 'react';
import { Card, Col, Container, Placeholder, Row } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import Categories from '../components/Categories';
import cleanDataAttributes from '../helper/cleanDataAttributes';
import rockGlass from '../images/rockGlass.svg';

function Recipes() {
  const { fetchData, searchData, setSearchData, isLoading } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    async function setDefaultRecipes() {
      const data = await
      fetchData(location.pathname === '/meals' ? 'meal' : 'cocktail', 'name', '');
      const path = location.pathname.replace('/', '');
      const cleanData = cleanDataAttributes(data, path);
      setSearchData(cleanData[path]);
    }
    setDefaultRecipes();
  }, [location.pathname, setSearchData]);

  const recipeCard = useCallback(({ index, str: title, thumb: img, id, idMeal }) => (
    <Col
      key={ index }
    >
      <Card
        data-testid={ `${index}-recipe-card` }
        bg="light"
        text="dark"
        onClick={ () => { history.push(`${idMeal ? 'meal' : 'drink'}s/${id}`); } }
      >
        <Card.Img
          variant="top"
          data-testid={ `${index}-card-img` }
          src={ img }
        />
        <Card.Body>
          <Card.Title
            data-testid={ `${index}-card-name` }
          >
            { title }
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>

  ), [history]);

  const recipeListLength = 12;

  const recipeList = useCallback(() => {
    if (isLoading) {
      return (
        <Card>
          <Card.Img
            className="rocksGlass bw-filter w-75 mx-5"
            variant="top"
            src={ rockGlass }
          />
          <Card.Body>
            <Placeholder as={ Card.Title } animation="glow">
              <Placeholder xs={ 6 } />
            </Placeholder>
            <Placeholder as={ Card.Text } animation="glow" />
          </Card.Body>
        </Card>
      );
    }
    return searchData
      .slice(0, recipeListLength).map(({ str, thumb, id, idMeal }, index) => (
        recipeCard({ index, str, thumb, id, idMeal })
      ));
  }, [searchData, recipeCard]);

  return (
    <>
      <Categories />
      <Container className="pb-5 mb-4 col-md-5 mx-auto">
        <h1 className="mb-3">Recipes</h1>
        <Row xs={ 1 } md={ 3 } className="g-4 mx-auto">
          { recipeList() }
        </Row>
      </Container>
    </>
  );
}

export default Recipes;
