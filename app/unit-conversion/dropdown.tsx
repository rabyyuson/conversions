import { capitalize } from '@/app/lib/utils';
import { DropdownProps } from '@/app/lib/types';

/**
 * Dropdown component for selecting units.
 * @param list The list of units to display in the dropdown.
 * @param handleUnitChange Function to handle unit change events.
 * @param value The currently selected value in the dropdown.
 */
export default function Dropdown({ list, handleUnitChange, value }: DropdownProps) {
    /**
     * Handles the change event in the dropdown.
     * @param event The change event object.
     */
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        handleUnitChange(selectedValue);
    };

    return (
        <select
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 appearance-none'
            value={value}
            onChange={handleChange}
            style={{
                backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"%3E%3Cpath fill-rule="evenodd" d="M10 14a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 1.414-1.414L10 11.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 10 14z"/%3E%3C/svg%3E')`,
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1em',
                backgroundRepeat: 'no-repeat',
                paddingRight: '2em',
            }}
        >
            {list.map((item, index) => (
                <option
                    key={`${item.name}-${index}`}
                    value={item.name}
                >
                    {`${capitalize(item.name)} (${item.symbol})`}
                </option>
            ))}
        </select>
    );
}
