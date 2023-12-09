export const UNITS = {
    temperature: [
        { name: 'celsius', symbol: '°C' },
        { name: 'fahrenheit', symbol: '°F' },
        { name: 'kelvin', symbol: 'K' },
        { name: 'rankine', symbol: '°R' },
    ],
    volume: [
        { name: 'cubic-feet', symbol: 'ft³' },
        { name: 'cubic-inches', symbol: 'in³' },
        { name: 'cups', symbol: 'cups' },
        { name: 'gallons', symbol: 'gal' },
        { name: 'liters', symbol: 'L' },
        { name: 'tablespoons', symbol: 'tbsp' },
    ],
};

export enum Output {
    CORRECT = 'correct',
    INCORRECT = 'incorrect',
    INVALID = 'invalid',
}

export const ERRORS = {
    conversionFailed: 'Conversion failed or not supported. Please check the inputs and then try again.',
    failedConversionResults: 'Failed to fetch conversion results.',
    internalServerError: 'Internal Server Error',
    invalidContentType: 'Invalid Content-Type. Expected:',
    methodNotAllowed: 'Method not allowed',
} 

export const ALLOWED = {
    headers: {
        'Content-Type': 'application/json',
    },
};
