import { MainProps } from '@/app/lib/types';

export default function Main({ children }: MainProps) {
    return (
        <main className='w-4/5 p-8 bg-[#f2f3f5]'>
            {children}
        </main>
    );
}
