// store.js
import { defineStore } from 'pinia';

export const useBeverageStore = defineStore('beverage', {
  state: () => ({
    recipes: [],
    selectedRecipe: null,
  }),
  actions: {
    addRecipe(recipe) {
      this.recipes.push(recipe);
    },
    setSelectedRecipe(recipe) {
      this.selectedRecipe = recipe;
    },
    clearSelectedRecipe() {
      this.selectedRecipe = null;
    },
  },
});
