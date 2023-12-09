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
            // Cubic feet to cups
            { from: 'cubic-feet', to: 'cups', value: 1, expected: 119.7 },
            // Cubic feet to gallons
            { from: 'cubic-feet', to: 'gallons', value: 1, expected: 7.5 },
            // Cubic feet to liters
            { from: 'cubic-feet', to: 'liters', value: 1, expected: 28.3 },
            // Cubic feet to tablespoons
            { from: 'cubic-feet', to: 'tablespoons', value: 1, expected: 1915 },
        
            // Cubic inches to cubic feet
            { from: 'cubic-inches', to: 'cubic-feet', value: 10000, expected: 5.8 },
            // Cubic inches to cups
            { from: 'cubic-inches', to: 'cups', value: 10000, expected: 693 },
            // Cubic inches to gallons
            { from: 'cubic-inches', to: 'gallons', value: 10000, expected: 43.3 },
            // Cubic inches to liters
            { from: 'cubic-inches', to: 'liters', value: 10000, expected: 164 },
            // Cubic inches to tablespoons
            { from: 'cubic-inches', to: 'tablespoons', value: 10000, expected: 11082 },
        
            // Cups to cubic feet
            { from: 'cups', to: 'cubic-feet', value: 1000, expected: 8.4 },
            // Cups to cubic inches
            { from: 'cups', to: 'cubic-inches', value: 1000, expected: 14437.5 },
            // Cups to gallons
            { from: 'cups', to: 'gallons', value: 1000, expected: 62.5 },
            // Cups to liters
            { from: 'cups', to: 'liters', value: 1000, expected: 236.6 },
            // Cups to tablespoons
            { from: 'cups', to: 'tablespoons', value: 1000, expected: 16000 },
        
            // Gallons to cubic feet
            { from: 'gallons', to: 'cubic-feet', value: 1000, expected: 133.7 },
            // Gallons to cubic inches
            { from: 'gallons', to: 'cubic-inches', value: 1000, expected: 231000 },
            // Gallons to cups
            { from: 'gallons', to: 'cups', value: 1000, expected: 16000 },
            // Gallons to liters
            { from: 'gallons', to: 'liters', value: 1000, expected: 3785.4 },
            // Gallons to tablespoons
            { from: 'gallons', to: 'tablespoons', value: 1000, expected: 256000 },
        
            // Liters to cubic feet
            { from: 'liters', to: 'cubic-feet', value: 1000, expected: 35.3 },
            // Liters to cubic inches
            { from: 'liters', to: 'cubic-inches', value: 1000, expected: 61023.7 },
            // Liters to cups
            { from: 'liters', to: 'cups', value: 1000, expected: 4226.8 },
            // Liters to gallons
            { from: 'liters', to: 'gallons', value: 1000, expected: 264.2 },
            // Liters to tablespoons
            { from: 'liters', to: 'tablespoons', value: 1000, expected: 67628 },
        
            // Tablespoons to cubic feet
            { from: 'tablespoons', to: 'cubic-feet', value: 1000, expected: 0.5 },
            // Tablespoons to cubic inches
            { from: 'tablespoons', to: 'cubic-inches', value: 1000, expected: 902.3 },
            // Tablespoons to cups
            { from: 'tablespoons', to: 'cups', value: 1000, expected: 62.5 },
            // Tablespoons to gallons
            { from: 'tablespoons', to: 'gallons', value: 1000, expected: 3.9 },
            // Tablespoons to liters
            { from: 'tablespoons', to: 'liters', value: 1000, expected: 14.8 },
        ];

        conversions.forEach(conv => {
            const volume = new Volume({ name: conv.from });
            const convertedValue = volume.convertTo({ name: conv.to }, conv.value);
            expect(Number(convertedValue?.toFixed(1))).toBe(Number(conv.expected.toFixed(1)));
        });
    });
});
