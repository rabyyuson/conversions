'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '@/app/ui/sidebar';
import Main from '@/app/ui/main';
import NotFound from '@/app/ui/not-found';
import Dropdown from '@/app/unit-conversion/dropdown';
import { ALLOWED, ERRORS, UNITS } from '@/app/lib/constants';
import { ResultProps } from '@/app/lib/types';
import Modal from '@/app/unit-conversion/modal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Unit component responsible for unit conversion.
 * @param type The type of unit conversion.
 */
export default function Unit({ type }: { type: keyof typeof UNITS }) {
    // State variables to manage user inputs and conversion results
    const [inputNumericalValue, setInputNumericalValue] = useState('');
    const [inputUnitOfMeasure, setInputUnitOfMeasure] = useState('');
    const [targetUnitOfMeasure, setTargetUnitOfMeasure] = useState('');
    const [studentResponse, setStudentResponse] = useState('');
    const [results, setResults] = useState<ResultProps | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Fetches conversion results from the API based on user inputs.
    const fetchConversionResults = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/unit-conversion`, {
                method: 'POST',
                headers: { ...ALLOWED.headers },
                body: JSON.stringify({
                    inputNumericalValue,
                    inputUnitOfMeasure,
                    targetUnitOfMeasure,
                    studentResponse,
                }),
            });

            if (response.ok) {
                setResults(await response.json());
            } else {
                throw new Error(ERRORS.failedConversionResults);
            }
        } catch (error) {
            console.error(`${ERRORS.failedConversionResults} `, error);
        }
    };

    // Event handlers for input changes
    const handleInputUnitOfMeasure = (value: string) => setInputUnitOfMeasure(value);
    const handleTargetUnitOfMeasure = (value: string) => setTargetUnitOfMeasure(value);
    const handleInputNumericalValueChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInputNumericalValue(event.target.value);
    const handleStudentResponseChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setStudentResponse(event.target.value);

    // Submits the conversion request and shows the modal
    const handleSubmit = async () => {
        await fetchConversionResults();
        setShowModal(true);
    }

    // Reset the form to its original state
    const resetForm = useCallback(() => {
        setInputNumericalValue('');
        setStudentResponse('');
        setInputUnitOfMeasure(UNITS[type]?.[0]?.name || '');
        setTargetUnitOfMeasure(UNITS[type]?.[1]?.name || '');
    }, [type])

    // Set default unit measures on component mount or when 'type' changes
    useEffect(() => resetForm(), [resetForm]);

    // Toggle the modal display
    const toggleModal = () => setShowModal(!showModal);

    // Render the form fields
    const renderForm = () => {
        return (
            <div className='bg-white w-full lg:w-1/2 h-full rounded-lg p-8 lg:mr-4'>
                <div className='sm:col-span-3'>
                    <label htmlFor='inputNumericalValue' className='block text-sm font-medium leading-6 text-gray-900'>
                        Value
                    </label>
                    <div className='mt-2'>
                        <input
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            name='inputNumericalValue'
                            type='number'
                            step='1'
                            placeholder='Enter the value to convert'
                            value={inputNumericalValue}
                            onChange={handleInputNumericalValueChange}
                        />
                    </div>
                </div>
                <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                        <label htmlFor='inputUnitOfMeasure' className='block text-sm font-medium leading-6 text-gray-900'>
                            From
                        </label>
                        <div className='mt-2'>
                            <Dropdown
                                list={UNITS[type]}
                                handleUnitChange={handleInputUnitOfMeasure}
                                value={inputUnitOfMeasure}
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-3'>
                        <label htmlFor='targetUnitOfMeasure' className='block text-sm font-medium leading-6 text-gray-900'>
                            To
                        </label>
                        <div className='mt-2'>
                            <Dropdown
                                list={UNITS[type]}
                                handleUnitChange={handleTargetUnitOfMeasure}
                                value={targetUnitOfMeasure}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-4 sm:col-span-3'>
                    <label htmlFor='studentResponse' className='block text-sm font-medium leading-6 text-gray-900'>
                        Student Response
                    </label>
                    <div className='mt-2'>
                        <input
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            name='studentResponse'
                            type='number'
                            step='1'
                            placeholder='Enter the student response'
                            value={studentResponse}
                            onChange={handleStudentResponseChange}
                        />
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-4'>
                    <button
                        type='button'
                        className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                    <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        onClick={handleSubmit}
                    >
                        Convert
                    </button>
                </div>
            </div>
        );
    }

    // Render the table chart
    const renderResources = () => {
        return (
            <div className='mt-8 lg:mt-0 bg-white w-full lg:w-1/2 h-full rounded-lg p-4 lg:ml-4 overflow-x-auto text-sm'>
                <h3 className='text-lg font-semibold mb-4'>Instructions</h3>
                <p className='text-sm text-gray-600 mb-4'>
                    Enter a value to convert in the "Value" field. Choose the unit you're converting from in the "From" dropdown, and select the unit you want to convert to in the "To" dropdown.
                </p>
                <p className='text-sm text-gray-600 mb-4'>
                    Click the "Convert" button to perform the conversion. Use the "Reset" button to clear the form and start over.
                </p>
                <p className='text-sm text-gray-600 mb-4'>
                    After clicking "Convert," a modal will appear displaying the conversion result and additional information.
                </p>
                <h3 className='text-lg font-semibold mb-4'>Resources</h3>
                <p className='text-gray-600 mb-4'>
                    If you need help understanding unit conversions, check out these resources:
                </p>
                <ul className='list-disc pl-4 text-gray-600'>
                    <li>
                        <a
                            href='https://www.mathsisfun.com/measure/converting-lengths.html'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-indigo-600 hover:underline'
                        >
                            Length Conversions - MathsIsFun
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://www.omnicalculator.com/physics/unit-conversion'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-indigo-600 hover:underline'
                        >
                            Unit Converter - OmniCalculator
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://www.calculatorsoup.com/calculators/conversions/index.php'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-indigo-600 hover:underline'
                        >
                            Conversions Calculator - CalculatorSoup
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://unitchefs.com/volume/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-indigo-600 hover:underline'
                        >
                            Volume Conversions - UnitChefs
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-indigo-600 hover:underline'
                        >
                            Temperature Scales Conversion - Wikipedia
                        </a>
                    </li>
                </ul>
                <p className='text-gray-600 mt-4'>
                    Exploring these resources can provide formulas, explanations, and practical examples for better understanding.
                </p>
                <p className='text-gray-600 mt-4'>
                    Remember, unit conversions involve transforming one unit of measure into another. These resources offer diverse approaches to simplify complex conversions.
                </p>
            </div>
        );
    }

    // Render the modal
    const renderModal = () => {
        return (
            <Modal
                output={results?.output}
                conversion={results?.conversion}
                studentResponse={studentResponse}
                message={results?.message}
                toggleModal={toggleModal}
            />
        );
    }

    // Render the unit
    const renderUnit = () => {
        return (
            <div className='lg:flex'>
                {renderForm()}
                {renderResources()}
                {showModal && renderModal()}
            </div>
        );
    }

    return (
        <>
            <Sidebar/>
            <Main>
                {UNITS[type]
                    ? renderUnit()
                    : <NotFound/>
                }
            </Main>
        </>
    );
}
