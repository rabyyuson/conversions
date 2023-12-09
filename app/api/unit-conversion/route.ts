import {
    UNITS,
    Temperature,
    Volume,
} from '@/app/lib/models';

// Allowed response headers
const headers = { 'Content-Type': 'application/json' };

// Method not allowed response
function methodNotAllowed() {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
        status: 405,
        headers: {
            ...headers,
            'Allow': 'POST',
        },
    });
}

/**
 * Checks if the given unit is a temperature unit based on the name.
 * 
 * @param inputUnit The unit to be checked
 * @returns A boolean indicating whether the unit is a temperature unit or not
 */
function isTemperatureUnit(inputUnit: string): boolean {
    return UNITS.temperatures.some((unit) => unit.name === inputUnit);
}

/**
 * Checks if the given unit is a volume unit based on the name.
 * 
 * @param inputUnit The unit to be checked
 * @returns A boolean indicating whether the unit is a volume unit or not
 */
function isVolumeUnit(inputUnit: string): boolean {
    return UNITS.volumes.some((unit) => unit.name === inputUnit);
}

/**
 * Rounds the given value to the tenths place.
 * 
 * @param value The numerical value to be rounded
 * @returns The rounded value or null if the input value is null
 */
function convertAndRoundValue(value: number | null): number | null {
    return value ? Number(value.toFixed(1)) : null;
}

/**
 * Performs conversion between different units of measure for temperature and volume.
 * It checks if the conversion is for temperature or volume, performs the conversion using dedicated classes,
 * and rounds the result to the tenths place.
 * 
 * @param inputNumericalValue The value to be converted
 * @param inputUnitOfMeasure The source unit for conversion
 * @param targetUnitOfMeasure The target unit for conversion
 * @returns The converted value or null if conversion is not supported
 */
function handleConversion(
    inputNumericalValue: number,
    inputUnitOfMeasure: string,
    targetUnitOfMeasure: string
): number | null {
    let convertedValue = null;
    const normalizedInputUnitOfMeasure = inputUnitOfMeasure.toLowerCase();
    const normalizedTargetUnitOfMeasure = targetUnitOfMeasure.toLowerCase();

    // Perform temperature conversion
    if (isTemperatureUnit(normalizedInputUnitOfMeasure) && isTemperatureUnit(normalizedTargetUnitOfMeasure)) {
        const temperature = new Temperature({ name: normalizedInputUnitOfMeasure });
        const targetTemperature = { name: normalizedTargetUnitOfMeasure };
        convertedValue = convertAndRoundValue(temperature.convertTo(targetTemperature, inputNumericalValue));
    }

    // Perform volume conversion
    if (isVolumeUnit(normalizedInputUnitOfMeasure) && isVolumeUnit(normalizedTargetUnitOfMeasure)) {
        const volume = new Volume({ name: normalizedInputUnitOfMeasure });
        const targetVolume = { name: normalizedTargetUnitOfMeasure };
        convertedValue = convertAndRoundValue(volume.convertTo(targetVolume, inputNumericalValue));
    }

    return convertedValue;
}

/**
 * Handles the POST method for unit conversion.
 * Parses the incoming request, performs unit conversion using the handleConversion method,
 * and responds with the converted value or an error message if the conversion is not supported.
 * 
 * @param request The incoming request containing conversion data
 * @returns The response containing the converted value or an error message
 */
export async function POST(request: Request) {
    const contentType = request.headers.get('content-type');

    // Check if the content type is application/json
    if (!contentType || !contentType.includes(headers['Content-Type'])) {
        return new Response(JSON.stringify({
            message: `Content-Type should be ${headers['Content-Type']}`,
        }), { status: 400, headers });
    }

    try {
        const requestData = await request.json();
        const {
            inputNumericalValue,
            inputUnitOfMeasure,
            studentResponse,
            targetUnitOfMeasure,
        } = requestData;

        // Get the converted value
        const convertedValue = handleConversion(inputNumericalValue, inputUnitOfMeasure, targetUnitOfMeasure);

        // Respond with conversion not supported if unable to perform the conversion
        if (!convertedValue) {
            return new Response(JSON.stringify({ message: 'Conversion not supported' }), { status: 400, headers });
        }

        // Respond with the converted value
        return new Response(JSON.stringify({ convertedValue }), { status: 200, headers });
    } catch (error) {
        // Respond with error message
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500, headers });
    }
}

// Handle other HTTP methods by returning a method not allowed response
export async function GET(request: Request) {
    return methodNotAllowed();
}

export async function HEAD(request: Request) {
    return methodNotAllowed();
}

export async function PUT(request: Request) {
    return methodNotAllowed();
}

export async function DELETE(request: Request) {
    return methodNotAllowed();
}

export async function PATCH(request: Request) {
    return methodNotAllowed();
}

export async function OPTIONS(request: Request) {
    return methodNotAllowed();
}
