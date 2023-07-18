"use client"
import { Dispatch, ReactNode, createContext, useReducer } from 'react';

interface SelectedFilters {
    // [key: string]: any,
    selectedState: string,
    selectedType: string,
    selectedActivities: string[]
}

interface FiltersAction {
    type: string,
    payload: string
}

export enum FilterTypes {
    STATE_SELECTED = 'STATE_SELECTED',
    TYPE_SELECTED = 'TYPE_SELECTED',
    FILTER_REMOVED = 'FILTER_REMOVED',
    ACTIVITY_SELECTED = 'ACTIVITY_SELECTED',
    ACTIVITY_REMOVED = 'ACTIVITY_REMOVED'
}

const initialState: SelectedFilters = {
    selectedState: '',
    selectedType: '',
    selectedActivities: []
};

export const FiltersContext = createContext<{
    filtersState: SelectedFilters;
    dispatch: Dispatch<FiltersAction>
}>({
    filtersState: initialState,
    dispatch: () => null
});

function filtersReducer(filtersState: SelectedFilters, action: FiltersAction) {
    switch (action.type) {
        case FilterTypes.STATE_SELECTED: {
            return {
                ...filtersState,
                selectedState: action.payload
            }
        }
        case FilterTypes.TYPE_SELECTED: {
            return {
                ...filtersState,
                selectedType: action.payload
            }
        }
        case FilterTypes.ACTIVITY_SELECTED: {
            const tmp = {
                ...filtersState,
                selectedActivities: [...filtersState.selectedActivities, action.payload]
            }
            return {
                ...filtersState,
                selectedActivities: [...filtersState.selectedActivities, action.payload]
            }
        }
        case FilterTypes.ACTIVITY_REMOVED: {
            const tmp = {
                ...filtersState,
                selectedActivities: filtersState.selectedActivities.filter((act:string) => act != action.payload)
            }
            return {
                ...filtersState,
                selectedActivities: filtersState.selectedActivities.filter((act:string) => act != action.payload)
            }
        }
        case FilterTypes.FILTER_REMOVED: {
            const tmp = {
                ...filtersState,
                [action.payload]: ''
            }
            return {
                ...filtersState,
                [action.payload]: ''
            }
        }
        default: {
            return { ...filtersState }
        }
    }
}

export function FiltersProvider({ children }: Props) {
    const [filtersState, dispatch] = useReducer(
        filtersReducer,
        initialState
    );

    return (
        <FiltersContext.Provider value={{ filtersState, dispatch }}>
            {children}
        </FiltersContext.Provider>
    );
}
