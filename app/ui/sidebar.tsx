'use client';

import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/app/ui/sidebar.module.css';
import { SidebarLinkProps } from '@/app/lib/types';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Sidebar() {
    const pathname = usePathname();

    // Check if the given path matches the current pathname.
    const isActivePath = (path: string) => pathname === path;

    const renderLink = ({ path, label, icon }: SidebarLinkProps) => {
        return (
            <Link
                href={path}
                className={clsx(
                    'cursor-pointer mb-2 text-sm flex items-center w-100% inline-block px-4 py-3 rounded-lg',
                    isActivePath(path) ? styles.active : styles.inactive
                )}
            >
                <Image
                    src={isActivePath(path) ? `/sidebar/${icon}-active.svg` : `/sidebar/${icon}-inactive.svg`}
                    width={20}
                    height={20}
                    className='mr-2'
                    alt='Sidebar link icon'
                />
                <span>
                    {label}
                </span>
            </Link>
        );
    }

    return (
        <div className='w-1/5 p-4'>
            <h2 className='text-xl font-bold mb-4 flex'>
                <Image
                    src='/sidebar/logo.png'
                    width={35}
                    height={35}
                    alt='Sidebar logo'
                />
                <span className='text-base uppercase font-medium ml-[10px] mt-[7px]'>
                    Conversions
                </span>
            </h2>
            <ul>
                <li>
                    {renderLink({ path: '/', label: 'Home', icon: 'home' })}
                </li>
                <li className='border-[#e4e5ec] border-1 border-b w-100% my-2'></li>
                <li>
                    {renderLink({ path: '/unit-conversion/temperature', label: 'Temperature', icon: 'thermometer' })}
                </li>
                <li>
                    {renderLink({ path: '/unit-conversion/volume', label: 'Volume', icon: 'measuring-cup' })}
                </li>
            </ul>
        </div>
    );
}
