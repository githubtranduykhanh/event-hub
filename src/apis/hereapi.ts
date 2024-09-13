import axios, { AxiosResponse } from "axios";

// Định nghĩa kiểu dữ liệu cho địa chỉ và vị trí
interface Address {
    city: string;
    countryCode: string;
    countryName: string;
    label: string;
    county: string;
    district: string;
    postalCode: string;
}

interface Position {
    lat: number;
    lng: number;
}

export interface SearchResultHereApi {
    id: string;
    title: string;
    position: Position;
    address: Address;
}

// Định nghĩa kiểu dữ liệu cho phản hồi từ API Here Maps
interface HereApiResponse {
    items: SearchResultHereApi[];
}

// Hàm xử lý dữ liệu từ API Here Maps
const mapSearchResult = (items: any[]): SearchResultHereApi[] => {
    return items.map(item => ({
        id: item.id,
        title: item.title,
        position: item.position,
        address: item.address,
    }));
}

// Hàm gọi API Here Maps
export const fetchSearchGeocode = async (searchQuery: string, onSuccess: (data: SearchResultHereApi[]) => void, onError?: (error: any) => void): Promise<void> => {
    try {
        const response: AxiosResponse<HereApiResponse> = await axios.get('https://geocode.search.hereapi.com/v1/geocode', {
            params: {
                q: searchQuery,
                apiKey: process.env.EXPO_PUBLIC_APP_API_KEY_HERE,
            },
        });

        if (response.status === 200 && response.data.items && response.data.items.length > 0) onSuccess(mapSearchResult(response.data.items));
    } catch (error) {
        // Gọi callback onError nếu có lỗi
        if (axios.isAxiosError(error)) {
            onError && onError({ message: error.message, statusCode: error.response?.status });
        } else {
            onError && onError({ message: 'Unexpected error', statusCode: 500 });
        }
    }
};


// Hàm lấy địa chỉ từ tọa độ và trả về danh sách địa chỉ hoặc null
export const getAddressFromCoordinates = async ({ lat, lng }: { lat: number, lng: number }, onSuccess: (data: SearchResultHereApi[]) => void, onError?: (error: any) => void): Promise<void> => {
    try {
        const response: AxiosResponse<HereApiResponse> = await axios.get('https://revgeocode.search.hereapi.com/v1/revgeocode', {
            params: {
                at: `${lat},${lng}`,  // Tọa độ latitude và longitude
                apiKey: process.env.EXPO_PUBLIC_APP_API_KEY_HERE,  // API key của bạn
            },
        });

        if (response.status === 200 && response.data.items && response.data.items.length > 0) {
            onSuccess(mapSearchResult(response.data.items));
        } else {
            onError && onError({ message: 'No address found or unexpected status code', statusCode: response.status });
        }
    } catch (error) {
        // Gọi callback onError nếu có lỗi
        if (axios.isAxiosError(error)) {
            onError && onError({ message: error.message, statusCode: error.response?.status });
        } else {
            onError && onError({ message: 'Unexpected error', statusCode: 500 });
        }
    }
};

export const getRoute = async (startLat: number, startLng: number, endLat: number, endLng: number) => {
    try {
        const response = await axios.get('https://router.hereapi.com/v8/routes', {
            params: {
                transportMode: 'car',  // Hoặc 'pedestrian', 'bike' tuỳ thuộc vào loại vận chuyển bạn cần
                origin: `${startLat},${startLng}`,
                destination: `${endLat},${endLng}`,
                apiKey: process.env.EXPO_PUBLIC_APP_API_KEY_HERE,
                return: 'polyline',  // Để lấy polyline của tuyến đường
            },
        });
        return response.data.routes[0]?.sections[0]?.polyline;
    } catch (error) {
        console.error('Error fetching route:', error);
        return null;
    }
};



const ENCODING_TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const DECODING_TABLE: number[] = [
    62, -1, -1, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, -1, -1, -1, -1, 63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];

const FORMAT_VERSION = 1n;

const ABSENT = 0n;
const LEVEL = 1n;
const ALTITUDE = 2n;
const ELEVATION = 3n;
const CUSTOM1 = 6n;
const CUSTOM2 = 7n;

