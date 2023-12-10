import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className='w-1/4 bg-gray-200 p-4'>
            <h2 className='text-xl font-bold mb-4'>Sidebar</h2>
            <ul>
                <li className='mb-2'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='mb-2'>
                    <Link href='/unit-conversion/temperature/'>Temperature Conversion</Link>
                </li>
                <li className='mb-2'>
                    <Link href='/unit-conversion/volume/'>Volume Conversion</Link>
                </li>
            </ul>
        </div>
    );
}
