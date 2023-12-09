'use client';

import { Units } from '@/app/lib/types';
import { capitalize } from '@/app/lib/utils';

export default function Dropdown({ list }: { list: Units }) {
    return (
        <>
            <select
                className='border'
                onChange={(element) => {
                    console.log(element)
                }}
            >
                {list.map((item, index) => {
                    return (
                        <option
                            key={`${item.name}-${index}`}
                            value={item.name}
                        >{capitalize(item.name)}</option>
                    );
                })}
            </select>
        </>
    );
}