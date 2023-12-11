import { useRef, useEffect } from 'react';
import { ModalProps, LottieAnimationProps } from '@/app/lib/types';
import { capitalize } from '@/app/lib/utils';
import incorrectAnimation from '@/public/modal/incorrect.json';
import correctAnimation from '@/public/modal/correct.json';
import LottieAnimation from '@/app/ui/lottie-animation';
import clsx from 'clsx';
import { fredoka } from '@/app/fonts';

export default function Modal({ output, conversion, studentResponse, message, toggleModal }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

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

    const renderResults = ({ animationData }: LottieAnimationProps) => {
        return (
            <>
                <div className='md:flex items-center text-center md:text-left'>
                    <div className='w-full md:w-1/2'>
                        <h3 className={clsx(
                            'text-5xl font-semibold leading-6 mb-2',
                            fredoka.className,
                            output === 'correct'
                                ? 'text-[#24b26d]'
                                : 'text-[#ff4d4d]'
                        )}>
                            {capitalize(output ?? '')}!
                        </h3>
                        <p className={clsx(
                            'mt-7 text-base text-gray-500 text-lg',
                            fredoka.className
                        )}>
                            {message 
                                ? message
                                : (<>
                                    The result is <span className='text-[#111] text-xl tracking-wider font-semibold'>{conversion}</span> and the student&apos;s response is <span className='text-[#111] text-xl tracking-wider font-semibold'>{studentResponse}</span>.
                                </>)
                            }
                        </p>
                    </div>
                    <div className='md:ml-[-30px] w-full md:w-1/2 relative z-1'>
                        <LottieAnimation animationData={animationData} />
                    </div>
                </div>

            </>
        );
    }

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
                <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white p-6 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                    <div className='mt-2'>
                                        <div className='text-sm text-gray-500'>
                                            {output === 'correct'
                                                ? renderResults({ animationData: correctAnimation })
                                                : renderResults({ animationData: incorrectAnimation })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 relative z-10'>
                            <button
                                type='button'
                                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                onClick={toggleModal}
                                style={{ width: '100%' }}
                            >
                                Okay, try another one
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
