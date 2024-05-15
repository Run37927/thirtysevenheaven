import React from 'react'
import FactoidCard from '@/components/FactoidCard';

function FilteredCards({ filteredFactoids }) {
    return (
        <div className="flex flex-col md:w-2/3 space-y-4">
            {filteredFactoids.map(factoid => (
                <div key={factoid.id}>
                    <FactoidCard factoid={factoid} />
                </div>
            ))}
        </div>
    )
}

export default FilteredCards