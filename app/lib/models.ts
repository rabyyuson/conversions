export const UNITS = {
    temperatures: ['celsius', 'fahrenheit', 'kelvin', 'rankine'],
    volumes: ['cubic-feet', 'cubic-inches', 'cups', 'gallons', 'liters', 'tablespoons'],
}

type UnitType = typeof UNITS;

interface TemperatureUnit {
    name: UnitType['temperatures'][number];
    symbol: string;
}

interface VolumeUnit {
    name: UnitType['volumes'][number];
    symbol: string;
}

export class Temperature {
    unit: TemperatureUnit;
  
    constructor(unit: TemperatureUnit) {
      this.unit = unit;
    }
  
    // Method to get the symbol of the unit
    getSymbol(): string {
      return this.unit.symbol;
    }

    // Method to convert a value to another temperature unit
    convertTo(targetUnit: TemperatureUnit, value: number): number | null {
        const { name } = this.unit;
        const { name: targetName } = targetUnit;

        const normalizedName = name.toLowerCase();
        const normalizedTargetName = targetName.toLowerCase();

        // Celsius conversions
        if (normalizedName === 'celsius') {
            // Celsius to Fahrenheit
            if (normalizedTargetName === 'fahrenheit') {
                return (value * 9) / 5 + 32;
            }

            // Celsius to Kelvin
            if (normalizedTargetName === 'kelvin') {
                return value + 273.15;
            }

            // Celsius to Rankine
            if (normalizedTargetName === 'rankine') {
                return (value + 273.15) * (9 / 5);
            }
        }

        // Fahrenheit conversions
        if (normalizedName === 'fahrenheit') {
            // Fahrenheit to Celsius
            if (normalizedTargetName === 'celsius') {
                return ((value - 32) * 5) / 9;
            }

            // Fahrenheit to Kelvin
            if (normalizedTargetName === 'kelvin') {
                return ((value - 32) * 5) / 9 + 273.15;
            }

            // Fahrenheit to Rankine
            if (normalizedTargetName === 'rankine') {
                return value + 459.67;
            }
        }
        
        // Kelvin conversions
        if (normalizedName === 'kelvin') {
            // Kelvin to Celsius
            if (normalizedTargetName === 'celsius') {
                return value - 273.15;
            }

            // Kelvin to Fahrenheit
            if (normalizedTargetName === 'fahrenheit') {
                return ((value - 273.15) * 9) / 5 + 32;
            }

            // Kelvin to Rankine
            if (normalizedTargetName === 'rankine') {
                return value * (9 / 5);
            }
        }

        // Rankine conversions
        if (normalizedName === 'rankine') {
            // Rankine to Celsius
            if (normalizedTargetName === 'celsius') {
                return (value - 491.67) * (5 / 9);
            }

            // Rankine to Fahrenheit
            if (normalizedTargetName === 'fahrenheit') {
                return value - 459.67;
            }

            // Rankine to Kelvin
            if (normalizedTargetName === 'kelvin') {
                return value * (5 / 9);
            }
        }
        
        return null; // Conversion not supported
    }
  }
  
export class Volume {
    unit: VolumeUnit;
  
    constructor(unit: VolumeUnit) {
      this.unit = unit;
    }
  
    // Method to get the symbol of the unit
    getSymbol(): string {
      return this.unit.symbol;
    }

