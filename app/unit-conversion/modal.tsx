import { useRef, useEffect } from 'react';
import { ModalProps } from '@/app/lib/types';
import { capitalize } from '@/app/lib/utils';
import incorrectAnimation from '@/public/modal/incorrect.json';
import correctAnimation from '@/public/modal/correct.json';
import LottieAnimation from '@/app/ui/lottie-animation';

export default function Modal({ output, conversion, studentResponse, message, toggleModal }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    console.log({ output, conversion, studentResponse, message, toggleModal })

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && event.target instanceof Node && !modalRef.current.contains(event.target)) {
                toggleModal();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div
            className='relative z-10'
            aria-labelledby='modal-title'
            role='dialog'
            aria-modal='true'
        >
            <div
                className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            ></div>
            <div
                className='fixed inset-0 z-10 w-screen overflow-y-auto'
                onClick={toggleModal}
                ref={modalRef}
            >
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>{capitalize(output ?? '')}</h3>
                                <div className='mt-2'>
                                    <div className='text-sm text-gray-500'>
                                        {output === 'incorrect' && (
                                            <>
                                                <div className='flex justify-center align-center'>
                                                    <LottieAnimation animationData={incorrectAnimation} />
                                                </div>
                                                <div>
                                                    The conversion result is <b>{conversion}</b> and the student&apos;s response <b>{studentResponse}</b>!
                                                </div>
                                            </>
                                        )}
                                        {output === 'invalid' && (
                                            <>
                                                <div className='flex justify-center align-center'>
                                                    <LottieAnimation animationData={incorrectAnimation} />
                                                </div>
                                                {message}
                                            </>
                                        )}
                                        {output === 'correct' && (
                                            <>
                                                <div className='flex justify-center align-center'>
                                                    <LottieAnimation animationData={correctAnimation} />
                                                </div>
                                                <div>
                                                    The conversion result is <b>{conversion}</b> and the student&apos;s response <b>{studentResponse}</b>!
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button onClick={toggleModal} type='button' className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
