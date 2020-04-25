import * as MacroConstants from './MacroConstants.js';

/** Tracks actual calories and macros against a target plan. */
export default class MacroCounter {
    constructor(plan) {
        this._plan = plan;
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

    get caloriesTargetPercent() {
        return this._toPercent(this.calories / this._plan.calories);
    }

    get carbsGrams() {
        return this.carbsCalories / MacroConstants.CALORIES_PER_GRAM_CARBS;
    }

    get carbsCalories() {
        return this.calories - this.fatCalories - this.proteinCalories;
    }

    get carbsTargetPercent() {
        return this._toPercent(this.carbsGrams / this._plan.carbsGrams);
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

    get fatTargetPercent() {
        return this._toPercent(this.fatGrams / this._plan.fatGrams);
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

    get proteinTargetPercent() {
        return this._toPercent(this.proteinGrams / this._plan.proteinGrams);
    }

    get isValid() {
        return this.carbsCalories >= 0;
    }

    _toPercent(value) {
        return Math.floor(value * 100);
    }
}
