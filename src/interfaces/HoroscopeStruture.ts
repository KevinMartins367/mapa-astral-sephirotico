interface HoroscopeStruture {
    houseSystem: string;
    zodiac: string;
    origin: any;
    aspectPoints: string[];
    aspectWithPoints: string[];
    aspectTypes: string[];
    customOrbs: Record<string, any>;
    language: string;
}

export default HoroscopeStruture;