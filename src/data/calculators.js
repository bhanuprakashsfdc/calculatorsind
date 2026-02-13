// Calculator Categories Data
export const calculatorCategories = [
  {
    id: 'health',
    name: 'Health',
    slug: 'health',
    description: 'Calculate BMI, calorie intake, pregnancy due date, and more health-related calculators.',
    icon: '❤️',
    calculators: [
      { id: 'bmi-calculator', name: 'BMI Calculator', slug: 'bmi-calculator', description: 'Calculate your Body Mass Index' },
      { id: 'calorie-calculator', name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Calculate daily calorie needs' },
      { id: 'pregnancy-calculator', name: 'Pregnancy Calculator', slug: 'pregnancy-calculator', description: 'Calculate pregnancy due date' },
      { id: 'bmr-calculator', name: 'BMR Calculator', slug: 'bmr-calculator', description: 'Calculate Basal Metabolic Rate' },
      { id: 'body-fat-calculator', name: 'Body Fat Calculator', slug: 'body-fat-calculator', description: 'Calculate body fat percentage' },
      { id: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', slug: 'ideal-weight-calculator', description: 'Calculate ideal body weight' },
      { id: 'weight-gain-calculator', name: 'Weight Gain Calculator', slug: 'weight-gain-calculator', description: 'Calculate calorie needs for weight gain' },
      { id: 'weight-loss-calculator', name: 'Weight Loss Calculator', slug: 'weight-loss-calculator', description: 'Calculate calorie deficit for weight loss' },
    ]
  },
  {
    id: 'financial',
    name: 'Financial',
    slug: 'financial',
    description: 'Calculate loan payments, mortgage rates, investment returns, and more.',
    icon: '💰',
    calculators: [
      { id: 'loan-calculator', name: 'Loan Calculator', slug: 'loan-calculator', description: 'Calculate loan payments' },
      { id: 'mortgage-calculator', name: 'Mortgage Calculator', slug: 'mortgage-calculator', description: 'Calculate mortgage payments' },
      { id: 'investment-calculator', name: 'Investment Calculator', slug: 'investment-calculator', description: 'Calculate investment returns' },
      { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', slug: 'compound-interest-calculator', description: 'Calculate compound interest' },
      { id: 'retirement-calculator', name: 'Retirement Calculator', slug: 'retirement-calculator', description: 'Plan for retirement' },
      { id: 'car-payment-calculator', name: 'Car Payment Calculator', slug: 'car-payment-calculator', description: 'Calculate car loan payments' },
      { id: 'credit-card-calculator', name: 'Credit Card Calculator', slug: 'credit-card-calculator', description: 'Calculate credit card payoff' },
      { id: 'tax-calculator', name: 'Income Tax Calculator', slug: 'tax-calculator', description: 'Calculate income tax' },
      { id: 'salary-calculator', name: 'Salary Calculator', slug: 'salary-calculator', description: 'Convert between hourly and salary' },
      { id: 'profit-margin-calculator', name: 'Profit Margin Calculator', slug: 'profit-margin-calculator', description: 'Calculate profit margins' },
    ]
  },
  {
    id: 'math',
    name: 'Math',
    slug: 'math',
    description: 'Basic math operations, algebra, geometry, and more calculators.',
    icon: '🔢',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator', slug: 'percentage-calculator', description: 'Calculate percentages' },
      { id: 'fraction-calculator', name: 'Fraction Calculator', slug: 'fraction-calculator', description: 'Calculate with fractions' },
      { id: 'scientific-calculator', name: 'Scientific Calculator', slug: 'scientific-calculator', description: 'Advanced calculations' },
      { id: 'quadratic-calculator', name: 'Quadratic Calculator', slug: 'quadratic-calculator', description: 'Solve quadratic equations' },
      { id: 'area-calculator', name: 'Area Calculator', slug: 'area-calculator', description: 'Calculate areas of shapes' },
      { id: 'volume-calculator', name: 'Volume Calculator', slug: 'volume-calculator', description: 'Calculate volumes of shapes' },
      { id: 'circumference-calculator', name: 'Circumference Calculator', slug: 'circumference-calculator', description: 'Calculate circumference' },
      { id: 'pythagorean-calculator', name: 'Pythagorean Calculator', slug: 'pythagorean-calculator', description: 'Solve Pythagorean theorem' },
      { id: 'gcf-calculator', name: 'GCD/LCM Calculator', slug: 'gcf-calculator', description: 'Find GCD and LCM' },
      { id: 'random-number-generator', name: 'Random Number Generator', slug: 'random-number-generator', description: 'Generate random numbers' },
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness',
    slug: 'fitness',
    description: 'Calculate workout calories, body measurements, and fitness goals.',
    icon: '💪',
    calculators: [
      { id: 'one-rep-max-calculator', name: 'One Rep Max Calculator', slug: 'one-rep-max-calculator', description: 'Calculate 1RM for weightlifting' },
      { id: 'running-calculator', name: 'Running Calculator', slug: 'running-calculator', description: 'Calculate pace and distance' },
      { id: 'macro-calculator', name: 'Macro Calculator', slug: 'macro-calculator', description: 'Calculate macronutrients' },
      { id: 'water-intake-calculator', name: 'Water Intake Calculator', slug: 'water-intake-calculator', description: 'Calculate daily water needs' },
      { id: 'heart-rate-calculator', name: 'Heart Rate Calculator', slug: 'heart-rate-calculator', description: 'Calculate target heart rate' },
      { id: 'calories-burned-calculator', name: 'Calories Burned Calculator', slug: 'calories-burned-calculator', description: 'Calculate calories burned during exercise' },
      { id: 'body-type-calculator', name: 'Body Type Calculator', slug: 'body-type-calculator', description: 'Determine your body type' },
      { id: 'protein-calculator', name: 'Protein Calculator', slug: 'protein-calculator', description: 'Calculate daily protein needs' },
    ]
  },
  {
    id: 'time',
    name: 'Time & Date',
    slug: 'time',
    description: 'Calculate time differences, age, and date-related calculations.',
    icon: '⏰',
    calculators: [
      { id: 'age-calculator', name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate your age' },
      { id: 'date-calculator', name: 'Date Calculator', slug: 'date-calculator', description: 'Calculate date differences' },
      { id: 'time-card-calculator', name: 'Time Card Calculator', slug: 'time-card-calculator', description: 'Calculate work hours' },
      { id: 'hours-calculator', name: 'Hours Calculator', slug: 'hours-calculator', description: 'Calculate hours between times' },
      { id: 'day-of-week-calculator', name: 'Day of Week Calculator', slug: 'day-of-week-calculator', description: 'Find day of any date' },
      { id: 'time-zone-calculator', name: 'Time Zone Calculator', slug: 'time-zone-calculator', description: 'Convert between time zones' },
      { id: 'work-days-calculator', name: 'Work Days Calculator', slug: 'work-days-calculator', description: 'Calculate business days between dates' },
    ]
  },
  {
    id: 'conversion',
    name: 'Conversion',
    slug: 'conversion',
    description: 'Convert between units, currencies, and different measurement systems.',
    icon: '🔄',
    calculators: [
      { id: 'currency-converter', name: 'Currency Converter', slug: 'currency-converter', description: 'Convert currencies' },
      { id: 'unit-converter', name: 'Unit Converter', slug: 'unit-converter', description: 'Convert units of measurement' },
      { id: 'length-converter', name: 'Length Converter', slug: 'length-converter', description: 'Convert length units' },
      { id: 'weight-converter', name: 'Weight Converter', slug: 'weight-converter', description: 'Convert weight units' },
      { id: 'temperature-converter', name: 'Temperature Converter', slug: 'temperature-converter', description: 'Convert temperatures' },
      { id: 'height-converter', name: 'Height Converter', slug: 'height-converter', description: 'Convert height units' },
      { id: 'data-storage-converter', name: 'Data Storage Converter', slug: 'data-storage-converter', description: 'Convert data storage units' },
      { id: 'speed-converter', name: 'Speed Converter', slug: 'speed-converter', description: 'Convert speed units' },
      { id: 'fuel-economy-calculator', name: 'Fuel Economy Calculator', slug: 'fuel-economy-calculator', description: 'Calculate MPG and fuel costs' },
    ]
  },
  {
    id: 'cooking',
    name: 'Cooking',
    slug: 'cooking',
    description: 'Convert cooking measurements and recipe scales.',
    icon: '🍳',
    calculators: [
      { id: 'cooking-converter', name: 'Cooking Converter', slug: 'cooking-converter', description: 'Convert cooking measurements' },
      { id: 'recipe-scaler', name: 'Recipe Scaler', slug: 'recipe-scaler', description: 'Scale recipe ingredients' },
      { id: 'cup-to-gram-calculator', name: 'Cup to Gram Calculator', slug: 'cup-to-gram-calculator', description: 'Convert cups to grams' },
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Calculate property values, rental rates, and more.',
    icon: '🏠',
    calculators: [
      { id: 'home-affordability-calculator', name: 'Home Affordability Calculator', slug: 'home-affordability-calculator', description: 'Calculate how much home you can afford' },
      { id: 'rent-calculator', name: 'Rent Calculator', slug: 'rent-calculator', description: 'Calculate monthly rent costs' },
      { id: 'property-tax-calculator', name: 'Property Tax Calculator', slug: 'property-tax-calculator', description: 'Estimate property taxes' },
      { id: 'home-value-estimator', name: 'Home Value Estimator', slug: 'home-value-estimator', description: 'Estimate home value' },
    ]
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    description: 'Calculate grades, GPA, and study needs.',
    icon: '📚',
    calculators: [
      { id: 'gpa-calculator', name: 'GPA Calculator', slug: 'gpa-calculator', description: 'Calculate grade point average' },
      { id: 'grade-calculator', name: 'Grade Calculator', slug: 'grade-calculator', description: 'Calculate required grades' },
      { id: 'sat-score-calculator', name: 'SAT Score Calculator', slug: 'sat-score-calculator', description: 'Calculate SAT scores' },
      { id: 'study-time-calculator', name: 'Study Time Calculator', slug: 'study-time-calculator', description: 'Plan study schedule' },
    ]
  },
  {
    id: 'business',
    name: 'Business',
    slug: 'business',
    description: 'Calculate business metrics and financial ratios.',
    icon: '📈',
    calculators: [
      { id: 'break-even-calculator', name: 'Break Even Calculator', slug: 'break-even-calculator', description: 'Calculate break even point' },
      { id: 'cpm-calculator', name: 'CPM Calculator', slug: 'cpm-calculator', description: 'Calculate cost per mille' },
      { id: 'advertising-roi-calculator', name: 'Advertising ROI Calculator', slug: 'advertising-roi-calculator', description: 'Calculate advertising ROI' },
      { id: 'employee-turnover-calculator', name: 'Employee Turnover Calculator', slug: 'employee-turnover-calculator', description: 'Calculate turnover rate' },
    ]
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Calculate savings goals, travel budgets, and more.',
    icon: '✈️',
    calculators: [
      { id: 'savings-goal-calculator', name: 'Savings Goal Calculator', slug: 'savings-goal-calculator', description: 'Calculate savings timeline' },
      { id: 'travel-budget-calculator', name: 'Travel Budget Calculator', slug: 'travel-budget-calculator', description: 'Plan travel expenses' },
      { id: 'tip-calculator', name: 'Tip Calculator', slug: 'tip-calculator', description: 'Calculate tip amount' },
      { id: 'trip-cost-calculator', name: 'Trip Cost Calculator', slug: 'trip-cost-calculator', description: 'Calculate trip expenses' },
    ]
  }
];

export const getAllCalculators = () => {
  return calculatorCategories.flatMap(cat => cat.calculators);
};

export const getCalculatorBySlug = (slug) => {
  for (const category of calculatorCategories) {
    const calc = category.calculators.find(c => c.slug === slug);
    if (calc) {
      return { ...calc, category: category };
    }
  }
  return null;
};

export const getCategoryBySlug = (slug) => {
  return calculatorCategories.find(cat => cat.slug === slug);
};

// Search function for auto-suggest
export const searchCalculators = (query) => {
  if (!query || query.trim().length < 2) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const results = [];
  
  for (const category of calculatorCategories) {
    for (const calc of category.calculators) {
      const nameMatch = calc.name.toLowerCase().includes(lowerQuery);
      const descMatch = calc.description.toLowerCase().includes(lowerQuery);
      const categoryMatch = category.name.toLowerCase().includes(lowerQuery);
      
      if (nameMatch || descMatch || categoryMatch) {
        results.push({
          ...calc,
          categoryName: category.name,
          categorySlug: category.slug,
          relevance: nameMatch ? 3 : (descMatch ? 1 : 2)
        });
      }
    }
  }
  
  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);
  
  return results.slice(0, 8); // Return max 8 results
};
