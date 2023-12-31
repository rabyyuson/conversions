import { UNITS } from './constants';
import { TemperatureUnit, VolumeUnitProps } from '@/app/lib/types';

export class Temperature {
    unit: TemperatureUnit;
  
    constructor(unit: TemperatureUnit) {
      this.unit = unit;
    }
  
    /**
     * Retrieves the symbol associated with the temperature unit.
     * 
     * @returns The symbol for the temperature unit or undefined if the unit name is not found
     */
    getSymbol(): string | undefined {
        const unit = UNITS.temperature.find(unit => unit.name === this.unit.name);
        return unit ? unit.symbol : undefined;
    }

    /**
     * Method to convert a value to another temperature unit.
     * Formulas are taken from https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature.
     * 
     * @param targetUnit The target temperature unit for conversion
     * @param value The value to be converted
     * @returns The converted value or null if the conversion is not supported
     */
    convertTo(targetUnit: TemperatureUnit, value: number): number | null {
        const { name } = this.unit;
        const { name: targetName } = targetUnit;

        const normalizedName = name.toLowerCase();
        const normalizedTargetName = targetName.toLowerCase();

        switch (normalizedName) {
            case 'celsius':
                switch (normalizedTargetName) {
                    // Celsius to Fahrenheit
                    case 'fahrenheit':
                        return ((value * 9) / 5) + 32;
                    
                    // Celsius to Kelvin
                    case 'kelvin':
                        return value + 273.15;
                    
                    // Celsius to Rankine
                    case 'rankine':
                        return ((value + 273.15) * 9) / 5;
                    
                    default:
                        break;
                }
                break;
    
            case 'fahrenheit':
                switch (normalizedTargetName) {
                    // Fahrenheit to Celsius
                    case 'celsius':
                        return ((value - 32) * 5) / 9;
                    
                    // Fahrenheit to Kelvin
                    case 'kelvin':
                        return ((value + 459.67) * 5) / 9;
                    
                    // Fahrenheit to Rankine
                    case 'rankine':
                        return value + 459.67;
                    
                    default:
                        break;
                }
                break;
    
            case 'kelvin':
                switch (normalizedTargetName) {
                    // Kelvin to Celsius
                    case 'celsius':
                        return value - 273.15;
                    
                    // Kelvin to Fahrenheit
                    case 'fahrenheit':
                        return ((value * 9) / 5) - 459.67;
                    
                    // Kelvin to Rankine
                    case 'rankine':
                        return value * (9 / 5);
                    
                    default:
                        break;
                }
                break;
    
            case 'rankine':
                switch (normalizedTargetName) {
                    // Rankine to Celsius
                    case 'celsius':
                        return (value - 491.67) * (5 / 9);
                    
                    // Rankine to Fahrenheit
                    case 'fahrenheit':
                        return value - 459.67;
                    
                    // Rankine to Kelvin
                    case 'kelvin':
                        return (value * 5) / 9;
                    
                    default:
                        break;
                }
                break;
            
            default:
                break;
        }
    
        return null; // Conversion not supported
    }
  }
  
export class Volume {
    unit: VolumeUnitProps;
  
    constructor(unit: VolumeUnitProps) {
      this.unit = unit;
    }
  
    /**
     * Retrieves the symbol associated with the volume unit.
     * 
     * @returns The symbol for the volume unit or undefined if the unit name is not found
     */
    getSymbol(): string | undefined {
        const unit = UNITS.volume.find(unit => unit.name === this.unit.name);
        return unit ? unit.symbol : undefined;
    }

