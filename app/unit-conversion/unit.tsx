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

    /**
     * Fetches conversion results from the API based on user inputs.
     * If successful, sets the results in the component state.
     * If unsuccessful, logs an error.
     */
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

    /**
     * Renders the form fields for inputting values and selecting units for conversion.
     * Allows users to input numerical values, select conversion units, and submit conversions.
     */
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
                            step='0.1'
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
                            step='0.1'
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

    /**
     * Renders instructional content and external resources for unit conversion.
     * Provides instructions on inputting values, performing conversions, and offers external resources for assistance.
     */
    const renderResources = () => {
        return (
            <div className='mt-8 lg:mt-0 bg-white w-full lg:w-1/2 h-full rounded-lg p-8 lg:ml-4 overflow-x-auto text-sm'>
                <h3 className='text-lg font-semibold mb-4'>Instructions</h3>
                <p className='text-sm text-gray-600 mb-4'>
                    Enter a value to convert in the &quot;Value&quot; field. Choose the unit you&apos;re converting from in the &quot;From&quot; dropdown, and select the unit you want to convert to in the &quot;To&quot; dropdown.
                </p>
                <p className='text-sm text-gray-600 mb-4'>
                    Click the &quot;Convert&quot; button to perform the conversion. Use the &quot;Reset&quot; button to clear the form and start over.
                </p>
                <p className='text-sm text-gray-600 mb-4'>
                    After clicking &quot;Convert,&quot; a modal will appear displaying the conversion result and additional information.
                </p>
                <h3 className='text-lg font-semibold mb-4'>Resources</h3>
                <p className='text-gray-600 mb-4'>
                    If you need help understanding unit conversions, check out these resources:
                </p>
                <ul className='list-disc pl-4 text-gray-600'>
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

    /**
     * Renders the modal displaying the conversion output, student response, and additional details.
     * Uses the 'Modal' component to display the conversion results and related information.
     */
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

    /**
     * Renders the unit conversion interface.
     * Displays the form fields, resources, and modal (if shown).
     */
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
