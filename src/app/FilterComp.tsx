'use client'
import React, { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
function FilterComp() {

    const { toast } = useToast()
    const [selectedFilter, setSelectedFilter] = useState('starts with');
    const [filterValues, setFilterValues] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [wiggleValue, setWiggleValue] = useState<string | null>(null);

    const filterOptions = [
        'is',
        'is not',
        'contains',
        'does not contain',
        'starts with',
        'ends with',
    ];

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter);
        setShowDropdown(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddFilter = () => {
        let trimmedInputValue = inputValue.trim();
        if (trimmedInputValue !== '') {
            if (filterValues.includes(trimmedInputValue)) {
                setWiggleValue(trimmedInputValue);
                setTimeout(() => setWiggleValue(null), 300);

                toast({
                    variant: "destructive",
                    title: "Duplicate filter",
                    description: "This filter value has already been added",
                })
                setInputValue('');
            } else {
                setFilterValues([...filterValues, trimmedInputValue]);
                setInputValue('');
            }
        }
    };

    const handleRemoveFilter = (value: string) => {
        setFilterValues(filterValues.filter((item) => item !== value));
    };

    return (
        <div className="relative">
            <div className="flex items-center border rounded-md px-3 py-2">
                <span className="text-gray-500">@Email</span>

                <div className="relative ml-2">
                    <button
                        className="flex items-center text-gray-700 focus:outline-none"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span className="mr-1">{selectedFilter}</span>
                        <svg
                            className="w-4 h-4 fill-current text-gray-500"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 7l5 5 5-5H5z" />
                        </svg>
                    </button>

                    {showDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                            <ul>
                                {filterOptions.map((filter) => (
                                    <li
                                        key={filter}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleFilterSelect(filter)}
                                    >
                                        {filter}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {filterValues.map((value) => (
                    <div
                        key={value}
                        className={`ml-2 px-2 py-1 rounded-md bg-blue-100 text-blue-700 flex items-center
                ${wiggleValue === value ? 'animate-wiggle' : ''}`}
                    >
                        <span>{value}</span>
                        <button
                            onClick={() => handleRemoveFilter(value)}
                            className="ml-1 focus:outline-none"
                        >
                            <svg
                                className="w-4 h-4 fill-current text-blue-500"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                            </svg>
                        </button>
                    </div>
                ))}

                <div className="ml-auto flex-grow">
                    <input
                        type="text"
                        className="w-full bg-transparent focus:outline-none"
                        placeholder="Enter filter value"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddFilter();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterComp
