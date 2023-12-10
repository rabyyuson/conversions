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
                    'cursor-pointer mb-2 text-sm flex items-center w-100% inline-block px-4 py-3 rounded-lg',
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
        <div className='w-1/5 border-[#ecedf7] border-1 border-r p-4'>
            <h2 className='text-xl font-bold mb-4 flex'>
                <img
                    src='/sidebar/logo.png'
                    width={50}
                    height={50}
                />
                <span className='text-base uppercase font-medium ml-1 mt-4'>
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
