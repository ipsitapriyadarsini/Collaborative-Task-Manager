'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  [key: string]: string | undefined; // To support dynamic access like strIngredient1, etc.
}

const fetchRecipes = async (search: string): Promise<Recipe[]> => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const { data } = await axios.get(url);
  return data.meals || [];
};

const getIngredientsList = (recipe: Recipe): string[] => {
  return Array.from({ length: 20 }, (_, i) => {
    const ing = recipe[`strIngredient${i + 1}`];
    const meas = recipe[`strMeasure${i + 1}`];
    return ing ? `${meas ?? ''} ${ing}`.trim() : null;
  }).filter(Boolean) as string[];
};

export default function RecipePage() {
  const [search, setSearch] = useState('');

  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useQuery<Recipe[], Error>({
    queryKey: ['recipes', search],
    queryFn: () => fetchRecipes(search),
    keepPreviousData: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Recipe Collection
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {isError && (
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
            Error fetching recipes. Please try again later.
          </div>
        )}

        {!isLoading && recipes.length === 0 && (
          <div className="text-center text-gray-600 bg-gray-50 p-4 rounded-lg">
            No recipes found.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h3>
              <ul className="list-disc pl-4 text-sm text-gray-600 mb-4">
                {getIngredientsList(recipe).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Instructions:</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {recipe.strInstructions}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
