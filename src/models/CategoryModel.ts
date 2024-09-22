import React, { ReactNode } from 'react';
import {FontAwesome,Ionicons} from '@expo/vector-icons';
import { ChefForkSVG } from 'assets/svgs';
import { colors } from '~/styles';

export interface CategoryModel {
    key: string;          // Mã định danh cho danh mục (ví dụ: 'music', 'sport')
    title: string;        // Tên danh mục (ví dụ: 'Music', 'Sports')
    iconLibrary: string;  // Tên thư viện icon (ví dụ: 'FontAwesome', 'Ionicons')
    iconName: string;     // Tên icon (ví dụ: 'music', 'basketball')
    iconSize: number;     // Kích thước icon (ví dụ: 22)
    iconColor: string;    // Màu sắc của icon (mã màu HEX như '#F59762')
}

