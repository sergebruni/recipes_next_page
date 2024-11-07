import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { ScrollTop } from 'primereact/scrolltop';
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

import moment from 'moment';

const fetchRecipes = async (query, page, limit) => {
  const response = await fetch(`/api/recipes?q=${query}&page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
};

const Page = () => {
  const router = useRouter();
  const { q = '' } = router.query;

  const [layout, setLayout] = useState('grid');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState(q);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    setQuery(q);
    setCurrentPage(1);
  }, [q]);

  useEffect(() => {
    const getRecipes = async () => {
      const { data, pages } = await fetchRecipes(query, currentPage, 15);
      setRecipes(data);
      setTotalPages(pages);
    };
    getRecipes();
  }, [query, currentPage]);

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);    
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleRecipeClick = (recipe) => {
    router.push(`/recipes/${recipe.sid}`);
  };

  const listItem = (recipe, index) => {
    return (
      <div className="col-12" key={recipe.sid}>
        <div 
          className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 cursor-pointer', { 'border-top-1 surface-border': index !== 0 })}
          onClick={() => handleRecipeClick(recipe)}
        >
          <img src={recipe.image} alt={recipe.title} className="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round" />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center justify-content-center sm:align-items-start gap-2">
              <h4 className="mb-2 my-0 font-bold text-large">{recipe.title}</h4>
              <p className="m-0 text-tiny uppercase font-bold">{recipe.created_by}</p>
              <div className="flex align-items-center gap-3">
              <span className='p-text-secondary'>Created on { moment(recipe.created_at).format('MMMM Do, YYYY') }</span>
              </div>
            </div>
            {/* <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Skeleton className="w-4rem border-round h-2rem" />
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (recipe) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={recipe.sid}>
        <div 
          className="p-3 border-0 surface-border surface-card border-round-lg shadow-1 cursor-pointer p-ripple"
          onClick={() => handleRecipeClick(recipe)}
        >
          <div className="flex flex-column align-items-center gap-1 py-4">
            <p className="m-0 mb-2 text-tiny uppercase font-bold">{recipe.created_by}</p>
            <img src={recipe.image} alt={recipe.title} className="w-10 shadow-2 border-round h-12rem" />
            <h4 className="mt-2 mb-0 font-bold text-large text-center">{recipe.title}</h4>
            <p>{recipe.information}</p>
          </div>
          <Ripple pt={{ root: { style: { background: '#2196f333'}}}} />
        </div>
      </div>
    );
  };

  const itemTemplate = (recipe, layout, index) => {
    if (!recipe) return;

    if (layout === 'list') return listItem(recipe, index);
    else if (layout === 'grid') return gridItem(recipe);
  };

  const listTemplate = (recipes, layout) => {
    return <div className="grid grid-nogutter">{recipes.map((recipe, index) => itemTemplate(recipe, layout, index))}</div>;
  };

  const Header = () => {
    return (
      <div className='flex justify-content-between'>
        <h1>Recipes</h1>
        <div className="flex justify-content-end align-items-center">
          <Button className="mr-2" icon="pi pi-list" aria-label="List" severity={layout === 'list' ? "primary" : "secondary"} outlined={layout !== 'list'} onClick={() => setLayout('list')} />
          <Button icon="pi pi-th-large" aria-label="Grid" severity={layout === 'grid' ? "primary" : "secondary"} outlined={layout !== 'grid'} onClick={() => setLayout('grid')} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <DataView 
        value={recipes} 
        layout={layout} 
        listTemplate={listTemplate} 
        totalRecords={totalPages}
        pt={{
          content: { style: { background: 'transparent', border: 0, padding: 0 } },
        }}
      />

      <div className="card round-border-lg shadow-1 my-3">
        <Paginator first={first} rows={rows} totalRecords={totalPages} onPageChange={onPageChange} />
      </div>

      <ScrollTop />
    </div>
  );
};

export default Page;
