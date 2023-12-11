import { ReactNode } from 'react';
import { UNITS } from './constants';

export type UnitProps = {
    name: string;
    symbol: string;
};

export type UnitsProps = UnitProps[];

export type TemperatureUnit = {
    name: typeof UNITS['temperature'][number]['name'];
};

export type VolumeUnitProps = {
    name: typeof UNITS['volume'][number]['name'];
};

export type DropdownProps = {
    list: UnitsProps;
    handleUnitChange: (value: string) => void;
    value?: string;
}

export type ResultProps = {
    output?: string;
    conversion?: string;
    message?: string;
};

export type MainProps = {
    children: ReactNode;
};

export type SidebarLinkProps = {
    path: string;
    label: string;
    icon: string;
};

export interface ModalProps extends ResultProps {
    studentResponse: string;
    toggleModal: () => void;
}

export type LottieAnimationProps = {
    animationData: Record<string, any>;
}