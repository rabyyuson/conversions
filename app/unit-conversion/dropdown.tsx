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
            className='border'
            value={value}
            onChange={handleChange}
        >
            {list.map((item, index) => (
                <option
                    key={`${item.name}-${index}`}
                    value={item.name}
                >
                    {capitalize(item.name)}
                </option>
            ))}
        </select>
    );
}
