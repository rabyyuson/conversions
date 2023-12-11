export default function Home() {
    return (
        <div className='flex'>
          <div className='bg-white w-full h-full rounded-lg p-8'>
            <h2 className='text-2xl font-semibold mb-4'>Welcome to Conversions!</h2>
                <p className='text-gray-600 mb-8'>
                    At Conversions, we provide a seamless tool for science teachers and students to tackle unit conversion problems efficiently. Our application provides an easy way to input student responses and receive instant feedback on correctness, helping educators efficiently evaluate submissions. We prioritize clean, maintainable, and production-quality code and our approach focuses on multiple dimensions of code functionality.
                </p>
                <div className="w-full h-full">
                    <video controls className="w-full h-full" poster="/home/poster.png">
                        <source src="/home/conversions-walkthrough.mov" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <h3 className='text-xl font-semibold mb-3 mt-8'>Instructions</h3>
                <p className='text-gray-600 mb-4'>
                    To get started, click on the sidebar links to navigate to specific unit conversion sections:
                </p>
                <ul className='list-disc pl-6 mb-6'>
                    <li className='text-gray-600 mb-2'>
                        <strong>Temperature:</strong> Selecting &quot;Temperature&quot; will lead you to the temperature conversion section, allowing conversions between Celsius, Fahrenheit, Kelvin, and Rankine scales.
                    </li>
                    <li className='text-gray-600 mb-2'>
                        <strong>Volume:</strong> Explore the &quot;Volume&quot; link to convert volume measurements including Cubic Feet, Cubic Inches, Cups, Gallons, Liters, and Tablespoons.
                    </li>
                </ul>
                <h3 className='text-xl font-semibold mb-3'>What to Expect</h3>
                <p className='text-gray-600 mb-4'>
                    In each section, you&quot;ll find user-friendly forms to input values and select units. After filling the required fields, click the &quot;Convert&quot; button to get accurate conversion results.
                </p>
                <p className='text-gray-600 mb-4'>
                    Additionally, a modal will display the converted value and possibly additional information related to the specific conversion.
                </p>
          </div>
        </div>
    );
}
