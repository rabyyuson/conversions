import {
    UNITS,
    Temperature,
    Volume,
} from '@/app/lib/models';

export async function POST(request: Request) {
    const contentType = request.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
        return new Response(JSON.stringify({ message: 'Content-Type should be application/json' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const requestData = await request.json();
        const {
            inputNumericalValue,
            inputUnitOfMeasure,
            targetUnitOfMeasure,
            studentResponse,
        } = requestData;

        let convertedValue: number | null = null;

        // Check if it's a temperature conversion
        if (
            UNITS.temperatures.includes(inputUnitOfMeasure.toLowerCase()) &&
            UNITS.temperatures.includes(targetUnitOfMeasure.toLowerCase())
        ) {
            const temperature = new Temperature({ name: inputUnitOfMeasure.toLowerCase(), symbol: '' });
            const targetTemperature = { name: targetUnitOfMeasure.toLowerCase(), symbol: '' };
            convertedValue = temperature.convertTo(targetTemperature, inputNumericalValue);
        }

        // Check if it's a volume conversion
        if (
            UNITS.volumes.includes(inputUnitOfMeasure.toLowerCase()) &&
            UNITS.volumes.includes(targetUnitOfMeasure.toLowerCase())
        ) {
            const volume = new Volume({ name: inputUnitOfMeasure.toLowerCase(), symbol: '' });
            const targetVolume = { name: targetUnitOfMeasure.toLowerCase(), symbol: '' };
            convertedValue = volume.convertTo(targetVolume, inputNumericalValue);
        }

        console.log(convertedValue)

        // Handle the converted value or null if conversion is not supported
        if (convertedValue) {
            return new Response(JSON.stringify({ convertedValue }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        return new Response(JSON.stringify({ message: 'Conversion not supported' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
