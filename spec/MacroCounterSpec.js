import MacroPlan from "../src/js/MacroPlan.js";
import MacroCounter from "../src/js/MacroCounter.js";

describe("MacroCounter", function() {
  var counter;

  beforeEach(function() {
    counter = new MacroCounter();
    counter.calories = 1000;
    counter.fatGrams = 20;
    counter.proteinGrams = 50;
  });

  it("calculates carbs from other inputs", function() {
    expect(counter.carbsGrams).toEqual(155);
  });

  it("calculates target percentages based on plan", function() {
    var plan = new MacroPlan();
    plan.calories = 2000;
    plan.carbsPercent = 50;
    plan.fatPercent = 30;
    plan.proteinPercent = 20;

    expect(counter.caloriesTargetPercent(plan)).withContext("% of target calories").toEqual(50);
    expect(counter.carbsTargetPercent(plan)).withContext("% of target carbs").toEqual(62);
    expect(counter.fatTargetPercent(plan)).withContext("% of target fat").toEqual(30);
    expect(counter.proteinTargetPercent(plan)).withContext("% of target protein").toEqual(50);
  });

  it("is valid when fat + protein <= total calories", function() {
    counter.calories = 1000;
    counter.fatGrams = 100;
    counter.proteinGrams = 25;

    expect(counter.isValid).toBeTrue();
  });

  it("is invalid when fat + protein > total calories", function() {
    counter.calories = 1000;
    counter.fatGrams = 500;

    expect(counter.isValid).toBeFalse();
  });

  it("converts to and from JSON", function() {
    var json = counter.toJSON();
    var newCounter = MacroCounter.fromJSON(json);

    expect(newCounter.calories).toEqual(counter.calories);
    expect(newCounter.fatGrams).toEqual(counter.fatGrams);
    expect(newCounter.proteinGrams).toEqual(counter.proteinGrams);
  });
});
