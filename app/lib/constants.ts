export const UNITS = {
    temperature: [
        { name: 'celsius', symbol: '°C' },
        { name: 'fahrenheit', symbol: '°F' },
        { name: 'kelvin', symbol: 'K' },
        { name: 'rankine', symbol: '°R' },
    ],
    volume: [
        { name: 'cubic-feet', symbol: 'cu ft' },
        { name: 'cubic-inches', symbol: 'cu in' },
        { name: 'cups', symbol: 'US cups' },
        { name: 'gallons', symbol: 'gal' },
        { name: 'liters', symbol: 'L' },
        { name: 'tablespoons', symbol: 'tbps' },
    ],
};

export enum Output {
    CORRECT = 'correct',
    INCORRECT = 'incorrect',
    INVALID = 'invalid',
}

export const ERRORS = {
    conversionFailed: 'Conversion failed or not supported due to invalid units or other issues.',
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
