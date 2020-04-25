import MacroPlan from "../src/js/MacroPlan.js";

describe("MacroPlan", function() {
  var plan;

  beforeEach(function() {
    plan = new MacroPlan();
  });

  it("calculates macro grams from calories and macro percentages", function() {
    plan.calories = 2000;
    plan.carbsPercent = 50;
    plan.fatPercent = 30;
    plan.proteinPercent = 20;

    expect(plan.carbsGrams).withContext("carbs").toEqual(250);
    expect(plan.fatGrams).withContext("fat").toEqual(66);
    expect(plan.proteinGrams).withContext("protein").toEqual(100);
  });

  it("is valid when macro percentages add up to 100", function() {
    plan.carbsPercent = 50;
    plan.fatPercent = 30;
    plan.proteinPercent = 20;

    expect(plan.isValid).toBeTrue();
  });

  it("is invalid when macro percentages do not add up to 100", function() {
    plan.carbsPercent = 25;
    plan.fatPercent = 25;
    plan.proteinPercent = 25;

    expect(plan.isValid).toBeFalse();
  });
});
