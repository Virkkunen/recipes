import { Container, Card, Placeholder } from 'react-bootstrap';
import rockGlass from '../images/rockGlass.svg';

export default function PlaceholderRecipeDetails() {
  return (
    <Container className="pt-3 mb-4 col-md-5 mx-auto">
      <Placeholder animation="wave">
        <Placeholder xs={ 4 } size="lg" bg="secondary" />
        {' '}
        <Placeholder xs={ 3 } size="lg" bg="primary" />
        {' '}
        <Placeholder xs={ 4 } size="lg" bg="info" />
      </Placeholder>
      <Card className="mt-3">
        <Card.Body>
          <Placeholder as={ Card.Title } animation="glow">
            <Placeholder xs={ 6 } />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow" />
        </Card.Body>
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
      <Card className="mt-3">
        <Card.Body>
          <Placeholder as={ Card.Title } animation="glow">
            <Placeholder xs={ 12 } />
          </Placeholder>
          {' '}
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 8 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 6 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 5 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 7 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 8 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 5 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 8 } size="sm" />
          </Placeholder>
          <Placeholder as={ Card.Text } animation="glow">
            <Placeholder xs={ 7 } size="sm" />
          </Placeholder>
        </Card.Body>
      </Card>
    </Container>
  );
}
