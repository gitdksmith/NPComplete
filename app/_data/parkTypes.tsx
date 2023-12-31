interface ParkTypes {
    [key: string]: string[];
}
const parkTypes: ParkTypes = {
    "Affiliated Area": ["Affiliated Area"],
    "Battlefield/Military": ["National Battlefield Park", "National Battlefield Site", "National Battlefield",
        "National Military Park"],
    "Historic": ["Ecological & Historic Preserve", "International Historic Site", "National Battlefield Park",
        "National Battlefield Site", "National Battlefield", "National Historic Area", "National Historic Site",
        "National Historic Trail", "National Historical Park and Ecological Preserve", "National Historical Park and Preserve",
        "National Historical Park", "National Historical Reserve", "National Monument and Historic Shrine",
        "Part of Colonial National Historical Park"],
    "Memorial": ["Memorial Parkway", "Memorial", "National Memorial"],
    "Monument": ["National Monument & Preserve", "National Monument and Historic Shrine", "National Monument",
        "Part of Statue of Liberty National Monument"],
    "Lakeshore": ["National Lakeshore"],
    "Preserve": ["Ecological & Historic Preserve", "National Historical Park and Ecological Preserve", "National Historical Park and Preserve",
        "National Monument & Preserve", "National Park & Preserve", "National Preserve"],
    "Park": ["National Battlefield Park", "International Park", "Memorial Parkway", "National Historical Park and Ecological Preserve",
        "National Historical Park and Preserve", "National Historical Park", "National Military Park", "National Park & Preserve",
        "National Park", "National Parks", "National and State Parks", "Park", "Parkway", "Part of Colonial National Historical Park"],
    "Recreation": ["National Recreation Area", "National Recreational River", "National River & Recreation Area", "Scenic & Recreational River"],
    "Reserve": ["National Reserve"],
    "River": ["National Recreational River", "National River & Recreation Area", "National River", "National Scenic River",
        "National Scenic Riverway", "National Scenic Riverways", "National Wild and Scenic River", "Scenic & Recreational River",
        "Wild & Scenic River", "Wild River"],
    "Scenic": ["National Scenic River", "National Scenic Riverway", "National Scenic Riverways", "National Scenic Trail",
        "National Wild and Scenic River", "Scenic & Recreational River", "Wild & Scenic River"],
    "Seashore": ["National Seashore"],
    "Trail": ["National Geologic Trail", "National Historic Trail", "National Scenic Trail"],
    "Wild": ["National Wild and Scenic River", "Wild & Scenic River", "Wild River"],
    "Undesignated": [""],
}

export default parkTypes;
