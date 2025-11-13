import React, { createContext, useContext, useState } from 'react';

export type Category = 'Starters' | 'Mains' | 'Desserts';

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: Category;
}

interface MenuContextType {
  starters: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
  visibleCategories: Category[];
  addItem: (item: MenuItem) => void;
  deleteItem: (category: Category, index: number) => void;
  toggleCategory: (category: Category) => void;
  resetFilters: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

//this function is responisble for ensuring data transfer form the ascreen to screen. what is done on one screen will reflect pn the other.

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [starters, setStarters] = useState<MenuItem[]>([]);
  const [mains, setMains] = useState<MenuItem[]>([]);
  const [desserts, setDesserts] = useState<MenuItem[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<Category[]>(['Starters', 'Mains', 'Desserts']);

  const addItem = (item: MenuItem) => {
    if (item.category === 'Starters') setStarters((prev) => [...prev, item]);
    if (item.category === 'Mains') setMains((prev) => [...prev, item]);
    if (item.category === 'Desserts') setDesserts((prev) => [...prev, item]);
  };

  const deleteItem = (category: Category, index: number) => {
    if (category === 'Starters') setStarters((prev) => prev.filter((_, i) => i !== index));
    if (category === 'Mains') setMains((prev) => prev.filter((_, i) => i !== index));
    if (category === 'Desserts') setDesserts((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCategory = (category: Category) => {
    setVisibleCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const resetFilters = () => {
    setVisibleCategories(['Starters', 'Mains', 'Desserts']);
  };

  return (
    <MenuContext.Provider
      value={{ starters, mains, desserts, visibleCategories, addItem, deleteItem, toggleCategory, resetFilters }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};