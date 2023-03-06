import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { items as defaultItems } from './items';
import './style.css';

export default function MultipleFilters() {
  let filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];

  const [items, setItems] = useState(defaultItems);
  const [activeFilters, setActiveFilters] = useState(
    filters.map((f) => ({
      name: f,
      isActive: true,
    }))
  );

  const handleOnClickFilterButton = (filter) => {
    const updatedFilters = activeFilters.map((f) =>
      f.name === filter.name ? { ...f, isActive: !f.isActive } : f
    );
    setActiveFilters(updatedFilters);
  };

  useEffect(() => {
    //update items list state whenever filter is udpated
    filterItems();
  }, [activeFilters]);

  const filterItems = () => {
    if (activeFilters.filter((f) => f.isActive === true).length === 0) {
      return;
    } else {
      const activeFitlerList = activeFilters
        .filter((f) => f.isActive === true)
        .map((e) => e.name);
      const filteredItems = defaultItems.filter(
        (item) => activeFitlerList.indexOf(item.category) !== -1
      );
      setItems(filteredItems);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Algochurn Filters</h2>
      <div className="buttons-container">
        {activeFilters.map((el, idx) => (
          <button
            className={`button ${el.isActive === true ? 'active' : ''}`}
            key={`filters-${idx}`}
            onClick={() => handleOnClickFilterButton(el)}
          >
            {el.name}
          </button>
        ))}
      </div>
      <div className="items-container">
        {items.map((item, idx) => (
          <div key={`items-${idx}`} className="item">
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
