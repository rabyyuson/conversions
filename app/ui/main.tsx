import { MainProps } from '@/app/lib/types';

export default function Main({ children }: MainProps) {
    return (
        <main className='w-4/5 p-4'>
            {children}
        </main>
    );
}
