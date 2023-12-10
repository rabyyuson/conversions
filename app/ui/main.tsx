import { MainProps } from '@/app/lib/types';

export default function Main({ children }: MainProps) {
    return (
        <main className='w-3/4 p-4'>
            {children}
        </main>
    );
}
