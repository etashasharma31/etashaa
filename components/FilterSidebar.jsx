import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FilterSidebar = ({ 
  selectedPriceRanges, 
  setSelectedPriceRanges,
  selectedCategories,
  setSelectedCategories,
  selectedAvailability,
  setSelectedAvailability,
  selectedBrands,
  setSelectedBrands,
  clearAllFilters,
  priceRanges = ['Under ₹ 1,50,000', '₹ 1,50,000 - ₹ 2,00,000', '₹ 2,00,000+'],
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleFilter = (list, setList, item, sectionTitle) => {
    // Special handling for Category navigation
    if (sectionTitle === 'Category') {
      if (item === 'Bridal') navigate('/bridal-collection');
      if (item === 'Non-Bridal') navigate('/non-bridal-collection');
      if (item === 'Saree') navigate('/saree-collection');
      return;
    }

    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const isCategoryActive = (item) => {
    if (item === 'Bridal') return location.pathname === '/bridal-collection';
    if (item === 'Non-Bridal') return location.pathname === '/non-bridal-collection';
    if (item === 'Saree') return location.pathname === '/saree-collection';
    return selectedCategories?.includes(item);
  };

  const filterSections = [
    {
      title: 'Price Range',
      type: 'checkbox',
      items: priceRanges,
      selected: selectedPriceRanges,
      setter: setSelectedPriceRanges
    },
    {
      title: 'Category',
      type: 'checkbox',
      items: ['Bridal', 'Non-Bridal', 'Saree'],
      selected: selectedCategories,
      setter: setSelectedCategories
    },
    {
      title: 'Availability',
      type: 'checkbox',
      items: ['In Stock', 'Ready to Ship', 'Custom Order'],
      selected: selectedAvailability,
      setter: setSelectedAvailability
    },
    {
      title: 'Brand',
      type: 'checkbox',
      items: ['Etashaa Heritage', 'Couture Edition', 'Artisan Series'],
      selected: selectedBrands,
      setter: setSelectedBrands
    }
  ];

  return (
    <aside className={`filter-sidebar ${className}`}>
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <h3 className="font-noto-serif text-lg">Refine</h3>
          <button 
            className="text-[10px] uppercase tracking-widest text-primary font-bold hover:text-secondary transition-colors"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
        
        {filterSections.map((section) => (
          <div key={section.title} className="reveal">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-outline mb-5 font-bold">{section.title}</p>
            <div className="space-y-4">
              {section.items.map((item) => {
                const isActive = section.title === 'Category' ? isCategoryActive(item) : section.selected?.includes(item);
                return (
                  <label key={item} className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        className="peer appearance-none w-5 h-5 border border-outline-variant/50 text-primary focus:ring-0 rounded-none bg-transparent transition-all checked:bg-primary checked:border-primary" 
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleFilter(section.selected, section.setter, item, section.title)}
                      />
                      <span className="material-symbols-outlined absolute inset-0 text-white text-[16px] flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                    </div>
                    <span className={`text-xs uppercase tracking-widest transition-colors ${isActive ? 'text-primary font-bold' : 'text-on-surface/60 group-hover:text-primary'}`}>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
