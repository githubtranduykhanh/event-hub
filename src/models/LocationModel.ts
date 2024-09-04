export interface LocationModel {
    items: Item[]
}

interface Item {
    title: string
    id: string
    language: string
    resultType: string
    localityType: string
    address: Address
    highlights: Highlights
}

interface Address {
    label: string
    countryCode: string
    countryName: string
    county: string
    city: string
}

interface Highlights {
    title: Title[]
    address: Address2
}

interface Title {
    start: number
    end: number
}

interface Address2 {
    label: Label[]
    city: City[]
}

interface Label {
    start: number
    end: number
}

interface City {
    start: number
    end: number
}