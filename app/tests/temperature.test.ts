import { Temperature } from '../lib/models';

describe('Temperature Conversion', () => {
    test('getSymbol method', () => {
        const temperatureUnits = [
            { name: 'celsius', expectedSymbol: '°C' },
            { name: 'fahrenheit', expectedSymbol: '°F' },
            { name: 'kelvin', expectedSymbol: 'K' },
            { name: 'rankine', expectedSymbol: '°R' },
        ];

        temperatureUnits.forEach(unit => {
            const temperature = new Temperature(unit);
            const symbol = temperature.getSymbol();
            expect(symbol).toBe(unit.expectedSymbol);
        });
    });

    test('convertTo method', () => {
        const conversions = [
            // Celsius to Fahrenheit
            { from: 'celsius', to: 'fahrenheit', value: 100, expected: 212 },
            // Celsius to Kelvin
            { from: 'celsius', to: 'kelvin', value: 100, expected: 373.15 },
            // Celsius to Rankine
            { from: 'celsius', to: 'rankine', value: 100, expected: 671.67 },

            // Fahrenheit to Celsius
            { from: 'fahrenheit', to: 'celsius', value: 212, expected: 100 },
            // Fahrenheit to Kelvin
            { from: 'fahrenheit', to: 'kelvin', value: 100, expected: 310.928 },
            // Fahrenheit to Rankine
            { from: 'fahrenheit', to: 'rankine', value: 100, expected: 559.67 },

            // Kelvin to Celsius
            { from: 'kelvin', to: 'celsius', value: 373.15, expected: 100 },
            // Kelvin to Fahrenheit
            { from: 'kelvin', to: 'fahrenheit', value: 310.928, expected: 100 },
            // Kelvin to Rankine
            { from: 'kelvin', to: 'rankine', value: 100, expected: 180 },

            // Rankine to Celsius
            { from: 'rankine', to: 'celsius', value: 1000, expected: 282.4 },
            // Rankine to Fahrenheit
            { from: 'rankine', to: 'fahrenheit', value: 491.67, expected: 32 },
            // Rankine to Kelvin
            { from: 'rankine', to: 'kelvin', value: 491.67, expected: 273.15 },
        ];

        conversions.forEach(({ from, to, value, expected }) => {
            const temperature = new Temperature({ name: from });
            const convertedValue = temperature.convertTo({ name: to }, value);
            expect(Number(convertedValue?.toFixed(1))).toBeCloseTo(Number(expected.toFixed(1)));
        });
    });
});
