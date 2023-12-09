import { UNITS } from '@/app/lib/constants';
import Navigation from '@/app/ui/navigation';
import Dropdown from '@/app/unit-conversion/dropdown';
import { capitalize } from '@/app/lib/utils';

export default function Unit({ type }: { type: keyof typeof UNITS }) {
    return (
        <>
            <Navigation/>
            <h1>{capitalize(type)} Conversion</h1>
            <br/>
            <input
                id='valueToConvert'
                name='valueToConvert'
                type='number'
                step='0.01'
                className='border'
                placeholder='Enter the value to convert'
            />
            <br/>
            From: {<Dropdown list={UNITS[type]} />}
            <br/>
            To: {<Dropdown list={UNITS[type]} />}
            <br/>
            <input
                id='studentResponse'
                name='studentResponse'
                type='number'
                step='0.01'
                className='border'
                placeholder='Enter the student response'
            />
        </>
    );
}