export const decode = (encoded: string) => {
    const decoder = decodeUnsignedValues(encoded);
    const header = decodeHeader(decoder[0], decoder[1]);

    const factorDegree = 10n ** BigInt(header.precision);
    const factorZ = 10n ** BigInt(header.thirdDimPrecision);
    const { thirdDim } = header;

    let lastLat = 0n;
    let lastLng = 0n;
    let lastZ = 0n;
    const res: number[][] = [];

    let i = 2;
    for (; i < decoder.length;) {
        const deltaLat = toSigned(decoder[i]);
        const deltaLng = toSigned(decoder[i + 1]);
        lastLat += deltaLat;
        lastLng += deltaLng;

        if (thirdDim) {
            const deltaZ = toSigned(decoder[i + 2]);
            lastZ += deltaZ;
            res.push([
                Number(lastLat) / Number(factorDegree),
                Number(lastLng) / Number(factorDegree),
                Number(lastZ) / Number(factorZ)
            ]);
            i += 3;
        } else {
            res.push([
                Number(lastLat) / Number(factorDegree),
                Number(lastLng) / Number(factorDegree)
            ]);
            i += 2;
        }
    }

    if (i !== decoder.length) {
        throw new Error('Invalid encoding. Premature ending reached');
    }

    return {
        ...header,
        polyline: res,
    };
}



const toSigned = (val: bigint): bigint => {
    let res = val;
    if (res & 1n) {
        res = ~res;
    }
    res >>= 1n;
    return res;
}


const decodeChar = (char: string): number => {
    const charCode = char.charCodeAt(0);
    return DECODING_TABLE[charCode - 45];
}

const decodeUnsignedValues = (encoded: string): bigint[] => {
    let result = 0n;
    let shift = 0n;
    const resList: bigint[] = [];

    encoded.split('').forEach((char) => {
        const value = BigInt(decodeChar(char));
        result |= (value & 0x1Fn) << shift;
        if ((value & 0x20n) === 0n) {
            resList.push(result);
            result = 0n;
            shift = 0n;
        } else {
            shift += 5n;
        }
    });

    if (shift > 0n) {
        throw new Error('Invalid encoding');
    }

    return resList;
}

const decodeHeader =(version: bigint, encodedHeader: bigint) => {
    if (version !== FORMAT_VERSION) {
        throw new Error('Invalid format version');
    }
    const headerNumber = Number(encodedHeader);
    const precision = headerNumber & 15;
    const thirdDim = (headerNumber >> 4) & 7;
    const thirdDimPrecision = (headerNumber >> 7) & 15;
    return { precision, thirdDim, thirdDimPrecision };
}



const encode = ({ precision = 5, thirdDim = ABSENT, thirdDimPrecision = 0, polyline }: { precision?: number; thirdDim?: bigint; thirdDimPrecision?: number; polyline: number[][]; }) => {
    const multiplierDegree = 10n ** BigInt(precision);
    const multiplierZ = 10n ** BigInt(thirdDimPrecision);
    const encodedHeaderList = encodeHeader(precision, thirdDim, thirdDimPrecision);
    const encodedCoords: string[] = [];

    let lastLat = 0n;
    let lastLng = 0n;
    let lastZ = 0n;
    polyline.forEach((location) => {
        const lat = BigInt(Math.round(location[0] * Number(multiplierDegree)));
        encodedCoords.push(encodeScaledValue(lat - lastLat));
        lastLat = lat;

        const lng = BigInt(Math.round(location[1] * Number(multiplierDegree)));
        encodedCoords.push(encodeScaledValue(lng - lastLng));
        lastLng = lng;

        if (thirdDim) {
            const z = BigInt(Math.round(location[2] * Number(multiplierZ)));
            encodedCoords.push(encodeScaledValue(z - lastZ));
            lastZ = z;
        }
    });

    return [...encodedHeaderList, ...encodedCoords].join('');
}

function encodeHeader(precision: number, thirdDim: bigint, thirdDimPrecision: number) {
    if (precision < 0 || precision > 15) {
        throw new Error('precision out of range. Should be between 0 and 15');
    }
    if (thirdDimPrecision < 0 || thirdDimPrecision > 15) {
        throw new Error('thirdDimPrecision out of range. Should be between 0 and 15');
    }
    if (thirdDim < 0n || thirdDim > 7n || thirdDim === 4n || thirdDim === 5n) {
        throw new Error('thirdDim should be between 0, 1, 2, 3, 6 or 7');
    }

    const res = (BigInt(thirdDimPrecision) << 7n) | (thirdDim << 4n) | BigInt(precision);
    return [encodeUnsignedNumber(FORMAT_VERSION), encodeUnsignedNumber(res)];
}

const encodeUnsignedNumber = (val: bigint): string => {
    let res = '';
    let numVal = val;
    while (numVal > 0x1Fn) {
        const pos = (numVal & 0x1Fn) | 0x20n;
        res += ENCODING_TABLE[Number(pos)];
        numVal >>= 5n;
    }
    return res + ENCODING_TABLE[Number(numVal)];
}

const encodeScaledValue = (value: bigint): string => {
    let numVal = value;
    const negative = numVal < 0n;
    numVal <<= 1n;
    if (negative) {
        numVal = ~numVal;
    }

    return encodeUnsignedNumber(numVal);
}






