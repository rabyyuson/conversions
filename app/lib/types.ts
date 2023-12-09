import { UNITS } from "./constants";

export type Unit = {
    name: string;
    symbol: string;
};

export type Units = Unit[];

export type TemperatureUnit = {
    name: typeof UNITS['temperatures'][number]['name'];
}

export type VolumeUnit = {
    name: typeof UNITS['volumes'][number]['name'];
}
