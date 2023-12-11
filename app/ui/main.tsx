import { MainProps } from '@/app/lib/types';

export default function Main({ children }: MainProps) {
    return (
        <main className='w-full p-8 bg-[#f2f3f5]'>
            {children}
        </main>
    );
}
