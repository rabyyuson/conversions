import { UNITS } from "./constants";

type UnitType = typeof UNITS;

export type TemperatureUnit = {
    name: UnitType['temperatures'][number]['name'];
}

export type VolumeUnit = {
    name: UnitType['volumes'][number]['name'];
}
