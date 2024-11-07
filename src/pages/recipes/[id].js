import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Chip } from 'primereact/chip';
import { Panel } from 'primereact/panel';
import { ListBox } from 'primereact/listbox';
import { BreadCrumb } from 'primereact/breadcrumb';
import { ProgressSpinner } from 'primereact/progressspinner';

import moment from 'moment/moment';

const fetchRecipe = async (sid) => {
  const response = await fetch(`/api/recipe?id=${sid}`);
  const data = await response.json();
  return data;
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fetching, setFetching] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);

  const home = { icon: 'pi pi-home', url: '/' }

  useEffect(() => {
    if (!id) return;

    const getRecipe = async () => {
      const { data } = await fetchRecipe(id);
      setFetching(false);
      setRecipe(data);
      setIngredients(data.ingredients);
      setBreadcrumb([
        { label: 'Recipes', url: '/recipes' },
        { label: data.title }
      ]);
    };

    if (fetching) {
      getRecipe();
    }
  });

  const ingredientsTemplate = (option) => {
    return (
      <span dangerouslySetInnerHTML={{ __html: option }}></span>
    );
  };

  return (
    <div>
      {fetching && <div className='flex justify-content-center'><ProgressSpinner /></div>}

      {!fetching && <>
        <BreadCrumb model={breadcrumb} home={home} className='mt-4' />
        <h1 className='mb-2'>{recipe ? recipe.title : "Recipe"}</h1>
        <small>
          By <b>{recipe?.created_by}</b> 
          <span className='p-text-secondary'> | Created on { moment(recipe?.created_at).format('MMMM Do, YYYY') }</span>
        </small>
        <div className='flex flex-wrap w-full mb-3'>
          <div className="col-12 sm:col-12 lg:col-6 p-2">
            <img src={recipe.image} alt={recipe.title} width='100%' className='mt-2' />
          </div>
          <div className="col-12 sm:col-12 lg:col-6 p-2">
            <div>
              {recipe.information.map((info, index) => (
                <p key={index} className='mt-0'>{info}</p>
              ))}
            </div>
            <Panel header="Ingredients" toggleable 
              pt={{
                header: {style: {background: 'transparent', border: 0, padding: 0}},
                content: {style: {background: 'transparent', border: 0, padding: '1rem 0'}},
              }}
            >
              <ListBox options={ingredients} itemTemplate={ingredientsTemplate} className="w-full md:w-30rem"/>
            </Panel>
          </div>
        </div>
        <div>
          <h3>Instructions</h3>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} dangerouslySetInnerHTML={{__html: instruction}}></div>
          ))}
        </div>
        <div className='my-5'>
          {recipe.tags.map((tag, index) => (
            <Chip key={index} label={tag} className='mr-2 mb-2' />
          ))}
        </div>
      </>}
    </div>
  );
}

export default Page;