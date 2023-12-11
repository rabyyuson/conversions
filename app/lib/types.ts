import { ReactNode } from 'react';
import { UNITS } from './constants';

export type ResponseType = {
    inputNumericalValue: string;
    inputUnitOfMeasure: string;
    targetUnitOfMeasure: string;
    studentResponse: string;
};

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
    conversion?: string;
    output?: string;
    message?: string;
};

export type MainProps = {
    children: ReactNode;
};

export type SidebarLinkProps = {
    icon: string;
    label: string;
    path: string;
};

export interface ModalProps extends ResultProps {
    studentResponse: string;
    toggleModal: () => void;
}

export type LottieAnimationProps = {
    animationData: Record<string, any>;
}