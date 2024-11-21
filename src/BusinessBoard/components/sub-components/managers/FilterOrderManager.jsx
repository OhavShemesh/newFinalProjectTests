import React, { useState } from 'react'
import FilterOrdersComponent from '../FilterOrdersComponent'

export default function FilterOrderManager({ setFilter }) {
    const [activeFilter, setActiveFilter] = useState("All");

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        setFilter(filter)
    };

    return (
        <FilterOrdersComponent handleFilterClick={handleFilterClick} activeFilter={activeFilter} />
    )
}
