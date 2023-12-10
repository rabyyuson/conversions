import { ReactNode } from 'react';
import { UNITS } from './constants';

export type Unit = {
    name: string;
    symbol: string;
};

export type Units = Unit[];

export type TemperatureUnit = {
    name: typeof UNITS['temperature'][number]['name'];
};

export type VolumeUnit = {
    name: typeof UNITS['volume'][number]['name'];
};

export type DropdownProps = {
    list: Units;
    handleUnitChange: (value: string) => void;
    value?: string;
}

export type Result = {
    output: string;
    conversion?: string;
    message?: string;
};

export type MainProps = {
    children: ReactNode;
}