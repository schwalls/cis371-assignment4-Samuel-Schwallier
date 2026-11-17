
<template>
  <main class="app-shell">
    <h1>Brew & Save</h1>

    <Beverage
      :isIced="beverageStore.currentTemp === 'Cold'"
      :base="beverageStore.selectedBase"
      :creamer="beverageStore.selectedCreamer"
      :syrup="beverageStore.selectedSyrup"
    />

    <div class="drink-options">
      <div class="option-row">
        <label
          v-for="temp in beverageStore.temps"
          :key="temp"
        >
          <input
            type="radio"
            name="temperature"
            :value="temp"
            v-model="beverageStore.currentTemp"
          />
          {{ temp }}
        </label>
      </div>

      <div class="option-row">
        <label
          v-for="base in beverageStore.bases"
          :key="base.id"
        >
          <input
            type="radio"
            name="base"
            :value="base"
            v-model="beverageStore.selectedBase"
          />
          {{ base.name }}
        </label>
      </div>

      <div class="option-row">
        <label
          v-for="creamer in beverageStore.creamers"
          :key="creamer.id"
        >
          <input
            type="radio"
            name="creamer"
            :value="creamer"
            v-model="beverageStore.selectedCreamer"
          />
          {{ creamer.name }}
        </label>
      </div>

      <div class="option-row">
        <label
          v-for="syrup in beverageStore.syrups"
          :key="syrup.id"
        >
          <input
            type="radio"
            name="syrup"
            :value="syrup"
            v-model="beverageStore.selectedSyrup"
          />
          {{ syrup.name }}
        </label>
      </div>
    </div>

    <div class="save-section">
      <label for="beverage-name">Name</label>
      <input
        id="beverage-name"
        type="text"
        v-model="beverageStore.beverageName"
        placeholder="Enter beverage name"
      />

      <button
        type="button"
        @click="beverageStore.makeBeverage()"
      >
        Make Beverage
      </button>
    </div>

    <div id="beverage-container">
      <h2>Saved Beverages</h2>

      <p v-if="beverageStore.savedBeverages.length === 0">
        No beverages saved yet.
      </p>

      <button
        v-for="beverage in beverageStore.savedBeverages"
        :key="beverage.id"
        type="button"
        class="saved-button"
        :class="{
          active: beverageStore.selectedBeverageId === beverage.id
        }"
        @click="beverageStore.showBeverage(beverage.id)"
      >
        {{ beverage.name }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();
</script>

<style lang="scss">
body,
html {
  min-height: 100%;
  margin: 0;
  background: linear-gradient(
    to bottom,
    #6e4228 0%,
    #956f5a 100%
  );
}

.app-shell {
  text-align: center;
  padding: 30px 15px;
  color: white;
}

.drink-options {
  margin-top: 20px;
}

.option-row {
  margin: 12px 0;
}

.option-row label {
  display: inline-block;
  margin: 6px 12px;
  cursor: pointer;
}

.save-section {
  margin-top: 30px;
}

.save-section input {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background: #f5e6d3;
  cursor: pointer;
}

button:hover {
  background: #d9c3a9;
}

#beverage-container {
  margin-top: 30px;
}

.saved-button.active {
  background: #f5bb58;
  font-weight: bold;
}
</style>
