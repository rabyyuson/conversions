'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/ui/sidebar';
import Main from '@/app/ui/main';
import NotFound from '@/app/ui/not-found';
import Dropdown from '@/app/unit-conversion/dropdown';
import { ALLOWED, ERRORS, UNITS } from '@/app/lib/constants';
import { capitalize } from '@/app/lib/utils';
import { Result } from '@/app/lib/types';

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
    const [results, setResults] = useState<Result | null>(null);

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

    // Submits the conversion request.
    const handleSubmit = async () => await fetchConversionResults();

    // Set default unit measures on component mount or when 'type' changes
    useEffect(() => {
        setInputUnitOfMeasure(UNITS[type]?.[0]?.name || '');
        setTargetUnitOfMeasure(UNITS[type]?.[1]?.name || '');
    }, [type]);

    // Render the default unit form
    const renderUnitForm = () => {
        return (
            <>
                <h2 className='text-xl font-bold mb-4'>{capitalize(type)} Conversion</h2>
                <br />
                Value to convert: 
                <input
                    className='border'
                    name='inputNumericalValue'
                    type='number'
                    step='1'
                    placeholder='Enter the value to convert'
                    value={inputNumericalValue}
                    onChange={handleInputNumericalValueChange}
                />
                <br />
                From: 
                <Dropdown
                    list={UNITS[type]}
                    handleUnitChange={handleInputUnitOfMeasure}
                    value={inputUnitOfMeasure}
                />
                <br />
                To: 
                <Dropdown
                    list={UNITS[type]}
                    handleUnitChange={handleTargetUnitOfMeasure}
                    value={targetUnitOfMeasure}
                />
                <br />
                Student response: 
                <input
                    className='border'
                    name='studentResponse'
                    type='number'
                    step='1'
                    placeholder='Enter the student response'
                    value={studentResponse}
                    onChange={handleStudentResponseChange}
                />
                <br /><br />
                <input
                    className='border'
                    type='submit'
                    value='Convert'
                    onClick={handleSubmit}
                />
                <br/><br/>
                {results?.output && `${capitalize(results.output)}! `}
                {results?.conversion && (
                    <>
                        The conversion result is&nbsp;
                        <b>{results.conversion}</b>
                    </>
                )}
                {results?.message}
            </>
        );
    }

    return (
        <>
            <Sidebar/>
            <Main>
                {UNITS[type] ? renderUnitForm() : <NotFound/>}
            </Main>
        </>
    );
}
