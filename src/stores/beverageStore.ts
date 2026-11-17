import { defineStore } from "pinia";

import temperatures from "../data/tempretures.json";
import basesData from "../data/bases.json";
import creamersData from "../data/creamers.json";
import syrupsData from "../data/syrups.json";

export interface BaseBeverageType {
  id: string;
  name: string;
  color: string;
}

export interface CreamerType {
  id: string;
  name: string;
  color: string;
}

export interface SyrupType {
  id: string;
  name: string;
  color: string;
}

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
    currentTemp: temperatures[1],

    bases: basesData,
    creamers: creamersData,
    syrups: syrupsData,

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

      const newBeverage: SavedBeverage = {
        id: this.nextId++,
        name,
        temperature: this.currentTemp,
        base: { ...this.selectedBase },
        creamer: { ...this.selectedCreamer },
        syrup: { ...this.selectedSyrup },
      };

      this.savedBeverages.push(newBeverage);
      this.selectedBeverageId = newBeverage.id;
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
          (item) => item.id === beverage.base.id
        ) ?? this.bases[0];

      this.selectedCreamer =
        this.creamers.find(
          (item) => item.id === beverage.creamer.id
        ) ?? this.creamers[0];

      this.selectedSyrup =
        this.syrups.find(
          (item) => item.id === beverage.syrup.id
        ) ?? this.syrups[0];
    },
  },

  persist: true,
});
