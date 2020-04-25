import MacroPlan from './MacroPlan.js';
import MacroCounter from './MacroCounter.js';

export default class Application {
    constructor() {
        this._plan = loadPlan() || defaultPlan();
        this._counter = loadCounter() || new MacroCounter();
    }

    init() {
        this._bindPlanField($('#calorie-target'), 'calories');
        this._bindPlanField($('#carbs-target'), 'carbsPercent');
        this._bindPlanField($('#protein-target'), 'proteinPercent');
        this._bindPlanField($('#fat-target'), 'fatPercent');

        this._bindCounter($('#calorie-counter'), 'calories', +100, -50);
        this._bindCounter($('#protein-counter'), 'proteinGrams', +10, -5);
        this._bindCounter($('#fat-counter'), 'fatGrams', +10, -5);

        $('#reset-counters-button').click(() => {
            this._counter = new MacroCounter();
            saveCounter(this._counter);

            this._updateCounterUI();
		});

        this._updatePlanUI();
        this._updateCounterUI();
    }

    _bindPlanField($field, property) {
        $field.val(this._plan[property]);
        $field.change(() => {
            this._plan[property] = Number($field.val());
            savePlan(this._plan);

            this._updatePlanUI();
            this._updateCounterUI();
        });
    }

    _updatePlanUI() {
        $('#carbs-target-grams').text(formatGrams(this._plan.carbsGrams));
        $('#fat-target-grams').text(formatGrams(this._plan.fatGrams));
        $('#protein-target-grams').text(formatGrams(this._plan.proteinGrams));

        toggleWarning($('#invalid-macros-warning'), !this._plan.isValid);
    }

    _bindCounter($counter, property, increment, decrement) {
        $counter.find('.counter-increment').click(() => {
            this._counter[property] += Math.abs(increment);
            saveCounter(this._counter);

            this._updateCounterUI();
        });
        $counter.find('.counter-decrement').click(() => {
            this._counter[property] = Math.max(0, this._counter[property] - Math.abs(decrement));
            saveCounter(this._counter);

            this._updateCounterUI();
        });
    }

    _updateCounterUI() {
        $('#calorie-counter .counter-label').text(this._counter.calories);
        setProgress($('#calorie-counter .counter-percent'), this._counter.caloriesTargetPercent(this._plan), this._counter.caloriesTargetPercent(this._plan));

        $('#carbs-counter .counter-label').text(formatGrams(this._counter.carbsGrams));
        setProgress($('#carbs-counter .counter-percent'), this._counter.carbsTargetPercent(this._plan), this._counter.caloriesTargetPercent(this._plan));

        $('#fat-counter .counter-label').text(formatGrams(this._counter.fatGrams));
        setProgress($('#fat-counter .counter-percent'), this._counter.fatTargetPercent(this._plan), this._counter.caloriesTargetPercent(this._plan));

        $('#protein-counter .counter-label').text(formatGrams(this._counter.proteinGrams));
        setProgress($('#protein-counter .counter-percent'), this._counter.proteinTargetPercent(this._plan), this._counter.caloriesTargetPercent(this._plan));

        toggleWarning($('#invalid-calories-warning'), !this._counter.isValid);
    }
}

function loadPlan() {
    let json = window.localStorage.getItem('plan');
    if (json) {
        return MacroPlan.fromJSON(json);
	}
}

function savePlan(plan) {
    window.localStorage.setItem('plan', plan.toJSON());
}

function defaultPlan() {
    let plan = new MacroPlan();
    plan.calories = 2000;
    plan.carbsPercent = 50;
    plan.fatPercent = 30;
    plan.proteinPercent = 20;
    return plan;
}

function loadCounter() {
    let json = window.localStorage.getItem('counter');
    if (json) {
        return MacroCounter.fromJSON(json);
	}
}

function saveCounter(counter) {
    window.localStorage.setItem('counter', counter.toJSON());
}

function formatGrams(grams) {
    return grams + 'g';
}

function setProgress($progressBar, value, idealValue) {
    $progressBar.css('width', value + '%');

    $progressBar.removeClass('bg-success').removeClass('bg-warning').removeClass('bg-danger');

    if (value > 100) {
        $progressBar.addClass('bg-danger');
    } else if (Math.abs(value - idealValue) < 10) {
        $progressBar.addClass('bg-success');
    } else {
        $progressBar.addClass('bg-warning');
    }
}

function toggleWarning($element, showWarning) {
    if (showWarning) {
        $element.show();
    } else {
        $element.hide();
    }
}