    /**
     * Method to convert a value to another volume unit.
     * Formulas are taken from https://unitchefs.com/volume/.
     * 
     * @param targetUnit The target volume unit for conversion
     * @param value The numerical value to be converted
     * @returns The converted value or null if the conversion is not supported
     */
    convertTo(targetUnit: VolumeUnitProps, value: number): number | null {
        const { name } = this.unit;
        const { name: targetName } = targetUnit;

        const normalizedName = name.toLowerCase();
        const normalizedTargetName = targetName.toLowerCase();

        switch (normalizedName) {
            case 'cubic-feet':
                switch (normalizedTargetName) {
                    // Cubic feet to cubic inches
                    case 'cubic-inches':
                        return value * 1728; // 1 cubic foot = 1728 cubic inches
    
                    // Cubic feet to cups
                    case 'cups':
                        return value * 119.6883; // 1 cubic foot = 119.6883 cups
    
                    // Cubic feet to gallons
                    case 'gallons':
                        return value * 7.4805; // 1 cubic foot = 7.4805 gallons
    
                    // Cubic feet to liters
                    case 'liters':
                        return value * 28.3168; // 1 cubic foot = 28.3168 liters
    
                    // Cubic feet to tablespoons
                    case 'tablespoons':
                        return value * 1915; // 1 cubic foot = 1915 tablespoons
    
                    default:
                        break;
                }
                break;
    
            case 'cubic-inches':
                switch (normalizedTargetName) {
                    // Cubic inches to cubic feet
                    case 'cubic-feet':
                        return value * 0.0005787; // 1 cubic inch = 0.0005787 cubic feet
    
                    // Cubic inches to cups
                    case 'cups':
                        return value * 0.0693; // 1 cubic inch = 0.0693 cups
    
                    // Cubic inches to gallons
                    case 'gallons':
                        return value * 0.004329; // 1 cubic inch = 0.004329 gallons
    
                    // Cubic inches to liters
                    case 'liters':
                        return value * 0.0164; // 1 cubic inch = 0.0164 liters
    
                    // Cubic inches to tablespoons
                    case 'tablespoons':
                        return value * 1.1082; // 1 cubic inch = 1.1082 tablespoons
    
                    default:
                        break;
                }
                break;
    
            case 'cups':
                switch (normalizedTargetName) {
                    // Cups to cubic feet
                    case 'cubic-feet':
                        return value * 0.008355; // 1 cup = 0.008355 cubic feet
    
                    // Cups to cubic inches
                    case 'cubic-inches':
                        return value * 14.4375; // 1 cup = 14.4375 cubic inches
    
                    // Cups to gallons
                    case 'gallons':
                        return value * 0.0625; // 1 cup = 0.0625 gallons
    
                    // Cups to liters
                    case 'liters':
                        return value * 0.2366; // 1 cup = 0.2366 liters
    
                    // Cups to tablespoons
                    case 'tablespoons':
                        return value * 16; // 1 cup = 16 tablespoons
    
                    default:
                        break;
                }
                break;
    
            case 'gallons':
                switch (normalizedTargetName) {
                    // Gallons to cubic feet
                    case 'cubic-feet':
                        return value * 0.1337; // 1 gallon = 0.1337 cubic feet
    
                    // Gallons to cubic inches
                    case 'cubic-inches':
                        return value * 231; // 1 gallon = 231 cubic inches
    
                    // Gallons to cups
                    case 'cups':
                        return value * 16; // 1 gallon = 16 cups
    
                    // Gallons to liters
                    case 'liters':
                        return value * 3.7854; // 1 gallon = 3.7854 liters
    
                    // Gallons to tablespoons
                    case 'tablespoons':
                        return value * 256; // 1 gallon = 256 tablespoons
    
                    default:
                        break;
                }
                break;
    
            case 'liters':
                switch (normalizedTargetName) {
                    // Liters to cubic feet
                    case 'cubic-feet':
                        return value * 0.0353; // 1 liter = 0.0353 cubic feet
    
                    // Liters to cubic inches
                    case 'cubic-inches':
                        return value * 61.0237; // 1 liter = 61.0237 cubic inches
    
                    // Liters to cups
                    case 'cups':
                        return value * 4.2268; // 1 liter = 4.2268 cups
    
                    // Liters to gallons
                    case 'gallons':
                        return value * 0.2642; // 1 liter = 0.2642 gallons
    
                    // Liters to tablespoons
                    case 'tablespoons':
                        return value * 67.628; // 1 liter = 67.628 tablespoons
    
                    default:
                        break;
                }
                break;
    
            case 'tablespoons':
                switch (normalizedTargetName) {
                    // Tablespoons to cubic feet
                    case 'cubic-feet':
                        return value * 0.00052219; // 1 tablespoon = 0.00052219 cubic feet
    
                    // Tablespoons to cubic inches
                    case 'cubic-inches':
                        return value * 0.9023; // 1 tablespoon = 0.9023 cubic inches
    
                    // Tablespoons to cups
                    case 'cups':
                        return value * 0.0625; // 1 tablespoon = 0.0625 cups
    
                    // Tablespoons to gallons
                    case 'gallons':
                        return value * 0.003906; // 1 tablespoon = 0.003906 gallons
    
                    // Tablespoons to liters
                    case 'liters':
                        return value * 0.0148; // 1 tablespoon = 0.0148 liters
    
                    default:
                        break;
                }
                break;
    
            default:
                break;
        }

        return null; // Conversion not supported
    }
}
