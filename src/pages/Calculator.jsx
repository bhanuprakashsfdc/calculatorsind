import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { getCalculatorBySlug, calculatorCategories } from '../data/calculators';
import './Calculator.css';

const Calculator = () => {
  const { slug } = useParams();
  const calculator = getCalculatorBySlug(slug);
  
  // Calculator state
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [resultLabel, setResultLabel] = useState('');
  const [error, setError] = useState('');

  if (!calculator) {
    return (
      <>
        <SEO title="Calculator Not Found" />
        <div className="container">
          <div className="not-found">
            <h1>Calculator Not Found</h1>
            <p>The calculator you're looking for doesn't exist.</p>
            <Link to="/calculators.html" className="btn-primary">View All Calculators</Link>
          </div>
        </div>
      </>
    );
  }

  // Get related calculators from same category
  const relatedCalculators = calculator.category?.calculators.filter(
    c => c.slug !== calculator.slug
  ).slice(0, 4) || [];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResult(null);
    setError('');
  };

  const calculate = () => {
    setError('');
    // Generic calculation based on calculator type
    let calcResult = null;
    let label = '';
    
    switch (calculator.slug) {
      // Health Calculators
      case 'bmi-calculator':
        const weight = parseFloat(inputs.weight) || 0;
        const height = parseFloat(inputs.height) || 0;
        if (weight > 0 && height > 0) {
          const heightM = height / 100;
          const bmi = weight / (heightM * heightM);
          calcResult = bmi.toFixed(1);
          label = bmi < 18.5 ? ' (Underweight)' : 
                  bmi < 25 ? ' (Normal)' : 
                  bmi < 30 ? ' (Overweight)' : ' (Obese)';
        } else {
          setError('Please enter valid weight and height values');
        }
        break;
        
      case 'calorie-calculator':
        const calWeight = parseFloat(inputs.weight) || 0;
        const calHeight = parseFloat(inputs.height) || 0;
        const age = parseFloat(inputs.age) || 0;
        const gender = inputs.gender || 'male';
        const activity = parseFloat(inputs.activity) || 1.2;
        if (calWeight > 0 && calHeight > 0 && age > 0) {
          const bmr = gender === 'male' 
            ? 10 * calWeight + 6.25 * calHeight - 5 * age + 5
            : 10 * calWeight + 6.25 * calHeight - 5 * age - 161;
          calcResult = Math.round(bmr * activity);
          label = ' calories/day';
        } else {
          setError('Please enter valid values');
        }
        break;
        
      case 'bmr-calculator':
        const bmrWeight = parseFloat(inputs.bmrWeight) || 0;
        const bmrHeight = parseFloat(inputs.bmrHeight) || 0;
        const bmrAge = parseFloat(inputs.bmrAge) || 0;
        const bmrGender = inputs.bmrGender || 'male';
        if (bmrWeight > 0 && bmrHeight > 0 && bmrAge > 0) {
          const bmrValue = bmrGender === 'male' 
            ? 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge + 5
            : 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge - 161;
          calcResult = Math.round(bmrValue);
          label = ' calories/day (Basal Metabolic Rate)';
        } else {
          setError('Please enter valid values');
        }
        break;
      
      case 'pregnancy-calculator':
        const lastPeriod = inputs.lastPeriod;
        if (lastPeriod) {
          const dueDate = new Date(lastPeriod);
          dueDate.setDate(dueDate.getDate() + 280); // 280 days from LMP
          calcResult = dueDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          label = ' (Estimated Due Date)';
        } else {
          setError('Please enter the first day of your last menstrual period');
        }
        break;
        
      case 'body-fat-calculator':
        const genderBF = inputs.genderBF || 'male';
        const waist = parseFloat(inputs.waist) || 0;
        const neck = parseFloat(inputs.neck) || 0;
        const heightBF = parseFloat(inputs.heightBF) || 0;
        const hip = parseFloat(inputs.hip) || 0;
        
        if (waist > 0 && neck > 0 && heightBF > 0) {
          let bodyFat;
          if (genderBF === 'male') {
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(heightBF)) - 450;
          } else if (hip > 0) {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(heightBF)) - 450;
          } else {
            setError('Hip measurement required for female calculation');
            break;
          }
          calcResult = bodyFat > 0 ? bodyFat.toFixed(1) : '0.0';
          label = ' % Body Fat';
        } else {
          setError('Please enter valid measurements');
        }
        break;
        
      // Financial Calculators
      case 'mortgage-calculator':
        const principal = parseFloat(inputs.principal) || 0;
        const rate = parseFloat(inputs.rate) || 0;
        const years = parseFloat(inputs.years) || 0;
        if (principal > 0 && rate > 0 && years > 0) {
          const monthlyRate = rate / 100 / 12;
          const payments = years * 12;
          const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
            (Math.pow(1 + monthlyRate, payments) - 1);
          calcResult = monthly.toFixed(2);
          label = '/month';
        } else {
          setError('Please enter valid loan details');
        }
        break;
        
      case 'loan-calculator':
        const loanAmount = parseFloat(inputs.loanAmount) || 0;
        const loanRate = parseFloat(inputs.loanRate) || 0;
        const loanYears = parseFloat(inputs.loanYears) || 0;
        if (loanAmount > 0 && loanRate > 0 && loanYears > 0) {
          const monthlyRate = loanRate / 100 / 12;
          const payments = loanYears * 12;
          const monthly = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
            (Math.pow(1 + monthlyRate, payments) - 1);
          calcResult = monthly.toFixed(2);
          label = '/month';
        } else {
          setError('Please enter valid loan details');
        }
        break;
        
      case 'compound-interest-calculator':
        const principalCI = parseFloat(inputs.principalCI) || 0;
        const rateCI = parseFloat(inputs.rateCI) || 0;
        const yearsCI = parseFloat(inputs.yearsCI) || 0;
        const compound = parseFloat(inputs.compound) || 12;
        if (principalCI > 0 && rateCI > 0 && yearsCI > 0) {
          const amount = principalCI * Math.pow(1 + rateCI/100/compound, compound * yearsCI);
          calcResult = amount.toFixed(2);
          label = ' (Future Value)';
        } else {
          setError('Please enter valid investment details');
        }
        break;
        
      case 'investment-calculator':
        const initInvest = parseFloat(inputs.initInvest) || 0;
        const monthlyContrib = parseFloat(inputs.monthlyContrib) || 0;
        const invRate = parseFloat(inputs.invRate) || 0;
        const invYears = parseFloat(inputs.invYears) || 0;
        if (invYears > 0) {
          const months = invYears * 12;
          const monthlyRate = invRate / 100 / 12;
          let futureValue;
          if (monthlyRate > 0) {
            futureValue = initInvest * Math.pow(1 + monthlyRate, months) + 
                          monthlyContrib * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
          } else {
            futureValue = initInvest + (monthlyContrib * months);
          }
          calcResult = futureValue.toFixed(2);
          label = ' (Future Value)';
        } else {
          setError('Please enter valid investment details');
        }
        break;
        
      case 'retirement-calculator':
        const currentAge = parseFloat(inputs.currentAge) || 0;
        const retireAge = parseFloat(inputs.retireAge) || 0;
        const currentSavings = parseFloat(inputs.currentSavings) || 0;
        const monthlySavings = parseFloat(inputs.monthlySavings) || 0;
        const returnRate = parseFloat(inputs.returnRate) || 0;
        
        if (currentAge > 0 && retireAge > 0 && retireAge > currentAge) {
          const yearsToRetire = retireAge - currentAge;
          const months = yearsToRetire * 12;
          const monthlyRate = returnRate / 100 / 12;
          
          let retirementFund;
          if (monthlyRate > 0) {
            retirementFund = currentSavings * Math.pow(1 + monthlyRate, months) +
                            monthlySavings * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
          } else {
            retirementFund = currentSavings + (monthlySavings * months);
          }
          calcResult = retirementFund.toFixed(2);
          label = ' (Estimated Retirement Fund)';
        } else {
          setError('Please enter valid age and savings details');
        }
        break;
        
      // Math Calculators
      case 'percentage-calculator':
        const percentValue = parseFloat(inputs.percentValue) || 0;
        const percentTotal = parseFloat(inputs.percentTotal) || 0;
        if (percentTotal > 0) {
          calcResult = ((percentValue / percentTotal) * 100).toFixed(2);
          label = '%';
        } else {
          setError('Please enter valid values');
        }
        break;
        
      case 'quadratic-calculator':
        const a = parseFloat(inputs.a) || 0;
        const b = parseFloat(inputs.b) || 0;
        const c = parseFloat(inputs.c) || 0;
        if (a !== 0) {
          const discriminant = b * b - 4 * a * c;
          if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            calcResult = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
          } else if (discriminant === 0) {
            const x = -b / (2 * a);
            calcResult = `x = ${x.toFixed(2)}`;
          } else {
            calcResult = 'No real solutions';
          }
        } else {
          setError('Coefficient "a" cannot be zero');
        }
        break;
        
      case 'area-calculator':
        const shape = inputs.shape || 'rectangle';
        if (shape === 'rectangle') {
          const length = parseFloat(inputs.length) || 0;
          const width = parseFloat(inputs.width) || 0;
          if (length > 0 && width > 0) {
            calcResult = (length * width).toFixed(2);
            label = ' square units';
          } else {
            setError('Please enter valid length and width');
          }
        } else if (shape === 'circle') {
          const radius = parseFloat(inputs.radius) || 0;
          if (radius > 0) {
            calcResult = (Math.PI * radius * radius).toFixed(2);
            label = ' square units';
          } else {
            setError('Please enter a valid radius');
          }
        } else if (shape === 'triangle') {
          const base = parseFloat(inputs.base) || 0;
          const height = parseFloat(inputs.triangleHeight) || 0;
          if (base > 0 && height > 0) {
            calcResult = (0.5 * base * height).toFixed(2);
            label = ' square units';
          } else {
            setError('Please enter valid base and height');
          }
        }
        break;
        
      // Fitness Calculators
      case 'one-rep-max-calculator':
        const weightLifted = parseFloat(inputs.weightLifted) || 0;
        const reps = parseFloat(inputs.reps) || 0;
        if (weightLifted > 0 && reps > 0 && reps <= 12) {
          // Epley formula
          const oneRM = weightLifted * (1 + reps / 30);
          calcResult = Math.round(oneRM);
          label = ' lbs (Estimated 1RM)';
        } else {
          setError('Please enter valid weight and reps (1-12)');
        }
        break;
        
      case 'running-calculator':
        const distance = parseFloat(inputs.distance) || 0;
        const time = inputs.time || '';
        if (distance > 0 && time) {
          const [hours, minutes, seconds] = time.split(':').map(Number);
          const totalMinutes = (hours || 0) * 60 + (minutes || 0) + ((seconds || 0) / 60);
          if (totalMinutes > 0) {
            const pace = totalMinutes / distance;
            const paceMin = Math.floor(pace);
            const paceSec = Math.round((pace - paceMin) * 60);
            calcResult = `${paceMin}:${paceSec.toString().padStart(2, '0')} min/mile`;
            label = ' (Pace)';
          } else {
            setError('Please enter valid time');
          }
        } else {
          setError('Please enter distance and time');
        }
        break;
        
      case 'macro-calculator':
        const macroCalories = parseFloat(inputs.macroCalories) || 0;
        const macroRatio = inputs.macroRatio || '40-30-30';
        if (macroCalories > 0) {
          const [prot, carb, fat] = macroRatio.split('-').map(Number);
          const proteinGrams = Math.round((macroCalories * prot / 100) / 4);
          const carbGrams = Math.round((macroCalories * carb / 100) / 4);
          const fatGrams = Math.round((macroCalories * fat / 100) / 9);
          calcResult = `Protein: ${proteinGrams}g | Carbs: ${carbGrams}g | Fat: ${fatGrams}g`;
        } else {
          setError('Please enter daily calorie intake');
        }
        break;
        
      case 'water-intake-calculator':
        const weightWater = parseFloat(inputs.weightWater) || 0;
        const activityLevel = inputs.activityLevel || 'moderate';
        if (weightWater > 0) {
          let baseWater = weightWater * 0.5; // oz
          if (activityLevel === 'low') baseWater *= 1;
          else if (activityLevel === 'moderate') baseWater *= 1.2;
          else if (activityLevel === 'high') baseWater *= 1.4;
          calcResult = Math.round(baseWater);
          label = ' oz/day';
        } else {
          setError('Please enter your weight');
        }
        break;
        
      case 'heart-rate-calculator':
        const hrAge = parseFloat(inputs.hrAge) || 0;
        if (hrAge > 0) {
          const maxHR = 220 - hrAge;
          calcResult = `Max HR: ${maxHR} bpm | Fat Burn: ${Math.round(maxHR * 0.6)}-${Math.round(maxHR * 0.7)} bpm | Cardio: ${Math.round(maxHR * 0.7)}-${Math.round(maxHR * 0.85)} bpm`;
        } else {
          setError('Please enter your age');
        }
        break;
        
      // Time Calculators
      case 'age-calculator':
        const birthDate = inputs.birthDate;
        if (birthDate) {
          const birth = new Date(birthDate);
          const today = new Date();
          let years = today.getFullYear() - birth.getFullYear();
          let months = today.getMonth() - birth.getMonth();
          let days = today.getDate() - birth.getDate();
          
          if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
          }
          if (months < 0) {
            years--;
            months += 12;
          }
          
          calcResult = `${years} years, ${months} months, ${days} days`;
        } else {
          setError('Please enter your birth date');
        }
        break;
        
      case 'date-calculator':
        const startDate = inputs.startDate;
        const endDate = inputs.endDate;
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          calcResult = diffDays;
          label = ' days';
        } else {
          setError('Please enter start and end dates');
        }
        break;
        
      case 'hours-calculator':
        const startTime = inputs.startTime;
        const endTime = inputs.endTime;
        if (startTime && endTime) {
          const [startH, startM] = startTime.split(':').map(Number);
          const [endH, endM] = endTime.split(':').map(Number);
          let hours = endH - startH;
          let mins = endM - startM;
          
          if (mins < 0) {
            hours--;
            mins += 60;
          }
          if (hours < 0) hours += 24;
          
          calcResult = `${hours}h ${mins}m`;
        } else {
          setError('Please enter start and end times');
        }
        break;
        
      // Conversion Calculators
      case 'temperature-converter':
        const tempValue = parseFloat(inputs.tempValue) || 0;
        const tempUnit = inputs.tempUnit || 'celsius';
        if (tempUnit === 'celsius') {
          const fahrenheit = (tempValue * 9/5) + 32;
          const kelvin = tempValue + 273.15;
          calcResult = `${fahrenheit.toFixed(1)}°F | ${kelvin.toFixed(1)}K`;
        } else if (tempUnit === 'fahrenheit') {
          const celsius = (tempValue - 32) * 5/9;
          const kelvin = celsius + 273.15;
          calcResult = `${celsius.toFixed(1)}°C | ${kelvin.toFixed(1)}K`;
        } else {
          const celsius = tempValue - 273.15;
          const fahrenheit = (celsius * 9/5) + 32;
          calcResult = `${celsius.toFixed(1)}°C | ${fahrenheit.toFixed(1)}°F`;
        }
        break;
        
      case 'length-converter':
        const lengthValue = parseFloat(inputs.lengthValue) || 0;
        const lengthUnit = inputs.lengthUnit || 'miles';
        if (lengthValue > 0) {
          // Convert to meters first
          const meters = lengthUnit === 'miles' ? lengthValue * 1609.34 :
                        lengthUnit === 'feet' ? lengthValue * 0.3048 :
                        lengthUnit === 'inches' ? lengthValue * 0.0254 :
                        lengthUnit === 'km' ? lengthValue * 1000 :
                        lengthUnit === 'cm' ? lengthValue / 100 :
                        lengthValue;
          calcResult = `${(meters / 1000).toFixed(2)} km | ${meters.toFixed(2)} m | ${(meters * 3.28084).toFixed(2)} ft`;
        } else {
          setError('Please enter a valid length value');
        }
        break;
        
      case 'weight-converter':
        const weightValue = parseFloat(inputs.weightValue) || 0;
        const weightUnit = inputs.weightUnit || 'kg';
        if (weightValue > 0) {
          const kg = weightUnit === 'lbs' ? weightValue * 0.453592 :
                    weightUnit === 'oz' ? weightValue * 0.0283495 :
                    weightUnit === 'g' ? weightValue / 1000 :
                    weightValue;
          calcResult = `${kg.toFixed(2)} kg | ${(kg * 2.20462).toFixed(2)} lbs | ${(kg * 35.274).toFixed(2)} oz`;
        } else {
          setError('Please enter a valid weight value');
        }
        break;
        
      case 'currency-converter':
        const currencyAmount = parseFloat(inputs.currencyAmount) || 0;
        const currencyFrom = inputs.currencyFrom || 'USD';
        const currencyTo = inputs.currencyTo || 'EUR';
        // Mock exchange rates (in production, fetch from API)
        const rates = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, INR: 83.12 };
        if (currencyAmount > 0 && rates[currencyFrom] && rates[currencyTo]) {
          const usdAmount = currencyAmount / rates[currencyFrom];
          const converted = usdAmount * rates[currencyTo];
          calcResult = `${converted.toFixed(2)} ${currencyTo}`;
        } else {
          setError('Please enter valid currency and amount');
        }
        break;
        
      case 'unit-converter':
        const unitValue = parseFloat(inputs.unitValue) || 0;
        const unitType = inputs.unitType || 'distance';
        if (unitValue > 0) {
          if (unitType === 'distance') {
            calcResult = `${unitValue} km = ${(unitValue * 0.621371).toFixed(2)} miles`;
          } else if (unitType === 'weight') {
            calcResult = `${unitValue} kg = ${(unitValue * 2.20462).toFixed(2)} lbs`;
          } else if (unitType === 'temperature') {
            calcResult = `${unitValue}°C = ${((unitValue * 9/5) + 32).toFixed(1)}°F`;
          } else {
            calcResult = `${unitValue} MB = ${(unitValue / 1024).toFixed(2)} GB`;
          }
        } else {
          setError('Please enter a valid value');
        }
        break;
        
      case 'fraction-calculator':
        const num1 = parseFloat(inputs.num1) || 0;
        const den1 = parseFloat(inputs.den1) || 1;
        const num2 = parseFloat(inputs.num2) || 0;
        const den2 = parseFloat(inputs.den2) || 1;
        const operation = inputs.operation || 'add';
        
        if (den1 > 0 && den2 > 0) {
          let resultNum, resultDen;
          switch (operation) {
            case 'add':
              resultNum = num1 * den2 + num2 * den1;
              resultDen = den1 * den2;
              break;
            case 'subtract':
              resultNum = num1 * den2 - num2 * den1;
              resultDen = den1 * den2;
              break;
            case 'multiply':
              resultNum = num1 * num2;
              resultDen = den1 * den2;
              break;
            case 'divide':
              resultNum = num1 * den2;
              resultDen = den1 * num2;
              if (resultDen === 0) {
                setError('Cannot divide by zero');
                break;
              }
              break;
          }
          // Simplify
          const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
          const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
          calcResult = `${resultNum / divisor}/${resultDen / divisor}`;
        } else {
          setError('Please enter valid fractions');
        }
        break;
        
      case 'scientific-calculator':
        const expr = inputs.expression;
        if (expr) {
          try {
            // Safe evaluation (basic operations only)
            const sanitized = expr.replace(/[^0-9+\-*/.()%sqrtpow]/g, '');
            // Using Function constructor for basic math
            const result = new Function('return ' + sanitized)();
            if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
              calcResult = result.toFixed(6);
            } else {
              setError('Invalid expression');
            }
          } catch (e) {
            setError('Invalid expression');
          }
        } else {
          setError('Please enter an expression');
        }
        break;
        
      case 'day-of-week-calculator':
        const calcDate = inputs.calcDate;
        if (calcDate) {
          const date = new Date(calcDate);
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          calcResult = days[date.getDay()];
        } else {
          setError('Please select a date');
        }
        break;
        
      case 'time-card-calculator':
        const workDays = parseFloat(inputs.workDays) || 0;
        const hoursPerDay = parseFloat(inputs.hoursPerDay) || 0;
        const hourlyRate = parseFloat(inputs.hourlyRate) || 0;
        
        if (workDays > 0 && hoursPerDay > 0 && hourlyRate > 0) {
          const totalHours = workDays * hoursPerDay;
          const totalPay = totalHours * hourlyRate;
          calcResult = `${totalHours.toFixed(1)} hours | $${totalPay.toFixed(2)}`;
        } else {
          setError('Please enter valid work details');
        }
        break;
        
      default:
        setError('This calculator is not yet implemented. Please try another calculator.');
    }
    
    if (calcResult !== null) {
      setResult(calcResult);
      setResultLabel(label);
    }
  };

  const getCalculatorInputs = () => {
    switch (calculator.slug) {
      // Health
      case 'bmi-calculator':
        return [
          { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'Enter weight in kg' },
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'Enter height in cm' },
        ];
      case 'calorie-calculator':
        return [
          { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'Enter weight' },
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: 'Enter height' },
          { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter age' },
          { name: 'gender', label: 'Gender', type: 'select', options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]},
          { name: 'activity', label: 'Activity Level', type: 'select', options: [
            { value: 1.2, label: 'Sedentary' },
            { value: 1.375, label: 'Lightly Active' },
            { value: 1.55, label: 'Moderately Active' },
            { value: 1.725, label: 'Very Active' },
          ]},
        ];
      case 'bmr-calculator':
        return [
          { name: 'bmrWeight', label: 'Weight (kg)', type: 'number', placeholder: 'Enter weight' },
          { name: 'bmrHeight', label: 'Height (cm)', type: 'number', placeholder: 'Enter height' },
          { name: 'bmrAge', label: 'Age', type: 'number', placeholder: 'Enter age' },
          { name: 'bmrGender', label: 'Gender', type: 'select', options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]},
        ];
      case 'pregnancy-calculator':
        return [
          { name: 'lastPeriod', label: 'First Day of Last Period', type: 'date' },
        ];
      case 'body-fat-calculator':
        return [
          { name: 'genderBF', label: 'Gender', type: 'select', options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]},
          { name: 'waist', label: 'Waist (cm)', type: 'number', placeholder: 'Enter waist measurement' },
          { name: 'neck', label: 'Neck (cm)', type: 'number', placeholder: 'Enter neck measurement' },
          { name: 'heightBF', label: 'Height (cm)', type: 'number', placeholder: 'Enter height' },
          { name: 'hip', label: 'Hip (cm) - Required for females', type: 'number', placeholder: 'Enter hip measurement' },
        ];
        
      // Financial
      case 'mortgage-calculator':
        return [
          { name: 'principal', label: 'Loan Amount ($)', type: 'number', placeholder: 'Enter loan amount' },
          { name: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'Enter interest rate' },
          { name: 'years', label: 'Loan Term (years)', type: 'number', placeholder: 'Enter loan term' },
        ];
      case 'loan-calculator':
        return [
          { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', placeholder: 'Enter loan amount' },
          { name: 'loanRate', label: 'Interest Rate (%)', type: 'number', placeholder: 'Enter interest rate' },
          { name: 'loanYears', label: 'Loan Term (years)', type: 'number', placeholder: 'Enter loan term' },
        ];
      case 'compound-interest-calculator':
        return [
          { name: 'principalCI', label: 'Initial Investment ($)', type: 'number', placeholder: 'Enter initial amount' },
          { name: 'rateCI', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'Enter interest rate' },
          { name: 'yearsCI', label: 'Time Period (years)', type: 'number', placeholder: 'Enter years' },
          { name: 'compound', label: 'Compounding Frequency', type: 'select', options: [
            { value: 1, label: 'Annually' },
            { value: 4, label: 'Quarterly' },
            { value: 12, label: 'Monthly' },
            { value: 365, label: 'Daily' },
          ]},
        ];
      case 'investment-calculator':
        return [
          { name: 'initInvest', label: 'Initial Investment ($)', type: 'number', placeholder: 'Enter initial amount' },
          { name: 'monthlyContrib', label: 'Monthly Contribution ($)', type: 'number', placeholder: 'Enter monthly contribution' },
          { name: 'invRate', label: 'Annual Return Rate (%)', type: 'number', placeholder: 'Enter expected return' },
          { name: 'invYears', label: 'Investment Period (years)', type: 'number', placeholder: 'Enter years' },
        ];
      case 'retirement-calculator':
        return [
          { name: 'currentAge', label: 'Current Age', type: 'number', placeholder: 'Enter current age' },
          { name: 'retireAge', label: 'Retirement Age', type: 'number', placeholder: 'Enter planned retirement age' },
          { name: 'currentSavings', label: 'Current Savings ($)', type: 'number', placeholder: 'Enter current savings' },
          { name: 'monthlySavings', label: 'Monthly Savings ($)', type: 'number', placeholder: 'Enter monthly savings' },
          { name: 'returnRate', label: 'Expected Annual Return (%)', type: 'number', placeholder: 'Enter expected return' },
        ];
        
      // Math
      case 'percentage-calculator':
        return [
          { name: 'percentValue', label: 'Value', type: 'number', placeholder: 'Enter the value' },
          { name: 'percentTotal', label: 'Total', type: 'number', placeholder: 'Enter the total' },
        ];
      case 'quadratic-calculator':
        return [
          { name: 'a', label: 'a (coefficient of x²)', type: 'number', placeholder: 'Enter a' },
          { name: 'b', label: 'b (coefficient of x)', type: 'number', placeholder: 'Enter b' },
          { name: 'c', label: 'c (constant)', type: 'number', placeholder: 'Enter c' },
        ];
      case 'area-calculator':
        return [
          { name: 'shape', label: 'Shape', type: 'select', options: [
            { value: 'rectangle', label: 'Rectangle' },
            { value: 'circle', label: 'Circle' },
            { value: 'triangle', label: 'Triangle' },
          ]},
          { name: 'length', label: 'Length (for rectangle)', type: 'number', placeholder: 'Enter length' },
          { name: 'width', label: 'Width (for rectangle)', type: 'number', placeholder: 'Enter width' },
          { name: 'radius', label: 'Radius (for circle)', type: 'number', placeholder: 'Enter radius' },
          { name: 'base', label: 'Base (for triangle)', type: 'number', placeholder: 'Enter base' },
          { name: 'triangleHeight', label: 'Height (for triangle)', type: 'number', placeholder: 'Enter height' },
        ];
      case 'fraction-calculator':
        return [
          { name: 'num1', label: 'Numerator 1', type: 'number', placeholder: 'Enter numerator' },
          { name: 'den1', label: 'Denominator 1', type: 'number', placeholder: 'Enter denominator' },
          { name: 'operation', label: 'Operation', type: 'select', options: [
            { value: 'add', label: '+' },
            { value: 'subtract', label: '-' },
            { value: 'multiply', label: '×' },
            { value: 'divide', label: '÷' },
          ]},
          { name: 'num2', label: 'Numerator 2', type: 'number', placeholder: 'Enter numerator' },
          { name: 'den2', label: 'Denominator 2', type: 'number', placeholder: 'Enter denominator' },
        ];
      case 'scientific-calculator':
        return [
          { name: 'expression', label: 'Expression', type: 'text', placeholder: 'e.g., 2+2*3 or sqrt(16)' },
        ];
        
      // Fitness
      case 'one-rep-max-calculator':
        return [
          { name: 'weightLifted', label: 'Weight Lifted (lbs)', type: 'number', placeholder: 'Enter weight lifted' },
          { name: 'reps', label: 'Number of Reps', type: 'number', placeholder: 'Enter number of reps (1-12)' },
        ];
      case 'running-calculator':
        return [
          { name: 'distance', label: 'Distance (miles)', type: 'number', placeholder: 'Enter distance' },
          { name: 'time', label: 'Time (HH:MM:SS)', type: 'text', placeholder: 'e.g., 0:30:00 for 30 min' },
        ];
      case 'macro-calculator':
        return [
          { name: 'macroCalories', label: 'Daily Calorie Intake', type: 'number', placeholder: 'Enter daily calories' },
          { name: 'macroRatio', label: 'Macro Ratio', type: 'select', options: [
            { value: '40-30-30', label: '40% Protein / 30% Carbs / 30% Fat' },
            { value: '30-40-30', label: '30% Protein / 40% Carbs / 30% Fat' },
            { value: '30-30-40', label: '30% Protein / 30% Carbs / 40% Fat' },
            { value: '50-25-25', label: '50% Protein / 25% Carbs / 25% Fat' },
          ]},
        ];
      case 'water-intake-calculator':
        return [
          { name: 'weightWater', label: 'Weight (lbs)', type: 'number', placeholder: 'Enter your weight' },
          { name: 'activityLevel', label: 'Activity Level', type: 'select', options: [
            { value: 'low', label: 'Low (sedentary)' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'high', label: 'High (very active)' },
          ]},
        ];
      case 'heart-rate-calculator':
        return [
          { name: 'hrAge', label: 'Your Age', type: 'number', placeholder: 'Enter your age' },
        ];
        
      // Time
      case 'age-calculator':
        return [
          { name: 'birthDate', label: 'Birth Date', type: 'date' },
        ];
      case 'date-calculator':
        return [
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
        ];
      case 'hours-calculator':
        return [
          { name: 'startTime', label: 'Start Time', type: 'time' },
          { name: 'endTime', label: 'End Time', type: 'time' },
        ];
      case 'time-card-calculator':
        return [
          { name: 'workDays', label: 'Days Worked', type: 'number', placeholder: 'Enter number of days' },
          { name: 'hoursPerDay', label: 'Hours Per Day', type: 'number', placeholder: 'Enter hours per day' },
          { name: 'hourlyRate', label: 'Hourly Rate ($)', type: 'number', placeholder: 'Enter hourly rate' },
        ];
      case 'day-of-week-calculator':
        return [
          { name: 'calcDate', label: 'Date', type: 'date' },
        ];
        
      // Conversion
      case 'temperature-converter':
        return [
          { name: 'tempValue', label: 'Temperature', type: 'number', placeholder: 'Enter temperature' },
          { name: 'tempUnit', label: 'Unit', type: 'select', options: [
            { value: 'celsius', label: 'Celsius' },
            { value: 'fahrenheit', label: 'Fahrenheit' },
            { value: 'kelvin', label: 'Kelvin' },
          ]},
        ];
      case 'length-converter':
        return [
          { name: 'lengthValue', label: 'Value', type: 'number', placeholder: 'Enter value' },
          { name: 'lengthUnit', label: 'Unit', type: 'select', options: [
            { value: 'miles', label: 'Miles' },
            { value: 'km', label: 'Kilometers' },
            { value: 'feet', label: 'Feet' },
            { value: 'inches', label: 'Inches' },
            { value: 'cm', label: 'Centimeters' },
          ]},
        ];
      case 'weight-converter':
        return [
          { name: 'weightValue', label: 'Value', type: 'number', placeholder: 'Enter value' },
          { name: 'weightUnit', label: 'Unit', type: 'select', options: [
            { value: 'kg', label: 'Kilograms' },
            { value: 'lbs', label: 'Pounds' },
            { value: 'oz', label: 'Ounces' },
            { value: 'g', label: 'Grams' },
          ]},
        ];
      case 'currency-converter':
        return [
          { name: 'currencyAmount', label: 'Amount', type: 'number', placeholder: 'Enter amount' },
          { name: 'currencyFrom', label: 'From', type: 'select', options: [
            { value: 'USD', label: 'USD - US Dollar' },
            { value: 'EUR', label: 'EUR - Euro' },
            { value: 'GBP', label: 'GBP - British Pound' },
            { value: 'JPY', label: 'JPY - Japanese Yen' },
            { value: 'INR', label: 'INR - Indian Rupee' },
          ]},
          { name: 'currencyTo', label: 'To', type: 'select', options: [
            { value: 'EUR', label: 'EUR - Euro' },
            { value: 'USD', label: 'USD - US Dollar' },
            { value: 'GBP', label: 'GBP - British Pound' },
            { value: 'JPY', label: 'JPY - Japanese Yen' },
            { value: 'INR', label: 'INR - Indian Rupee' },
          ]},
        ];
      case 'unit-converter':
        return [
          { name: 'unitValue', label: 'Value', type: 'number', placeholder: 'Enter value' },
          { name: 'unitType', label: 'Type', type: 'select', options: [
            { value: 'distance', label: 'Distance (km to miles)' },
            { value: 'weight', label: 'Weight (kg to lbs)' },
            { value: 'temperature', label: 'Temperature (°C to °F)' },
            { value: 'data', label: 'Data (MB to GB)' },
          ]},
        ];
        
      default:
        return [
          { name: 'value1', label: 'Value 1', type: 'number', placeholder: 'Enter first value' },
          { name: 'value2', label: 'Value 2', type: 'number', placeholder: 'Enter second value' },
        ];
    }
  };

  const calculatorInputs = getCalculatorInputs();

  return (
    <>
      <SEO 
        title={calculator.name}
        description={calculator.description}
        keywords={[calculator.name.toLowerCase(), 'free online calculator', calculator.category?.name.toLowerCase() + ' calculator']}
      />
      
      <div className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/calculators.html">Calculators</Link>
            <span>/</span>
            <Link to={`/category/${calculator.category?.slug}.html`}>{calculator.category?.name}</Link>
            <span>/</span>
            <span>{calculator.name}</span>
          </nav>
          <h1>{calculator.name}</h1>
          <p>{calculator.description}</p>
        </div>
      </div>

      <div className="container">
        <AdSense position="leaderboard" />
        
        <div className="calculator-content">
          <div className="calculator-main">
            <div className="calculator-form">
              <h2>Calculate Now</h2>
              
              {calculatorInputs.map((input) => (
                <div key={input.name} className="form-group">
                  <label htmlFor={input.name}>{input.label}</label>
                  {input.type === 'select' ? (
                    <select
                      id={input.name}
                      value={inputs[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {input.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={input.type}
                      id={input.name}
                      placeholder={input.placeholder}
                      value={inputs[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
              
              <button className="btn-calculate" onClick={calculate}>
                Calculate
              </button>
              
              {error && (
                <div className="error-message" style={{ color: '#dc2626', marginTop: '16px', fontSize: '14px' }}>
                  {error}
                </div>
              )}
              
              {result !== null && !error && (
                <div className="result">
                  <h3>Result</h3>
                  <div className="result-value">
                    {result}
                    {resultLabel && <span className="result-label">{resultLabel}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* In-Article Ad */}
            <AdSense position="in-article" />
            
            <div className="calculator-info">
              <h2>About This Calculator</h2>
              <p>
                This {calculator.name.toLowerCase()} is designed to help you quickly and accurately 
                perform calculations. Simply enter the required values above and click "Calculate" 
                to get your results instantly.
              </p>
              <h3>How to Use</h3>
              <ol>
                <li>Enter the required values in the fields above</li>
                <li>Make sure all values are entered correctly</li>
                <li>Click the "Calculate" button</li>
                <li>View your results instantly</li>
              </ol>
            </div>
          </div>

          <aside className="sidebar">
            <AdSense position="sidebar" />
            
            <div className="related-calculators">
              <h3>Related Calculators</h3>
              <ul>
                {relatedCalculators.map((calc) => (
                  <li key={calc.id}>
                    <Link to={`/${calc.slug}.html`}>
                      {calc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Calculator;
