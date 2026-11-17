
import { defineStore } from "pinia";

import temperatures from "../data/tempretures.json";
import basesData from "../data/bases.json";
import creamersData from "../data/creamers.json";
import syrupsData from "../data/syrups.json";

export interface Ingredient {
  id: string;
  name: string;
  color: string;
}

export type BaseBeverageType = Ingredient;
export type CreamerType = Ingredient;
export type SyrupType = Ingredient;

export interface SavedBeverage {
  id: number;
  name: string;
  temperature: string;
  base: BaseBeverageType;
  creamer: CreamerType;
  syrup: SyrupType;
}

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: temperatures,
    bases: basesData,
    creamers: creamersData,
    syrups: syrupsData,

    currentTemp: temperatures[0],
    selectedBase: basesData[0],
    selectedCreamer: creamersData[0],
    selectedSyrup: syrupsData[0],

    beverageName: "",
    savedBeverages: [] as SavedBeverage[],
    selectedBeverageId: null as number | null,
    nextId: 1,
  }),

  actions: {
    makeBeverage() {
      const name = this.beverageName.trim();

      if (!name) {
        alert("Please enter a beverage name.");
        return;
      }

      const beverage: SavedBeverage = {
        id: this.nextId++,
        name,
        temperature: this.currentTemp,
        base: { ...this.selectedBase },
        creamer: { ...this.selectedCreamer },
        syrup: { ...this.selectedSyrup },
      };

      this.savedBeverages.push(beverage);
      this.selectedBeverageId = beverage.id;
      this.beverageName = "";
    },

    showBeverage(id: number) {
      const beverage = this.savedBeverages.find(
        (item) => item.id === id
      );

      if (!beverage) return;

      this.selectedBeverageId = beverage.id;
      this.currentTemp = beverage.temperature;

      this.selectedBase =
        this.bases.find(
          (base) => base.id === beverage.base.id
        ) ?? this.bases[0];

      this.selectedCreamer =
        this.creamers.find(
          (creamer) => creamer.id === beverage.creamer.id
        ) ?? this.creamers[0];

      this.selectedSyrup =
        this.syrups.find(
          (syrup) => syrup.id === beverage.syrup.id
        ) ?? this.syrups[0];
    },
  },

  persist: true,
});
