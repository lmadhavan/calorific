import MacroPlan from './MacroPlan.js';
import MacroCounter from './MacroCounter.js';

export default class Application {
    constructor() {
        this._plan = new MacroPlan();
        this._plan.calories = 2000;
        this._plan.carbsPercent = 50;
        this._plan.fatPercent = 30;
        this._plan.proteinPercent = 20;

        this._counter = new MacroCounter(this._plan);
    }

    init() {
        this._bindPlanField($('#calorie-target'), 'calories');
        this._bindPlanField($('#carbs-target'), 'carbsPercent');
        this._bindPlanField($('#protein-target'), 'proteinPercent');
        this._bindPlanField($('#fat-target'), 'fatPercent');

        this._bindCounter($('#calorie-counter'), 'calories', +100, -50);
        this._bindCounter($('#protein-counter'), 'proteinGrams', +10, -5);
        this._bindCounter($('#fat-counter'), 'fatGrams', +10, -5);

        this._updatePlanFields();
        this._updateCounters();
    }

    _bindPlanField($field, property) {
        $field.val(this._plan[property]);
        $field.change(() => {
            this._plan[property] = Number($field.val());
            this._updatePlanFields();
            this._updateCounters();
        });
    }

    _updatePlanFields() {
        $('#carbs-target-grams').text(formatGrams(this._plan.carbsGrams));
        $('#fat-target-grams').text(formatGrams(this._plan.fatGrams));
        $('#protein-target-grams').text(formatGrams(this._plan.proteinGrams));

        toggleWarning($('#invalid-macros-warning'), !this._plan.isValid);
    }

    _bindCounter($counter, property, increment, decrement) {
        $counter.find('.counter-increment').click(() => {
            this._counter[property] += Math.abs(increment);
            this._updateCounters();
        });
        $counter.find('.counter-decrement').click(() => {
            this._counter[property] = Math.max(0, this._counter[property] - Math.abs(decrement));
            this._updateCounters();
        });
    }

    _updateCounters() {
        $('#calorie-counter .counter-label').text(this._counter.calories);
        setProgress($('#calorie-counter .counter-percent'), this._counter.caloriesTargetPercent, this._counter.caloriesTargetPercent);

        $('#carbs-counter .counter-label').text(formatGrams(this._counter.carbsGrams));
        setProgress($('#carbs-counter .counter-percent'), this._counter.carbsTargetPercent, this._counter.caloriesTargetPercent);

        $('#fat-counter .counter-label').text(formatGrams(this._counter.fatGrams));
        setProgress($('#fat-counter .counter-percent'), this._counter.fatTargetPercent, this._counter.caloriesTargetPercent);

        $('#protein-counter .counter-label').text(formatGrams(this._counter.proteinGrams));
        setProgress($('#protein-counter .counter-percent'), this._counter.proteinTargetPercent, this._counter.caloriesTargetPercent);

        toggleWarning($('#invalid-calories-warning'), !this._counter.isValid);
    }
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
