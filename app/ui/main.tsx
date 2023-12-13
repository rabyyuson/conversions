import { MainProps } from '@/app/lib/types';

/**
 * Main layout component for Conversions application.
 * 
 * This component defines the layout for the main content, encompassing
 * the provided children components or elements.
 * 
 * @param children The child components or elements to be rendered within the main layout
 * @returns The main layout component with children elements
 */
export default function Main({ children }: MainProps) {
    return (
        <main className='w-full p-8 bg-[#f2f3f5]'>
            {children}
            <p className='text-xs text-[#a0a0a0] mt-8'><a target='_blank' href='https://rabyyuson.dev/'>&copy; Copyright 2023 <b>Raby Yuson</b></a></p>
        </main>
    );
}
