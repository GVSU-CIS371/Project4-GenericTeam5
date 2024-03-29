<template>
  <div>
    <Beverage
      :isIced="currentTemp === 'Cold'"
      :creamer="currentCreamer"
      :syrup="currentSyrup"
      :beverage="currentBeverage"
    />
    <div class="button-row">
      <!-- Button for Temperature -->
      <div class="dropdown">
        <button class="dropbtn">Temperature</button>
        <div class="dropdown-content">
          <template v-for="temp in temps" :key="temp">
            <label>
              <input
                type="radio"
                :id="`rtemp${temp}`"
                :value="temp"
                v-model="currentTemp"
              />
              {{ temp }}
            </label>
          </template>
        </div>
      </div>
      <!-- Button for Creamer -->
      <div class="dropdown">
        <button class="dropbtn">Creamer</button>
        <div class="dropdown-content">
          <template v-for="creamer in creamers" :key="creamer">
            <label>
              <input
                type="radio"
                :id="`rcreamer${creamer}`"
                :value="creamer"
                v-model="currentCreamer"
              />
              {{ creamer }}
            </label>
          </template>
        </div>
      </div>
      <!-- Button for Syrups -->
      <div class="dropdown">
        <button class="dropbtn">Syrups</button>
        <div class="dropdown-content">
          <template v-for="syrup in syrups" :key="syrup">
            <label>
              <input
                type="radio"
                :id="`rsyrup${syrup}`"
                :value="syrup"
                v-model="currentSyrup"
              />
              {{ syrup }}
            </label>
          </template>
        </div>
      </div>
      <!-- Button for Base Beverage -->
      <div class="dropdown">
        <button class="dropbtn">Base Beverage</button>
        <div class="dropdown-content">
          <template v-for="baseBeverage in baseBeverages" :key="baseBeverage">
            <label>
              <input
                type="radio"
                :id="`rbase${baseBeverage}`"
                :value="baseBeverage"
                v-model="currentBeverage"
              />
              {{ baseBeverage }}
            </label>
          </template>
        </div>
      </div>
    </div>
    <!-- Form to enter name and save choices -->
    <form @submit.prevent="makeBeverage">
      <input type="text" v-model="name" placeholder="Enter Name">
      <button type="submit">Make Beverage</button>
    </form>

    <!-- Display saved recipes -->
    <div v-if="recipes.length > 0">
      <h3>Saved Items:</h3>
      <ul>
        <li v-for="(recipe, index) in recipes" :key="index" @click="toggleSelection(recipe)" :class="{ 'selected': recipe.selected }" class="saved-item">
          <span>{{ recipe.name }}</span>
        </li>
      </ul>
    </div>

    <!-- Display selected beverage -->
    <div v-if="selectedRecipe">
      <h3>Selected Beverage:</h3>
      <!-- Display the selected beverage based on the selectedRecipe -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Beverage from "./components/Beverage.vue";
// Define reactive data
const temps = ref(["Hot", "Cold"]);
const currentTemp = ref("Hot");
const creamers = ref(["None", "Milk", "Cream", "Half & Half"]);
const currentCreamer = ref("None");
const syrups = ref(["None", "Vanilla", "Caramel", "Hazelnut"]);
const currentSyrup = ref("None");
const baseBeverages = ref(["Coffee", "Green Tea", "Black Tea"]);
const currentBeverage = ref("Coffee");

// Define reactive data
const name = ref('');
//const selectedChoices = ref({});
import { useBeverageStore } from './store';

const beverageStore = useBeverageStore();

const makeBeverage = () => {
  // Get current selections
  const currentTemp = beverageStore.currentTemp;
  const currentCreamer = beverageStore.currentCreamer;
  const currentSyrup = beverageStore.currentSyrup;
  const currentBeverage = beverageStore.currentBeverage;

  // Save selections as a recipe
  const recipe = {
    name: name.value,
    currentTemp,
    currentCreamer,
    currentSyrup,
    currentBeverage,
  };
  beverageStore.addRecipe(recipe);

  // Clear the name input
  name.value = '';
};

const showBeverage = (recipe) => {
  beverageStore.setSelectedRecipe(recipe);
};

const recipes = beverageStore.recipes;
const selectedRecipe = beverageStore.selectedRecipe;

const toggleSelection = (recipe) => {
  // Deselect all recipes
  recipes.forEach((r) => {
    r.selected = false;
  });

  // Toggle the 'selected' property of the clicked recipe
  recipe.selected = true;

  // Update current selections
  beverageStore.currentTemp = recipe.currentTemp;
  beverageStore.currentCreamer = recipe.currentCreamer;
  beverageStore.currentSyrup = recipe.currentSyrup;
  beverageStore.currentBeverage = recipe.currentBeverage;
  recipe.setSelectedRecipe(selectedRecipe)
};

const showRecipeDetails = (recipe) => {
  // Show the corresponding beverage details
  // Update current selections
  currentTemp.value = recipe.currentTemp;
  currentCreamer.value = recipe.currentCreamer;
  currentSyrup.value = recipe.currentSyrup;
  currentBeverage.value = recipe.currentBeverage;
};
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.toggle-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: transparent;
  cursor: pointer;
  margin-right: 10px; /* Add some margin between the button and recipe name */
}

.toggle-button.selected {
  background-color: #4caf50; /* Change background color when selected */
}

/* Dropdown button on hover & focus */
.dropbtn:hover, .dropbtn:focus {
  background-color: #3e8e41;
}

/* The container <div> - needed to position the dropdown content */
  .dropdown {
  position: relative;
  display: inline-block;
  margin-right: 10px; /* Add some margin between buttons */
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content label {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content label:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

/* Container for the button row */
.button-row {
  display: flex; /* Arrange buttons in a row */
}

/* Custom button styling? */
.custom-button {
  /* Apply the styles you provided */
  --fa-style-family-brands: "Font Awesome 6 Brands";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-style-family-classic: "Font Awesome 6 Free";
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  align-items: center;
  border-radius: 4px;
  display: inline-grid;
  grid-template-areas: "prepend content append";
  grid-template-columns: max-content auto max-content;
  font-weight: 500;
  justify-content: center;
  letter-spacing: .0892857143em;
  line-height: normal;
  max-width: 100%;
  outline: none;
  position: relative;
  text-decoration: none;
  text-indent: .0892857143em;
  text-transform: uppercase;
  transition-property: box-shadow,transform,opacity,background;
  transition-duration: .28s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  user-select: none;
  vertical-align: middle;
  flex-shrink: 0;
  border-color: rgba(var(--v-border-color),var(--v-border-opacity));
  border-style: solid;
  border-width: 0;
  --v-btn-size: .875rem;
  --v-btn-height: 36px;
  font-size: var(--v-btn-size);
  min-width: 64px;
  padding: 0 16px;
  background: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
  height: calc(var(--v-btn-height) + 0px);
}

.saved-item:hover {
  cursor: pointer;
}

</style>
