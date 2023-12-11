import { MainProps } from '@/app/lib/types';

export default function Main({ children }: MainProps) {
    return (
        <main className='w-full p-8 bg-[#f2f3f5]'>
            {children}
            <p className='text-xs text-[#a0a0a0] mt-6'><a target='_blank' href='https://rabyyuson.dev/'>&copy; Copyright 2023 <b>Raby Yuson</b></a></p>
        </main>
    );
}
