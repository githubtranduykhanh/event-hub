import { ReactNode } from 'react';

export interface ProfileMenuItem {
    key: string;
    title: string;
    icon: ReactNode;  // ReactNode to represent a React element
}
