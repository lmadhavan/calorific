import * as MacroConstants from './MacroConstants.js';

/** Defines daily targets for calories and macros. */
export default class MacroPlan {
    constructor() {
        this._calories = 0;
        this._carbsPercent = 0;
        this._fatPercent = 0;
        this._proteinPercent = 0;
    }

    get calories() {
        return this._calories;
    }

    set calories(value) {
        this._calories = value;
    }

    get carbsPercent() {
        return this._carbsPercent;
    }

    set carbsPercent(value) {
        this._carbsPercent = value;
    }

    get fatPercent() {
        return this._fatPercent;
    }

    set fatPercent(value) {
        this._fatPercent = value;
    }

    get proteinPercent() {
        return this._proteinPercent;
    }

    set proteinPercent(value) {
        this._proteinPercent = value;
    }

    get carbsGrams() {
        return this._computeGrams(this._carbsPercent, MacroConstants.CALORIES_PER_GRAM_CARBS);
    }

    get fatGrams() {
        return this._computeGrams(this._fatPercent, MacroConstants.CALORIES_PER_GRAM_FAT);
    }

    get proteinGrams() {
        return this._computeGrams(this._proteinPercent, MacroConstants.CALORIES_PER_GRAM_PROTEIN);
    }

    get isValid() {
        return this._carbsPercent + this._fatPercent + this._proteinPercent == 100;
    }

    _computeGrams(percent, caloriesPerGram) {
        return Math.floor(this._calories * (percent / 100) / caloriesPerGram);
    }

    toJSON() {
        return JSON.stringify({
            calories: this._calories,
            carbsPercent: this._carbsPercent,
            fatPercent: this._fatPercent,
            proteinPercent: this._proteinPercent
		});
	}

    static fromJSON(json) {
        let data = JSON.parse(json);

        let plan = new MacroPlan();
        plan._calories = data.calories;
        plan._carbsPercent = data.carbsPercent;
        plan._fatPercent = data.fatPercent;
        plan._proteinPercent = data.proteinPercent;
        return plan;
	}
}