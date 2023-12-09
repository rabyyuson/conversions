import { Volume } from "../lib/models";

describe('Volume Conversion', () => {
    test('getSymbol method', () => {
        const volumeUnits = [
            { name: 'cubic-feet', expectedSymbol: 'ft³' },
            { name: 'cubic-inches', expectedSymbol: 'in³' },
            { name: 'cups', expectedSymbol: 'cups' },
            { name: 'gallons', expectedSymbol: 'gal' },
            { name: 'liters', expectedSymbol: 'L' },
            { name: 'tablespoons', expectedSymbol: 'tbsp' },
            // Add more volume units as needed
        ];

        volumeUnits.forEach(unit => {
            const volume = new Volume(unit);
            const symbol = volume.getSymbol();
            expect(symbol).toBe(unit.expectedSymbol);
        });
    });

    test('convertTo method', () => {
        const conversions = [
            // Cubic feet to cubic inches
            { from: 'cubic-feet', to: 'cubic-inches', value: 1, expected: 1728 },
            // Cups to gallons
            { from: 'cups', to: 'gallons', value: 1, expected: 0.0625 },
            // Liters to tablespoons
            { from: 'liters', to: 'tablespoons', value: 1, expected: 67.628 },
            // Add more conversion tests for different units
        ];

        conversions.forEach(conv => {
            const volume = new Volume({ name: conv.from });
            const convertedValue = volume.convertTo({ name: conv.to }, conv.value);
            expect(convertedValue).toBeCloseTo(conv.expected);
        });
    });
});
