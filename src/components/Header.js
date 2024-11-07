
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';

export default function TemplateDemo() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const onSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/recipes?q=${query}`);
  }

  const items = [
    {
      label: 'Categories',
      icon: 'pi pi-tags',
      items: [
        [
          {
            label: 'Living Room',
            items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
          }
        ],
        [
          {
            label: 'Kitchen',
            items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
          },
          {
            label: 'Bathroom',
            items: [{ label: 'Accessories' }]
          }
        ],
        [
          {
            label: 'Bedroom',
            items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
          }
        ],
        [
          {
            label: 'Office',
            items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
          }
        ]
      ]
    },
  ];

  const start = <h1 className='m-0 mr-2'>Next Recipes</h1>;

  const end = (
    <div className="flex align-items-center gap-2">
      <form onSubmit={onSearchSubmit}>
        <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto border-round-3xl" value={query} onChange={e => setQuery(e.target.value)}/>
      </form>
    </div>
  );

  return (
    <div className="card">
      <MegaMenu className='bg-white shadow-2' model={items} start={start} end={end} />
    </div>
  )
}
