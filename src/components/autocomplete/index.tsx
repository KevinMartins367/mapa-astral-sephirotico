import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import GeoCode from '../../services/GeoCode';

interface AutocompleteProps {
    onSelect: (item: string) => void;
    state?: string;
}

interface CityData {
    id: number;
    name: string;
    geometry: any;
}

export default function Autocomplete({ state = '', onSelect }: AutocompleteProps) {
    const [suggestions, setSuggestions] = useState<CityData[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [cities, setCities] = useState<CityData[]>([]);

    useEffect(() => {
        if (!inputValue) {
            setSuggestions([]);
        } else {
            const filtered = cities.filter((city) =>
                city.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filtered);
        }
    }, [inputValue, cities]);

    const fetchCities = (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            setCities([]);
            return;
        };
        const encodedQuery = encodeURIComponent(`${state} ${query}`);
        
        GeoCode().getLatLong(encodedQuery)
            .then((results: any[]) => {
                const fetchedCities = results.map((result, index) => ({
                    id: index + 1,
                    name: result.formatted,
                    geometry: result.geometry,
                }));
                return fetchedCities;
            })
            .then((fetchedCities) => {
                setCities(fetchedCities);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
        fetchCities(value);
    };

    const handleSelect = (city: CityData) => {
        setInputValue(city.name);
        setSuggestions([]);
        onSelect(city.geometry);
    };

    return (
        <div>
            <Form.Group controlId="autocomplete">
                <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Cidade"
                />
            </Form.Group>
            {suggestions.length > 0 && (
                <div 
                    className="autocomplete-dropdown" 
                    style={{
                        position: 'absolute',
                        background: 'white',
                        border: '1px solid #ccc',
                        color: '#333',
                        overflowY: 'auto',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                    }}
                >
                    {suggestions.map((city) => (
                        <div 
                            key={`${city.id}-${city.name}`} 
                            onClick={() => handleSelect(city)}
                            className="autocomplete-item"
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                color: '#333',
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            {city.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
