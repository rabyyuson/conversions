import Link from 'next/link';

export default function Navigation() {
    return (
        <>
            <Link href='/' className='underline'>Home</Link>&nbsp;|&nbsp;
            <Link href='/unit-conversion/temperature/' className='underline'>Temperature Conversion</Link>&nbsp;|&nbsp;
            <Link href='/unit-conversion/volume/' className='underline'>Volume Conversion</Link>
            <br/><br/>
        </>
    );
}
