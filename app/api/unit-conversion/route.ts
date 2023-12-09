import { ERRORS, UNITS, Output } from '@/app/lib/constants';
import { Temperature, Volume } from '@/app/lib/models';

// Allowed response headers
const headers = { 'Content-Type': 'application/json' };

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
function convertValue(
    inputNumericalValue: number,
    inputUnitOfMeasure: string,
    targetUnitOfMeasure: string
): number | null {
    let convertedValue = null;

    // Perform temperature conversion
    if (isTemperatureUnit(inputUnitOfMeasure) && isTemperatureUnit(targetUnitOfMeasure)) {
        const temperature = new Temperature({ name: inputUnitOfMeasure });
        const targetTemperature = { name: targetUnitOfMeasure };
        convertedValue = convertAndRoundValue(temperature.convertTo(targetTemperature, inputNumericalValue));
    }

    // Perform volume conversion
    if (isVolumeUnit(inputUnitOfMeasure) && isVolumeUnit(targetUnitOfMeasure)) {
        const volume = new Volume({ name: inputUnitOfMeasure });
        const targetVolume = { name: targetUnitOfMeasure };
        convertedValue = convertAndRoundValue(volume.convertTo(targetVolume, inputNumericalValue));
    }

    return convertedValue;
}

/**
 * Checks if the student response matches the converted value.
 * 
 * @param studentResponse The response provided by the student
 * @param convertedValue The value obtained after conversion
 * @returns A boolean indicating whether the student response matches the converted value
 */
function isCorrect(studentResponse: number, convertedValue: number): boolean {
    return studentResponse === convertedValue;
}

/**
 * Generates a response with an invalid output and a custom message.
 * 
 * @param {object} options - Object containing status code and message
 * @param {number} options.status - The status code for the response (default is 200)
 * @param {string} options.message - The message to include in the response
 * @returns A Response object indicating an invalid output result with a custom message
 */
function invalidOutput({
    status = 200,
    message,
}: {
    status?: number;
    message?: string;
}) {
    return new Response(
        JSON.stringify({
            output: Output.INVALID,
            message,
        }),
        { status, headers }
    );
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
    const validContentType = headers['Content-Type'];

    try {
        if (!contentType || !contentType.includes(validContentType)) {
            throw new Error(`${ERRORS.invalidContentType} ${validContentType}`);
        }

        const requestData = await request.json();
        const {
            inputNumericalValue,
            inputUnitOfMeasure,
            studentResponse,
            targetUnitOfMeasure,
        } = requestData;

        const normalizedInputNumericalValue = inputNumericalValue ? Number(inputNumericalValue) : null;
        const normalizedInputUnitOfMeasure = inputUnitOfMeasure ? inputUnitOfMeasure.toLowerCase() : null;
        const normalizedStudentResponse = studentResponse ? convertAndRoundValue(Number(studentResponse)) : null;
        const normalizedTargetUnitOfMeasure = targetUnitOfMeasure ? targetUnitOfMeasure.toLowerCase() : null;

        // Get the converted value
        if (
            normalizedInputNumericalValue &&
            normalizedInputUnitOfMeasure &&
            normalizedTargetUnitOfMeasure &&
            normalizedStudentResponse
        ) {
            const convertedValue = convertValue(
                normalizedInputNumericalValue,
                normalizedInputUnitOfMeasure,
                normalizedTargetUnitOfMeasure
            );

            // Return an invalid response if the conversion failed
            if (convertedValue === null) {
                return invalidOutput({ message: ERRORS.conversionFailed });
            }
        
            // Calculate the correctness of the student response against the converted value
            const isResponseCorrect = isCorrect(normalizedStudentResponse, convertedValue);

            // Return a response based on correctness evaluation
            return new Response(
                JSON.stringify({
                    output: isResponseCorrect ? Output.CORRECT : Output.INCORRECT,
                    conversion: convertedValue.toString(),
                }),
                { status: 200, headers }
            );
        }

        // Return an invalid response if any of the input values (student response or converted value)
        // is missing or is incorrect format
        return invalidOutput({ message: ERRORS.conversionFailed });
    } catch (error) {
        let message = ERRORS.internalServerError;
        let status = 500;

        if (error instanceof Error) {
            message = error.message;
            status = 400; // Bad Request
        }

        return invalidOutput({ status, message });
    }
}

/**
 * Creates a Response indicating that the HTTP method used is not allowed.
 * 
 * @returns A Response object with a status of 405 (Method Not Allowed)
 *          and includes the allowed HTTP methods in the 'Allow' header.
 */
function methodNotAllowed() {
    return new Response(
        JSON.stringify({ message: ERRORS.methodNotAllowed }), 
        {
            status: 405,
            headers: {
                ...headers,
                'Allow': 'POST',
            },
        }
    );
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