    // Method to convert a value to another volume unit
    convertTo(targetUnit: VolumeUnit, value: number): number | null {
        const { name } = this.unit;
        const { name: targetName } = targetUnit;

        const normalizedName = name.toLowerCase();
        const normalizedTargetName = targetName.toLowerCase();

        // Cubic feet conversions
        if (normalizedName === 'cubic-feet') {
            // Cubic feet to cubic inches
            if (normalizedTargetName === 'cubic-inches') {
                return value * 1728; // 1 cubic foot = 1728 cubic inches
            }

            // Cubic feet to cups
            if (normalizedTargetName === 'cups') {
                return value * 119.688; // 1 cubic foot = 119.688 cups
            }

            // Cubic feet to gallons
            if (normalizedTargetName === 'gallons') {
                return value * 7.48052; // 1 cubic foot = 7.48052 gallons
            }

            // Cubic feet to liters
            if (normalizedTargetName === 'liters') {
                return value * 28.3168; // 1 cubic foot = 28.3168 liters
            }

            // Cubic feet to tablespoons
            if (normalizedTargetName === 'tablespoons') {
                return value * 1915.01; // 1 cubic foot = 1915.01 tablespoons
            }
        }

        // Cubic inches conversions
        if (normalizedName === 'cubic-inches') {
            // Cubic inches to cubic feet
            if (normalizedTargetName === 'cubic-feet') {
                return value / 1728; // 1 cubic inch = 1/1728 cubic feet
            }

            // Cubic inches to cups
            if (normalizedTargetName === 'cups') {
                return value / 14.4375; // 1 cubic inch = 0.554113 cups
            }

            // Cubic inches to gallons
            if (normalizedTargetName === 'gallons') {
                return value / 231; // 1 cubic inch = 0.004329 gallons
            }

            // Cubic inches to liters
            if (normalizedTargetName === 'liters') {
                return value / 61.0237; // 1 cubic inch = 0.0163871 liters
            }

            // Cubic inches to tablespoons
            if (normalizedTargetName === 'tablespoons') {
                return value * 1.10823; // 1 cubic inch = 1.10823 tablespoons
            }
        }

        // Cups conversions
        if (normalizedName === 'cups') {
             // Cups to cubic feet
            if (normalizedTargetName === 'cubic-feet') {
                return value / 119.688; // 1 cup = 0.00835503 cubic feet
            }

            // Cups to cubic inches
            if (normalizedTargetName === 'cubic-inches') {
                return value * 14.4375; // 1 cup = 14.4375 cubic inches
            }

            // Cups to gallons
            if (normalizedTargetName === 'gallons') {
                return value / 16; // 1 cup = 0.0625 gallons
            }

            // Cups to liters
            if (normalizedTargetName === 'liters') {
                return value / 4.22675; // 1 cup = 0.236588 liters
            }

            // Cups to tablespoons
            if (normalizedTargetName === 'tablespoons') {
                return value * 16; // 1 cup = 16 tablespoons
            }
        }

        // Gallons conversions
        if (normalizedName === 'gallons') {
            // Gallons to cubic feet
            if (normalizedTargetName === 'cubic-feet') {
                return value / 7.48052; // 1 gallon = 0.133681 cubic feet
            }

            // Gallons to cubic inches
            if (normalizedTargetName === 'cubic-inches') {
                return value * 231; // 1 gallon = 231 cubic inches
            }

            // Gallons to cups
            if (normalizedTargetName === 'cups') {
                return value * 16; // 1 gallon = 16 cups
            }

            // Gallons to liters
            if (normalizedTargetName === 'liters') {
                return value * 3.78541; // 1 gallon = 3.78541 liters
            }

            // Gallons to tablespoons
            if (normalizedTargetName === 'tablespoons') {
                return value * 256; // 1 gallon = 256 tablespoons
            }
        }

        // Liters conversions
        if (normalizedName === 'liters') {
            // Liters to cubic feet
            if (normalizedTargetName === 'cubic-feet') {
                return value / 28.3168; // 1 liter = 0.0353147 cubic feet
            }

            // Liters to cubic inches
            if (normalizedTargetName === 'cubic-inches') {
                return value * 61.0237; // 1 liter = 61.0237 cubic inches
            }

            // Liters to cups
            if (normalizedTargetName === 'cups') {
                return value * 4.22675; // 1 liter = 4.22675 cups
            }

            // Liters to gallons
            if (normalizedTargetName === 'gallons') {
                return value / 3.78541; // 1 liter = 0.264172 gallons
            }

            // Liters to tablespoons
            if (normalizedTargetName === 'tablespoons') {
                return value * 67.628; // 1 liter = 67.628 tablespoons
            }
        }

        // Tablespoons conversions
        if (normalizedName === 'tablespoons') {
            // Tablespoons to cubic feet
            if (normalizedTargetName === 'cubic-feet') {
                return value / 1915.01; // 1 tablespoon = 0.00052219 cubic feet
            }

            // Tablespoons to cubic inches
            if (normalizedTargetName === 'cubic-inches') {
                return value / 1.10823; // 1 tablespoon = 0.902344 cubic inches
            }

            // Tablespoons to cups
            if (normalizedTargetName === 'cups') {
                return value / 16; // 1 tablespoon = 0.0625 cups
            }

            // Tablespoons to gallons
            if (normalizedTargetName === 'gallons') {
                return value / 256; // 1 tablespoon = 0.00390625 gallons
            }

            // Tablespoons to liters
            if (normalizedTargetName === 'liters') {
                return value / 67.628; // 1 tablespoon = 0.0147868 liters
            }
        }

        return null; // Conversion not supported
    }
}
