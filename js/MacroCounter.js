import * as MacroConstants from './MacroConstants.js';

/** Tracks actual calories and macros. */
export default class MacroCounter {
    constructor() {
        this._calories = 0;
        this._fatGrams = 0;
        this._proteinGrams = 0;
    }

    get calories() {
        return this._calories;
    }

    set calories(value) {
        this._calories = value;
    }

    caloriesTargetPercent(plan) {
        return this._toPercent(this.calories / plan.calories);
    }

    get carbsGrams() {
        return this.carbsCalories / MacroConstants.CALORIES_PER_GRAM_CARBS;
    }

    get carbsCalories() {
        return this.calories - this.fatCalories - this.proteinCalories;
    }

    carbsTargetPercent(plan) {
        return this._toPercent(this.carbsGrams / plan.carbsGrams);
    }

    get fatGrams() {
        return this._fatGrams;
    }

    set fatGrams(value) {
        this._fatGrams = value;
    }

    get fatCalories() {
        return this._fatGrams * MacroConstants.CALORIES_PER_GRAM_FAT;
    }

    fatTargetPercent(plan) {
        return this._toPercent(this.fatGrams / plan.fatGrams);
    }

    get proteinGrams() {
        return this._proteinGrams;
    }

    set proteinGrams(value) {
        this._proteinGrams = value;
    }

    get proteinCalories() {
        return this._proteinGrams * MacroConstants.CALORIES_PER_GRAM_PROTEIN;
    }

    proteinTargetPercent(plan) {
        return this._toPercent(this.proteinGrams / plan.proteinGrams);
    }

    get isValid() {
        return this.carbsCalories >= 0;
    }

    _toPercent(value) {
        return Math.floor(value * 100);
    }

    toJSON() {
        return JSON.stringify({
            calories: this._calories,
            fatGrams: this._fatGrams,
            proteinGrams: this._proteinGrams
		});
	}

    static fromJSON(json) {
        let data = JSON.parse(json);
        
        let counter = new MacroCounter();
        counter._calories = data.calories;
        counter._fatGrams = data.fatGrams;
        counter._proteinGrams = data.proteinGrams;
        return counter;
	}
}
