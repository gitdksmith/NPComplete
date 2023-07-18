"use client"
import { Dispatch, ReactNode, createContext, useReducer } from 'react';

export enum FilterTypes {
    STATE_SELECTED = 'STATE_SELECTED',
    TYPE_SELECTED = 'TYPE_SELECTED',
    FILTER_REMOVED = 'FILTER_REMOVED',
    ACTIVITY_SELECTED = 'ACTIVITY_SELECTED',
    ACTIVITY_REMOVED = 'ACTIVITY_REMOVED',
    ACTIVITY_TOGGLE_CLICK = 'ACTIVITY_TOGGLE_CLICK'
}

export enum ActivitiesToggle {
    AND = 'AND',
    OR = 'OR'
}

interface FiltersAction {
    type: string,
    payload: string
}

interface SelectedFilters {
    // [key: string]: any,
    selectedState: string,
    selectedType: string,
    selectedActivities: string[],
    selectedActivitiesToggle: ActivitiesToggle
}

const initialState: SelectedFilters = {
    selectedState: '',
    selectedType: '',
    selectedActivities: [],
    selectedActivitiesToggle: ActivitiesToggle.AND
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
            return {
                ...filtersState,
                selectedActivities: [...filtersState.selectedActivities, action.payload]
            }
        }
        case FilterTypes.ACTIVITY_REMOVED: {
            return {
                ...filtersState,
                selectedActivities: filtersState.selectedActivities.filter((act: string) => act != action.payload)
            }
        }
        case FilterTypes.ACTIVITY_TOGGLE_CLICK: {
            return {
                ...filtersState,
                selectedActivitiesToggle: filtersState.selectedActivitiesToggle == ActivitiesToggle.AND ?
                    ActivitiesToggle.OR : ActivitiesToggle.AND
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
