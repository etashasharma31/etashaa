import React from 'react';

const FilterSidebar = ({ 
  selectedPriceRanges, 
  setSelectedPriceRanges,
  selectedCategories,
  setSelectedCategories,
  selectedAvailability,
  setSelectedAvailability,
  selectedBrands,
  setSelectedBrands,
  clearAllFilters 
}) => {
  const toggleFilter = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const filterSections = [
    {
      title: 'Price Range',
      type: 'checkbox',
      items: ['Under ₹ 1,50,000', '₹ 1,50,000 - ₹ 2,00,000', '₹ 2,00,000+'],
      selected: selectedPriceRanges,
      setter: setSelectedPriceRanges
    },
    {
      title: 'Category',
      type: 'checkbox',
      items: ['Bridal', 'Non-Bridal', 'Saree', 'The Edit'],
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
    <aside className="w-full md:w-60 self-start sticky top-24">
      <div className="space-y-8">
        <h3 className="font-noto-serif text-lg mb-6 border-b border-outline-variant/20 pb-2 flex items-center justify-between">
          Refine Search 
          <span 
            className="text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:text-secondary transition-colors"
            onClick={clearAllFilters}
          >
            Clear All
          </span>
        </h3>
        
        {filterSections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-4">{section.title}</p>
            <div className="space-y-2">
              {section.items.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    className="w-4 h-4 border-outline text-primary focus:ring-0 rounded-none bg-transparent" 
                    type="checkbox"
                    checked={section.selected?.includes(item)}
                    onChange={() => toggleFilter(section.selected, section.setter, item)}
                  />
                  <span className={`text-sm font-light transition-colors ${section.selected?.includes(item) ? 'text-primary' : 'text-on-surface/80 group-hover:text-primary'}`}>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
