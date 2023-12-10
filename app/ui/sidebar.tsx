'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { isActivePath } from '@/app/lib/utils';
import styles from '@/app/ui/sidebar.module.css';
import { SidebarLinkProps } from '@/app/lib/types';

export default function Sidebar() {
    const renderLink = ({ path, label, icon }: SidebarLinkProps) => {
        return (
            <Link
                href={path}
                className={clsx(
                    'cursor-pointer mb-2 text-sm flex items-center w-100% inline-block px-4 py-2 rounded-lg',
                    isActivePath(path) ? styles.active : styles.inactive
                )}
            >
                <img
                    src={isActivePath(path) ? `/sidebar/${icon}-active.svg` : `/sidebar/${icon}-inactive.svg`}
                    width={20}
                    height={20}
                    className='mr-2'
                />
                <span>
                    {label}
                </span>
            </Link>
        );
    }

    return (
        <div className='w-1/5 bg-[#f6f7f9] border-[#ecedf7] border-1 border-r p-4'>
            <h2 className='text-xl font-bold mb-4 flex'>
                <img
                    src='/sidebar/logo.png'
                    width={50}
                    height={50}
                />
                <span className='text-base uppercase font-medium ml-2 mt-4'>
                    Conversions
                </span>
            </h2>
            <ul>
                <li>
                    {renderLink({ path: '/', label: 'Home', icon: 'home' })}
                </li>
                <li>
                    <span className='text-xs text-[#7e838b] items-center font-semibold mb-2 flex w-100% inline-block px-4 py-2 rounded-lg'>
                        Measurements
                    </span>
                </li>
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
