import { ReactNode } from 'react';

export interface ProfileMenuItem {
    key: string;
    title: string;
    icon: ReactNode;  // ReactNode to represent a React element
}


export interface ITagProfileAbout {
    key: string;
    title: string;
}


export const TagProfileAbout:ITagProfileAbout[] = [
    {
        key:'about',
        title:'About'
    },
    {
        key:'event',
        title:'Event'
    },
    {
        key:'reviews',
        title:'Reviews'
    },
]