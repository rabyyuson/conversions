import { Temperature } from '../lib/models';

describe('Temperature Conversion', () => {
    test('getSymbol method', () => {
        const temperatureUnits = [
            { name: 'celsius', expectedSymbol: '°C' },
            { name: 'fahrenheit', expectedSymbol: '°F' },
            { name: 'kelvin', expectedSymbol: 'K' },
            { name: 'rankine', expectedSymbol: '°R' },
            // Add more temperature units as needed
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
            // Fahrenheit to Celsius
            { from: 'fahrenheit', to: 'celsius', value: 212, expected: 100 },
            // Kelvin to Fahrenheit
            { from: 'kelvin', to: 'fahrenheit', value: 100, expected: -279.67 },
            // Rankine to Celsius
            { from: 'rankine', to: 'celsius', value: 491.67, expected: 0 },
            // Add more conversion tests for different units
        ];

        conversions.forEach(conv => {
            const temperature = new Temperature({ name: conv.from });
            const convertedValue = temperature.convertTo({ name: conv.to }, conv.value);
            expect(convertedValue).toBeCloseTo(conv.expected);
        });
    });
});
