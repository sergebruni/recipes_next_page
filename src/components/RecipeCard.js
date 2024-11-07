import { Card } from 'primereact/card';

const RecipeCard = ({ recipe }) => {
  const header = (
    <img alt="Card" src={recipe.image} width="270" />
  );

  return (
    <Card title={recipe.title} subTitle={`By ${recipe.created_by}`} header={header}>
      <p>{recipe.information}</p>
    </Card>
  );
};

export default RecipeCard;
