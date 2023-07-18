export interface ActivitiesData {
    total: string
    limit: string
    start: string
    data: Activity[]
}

export interface Activity {
    id: string
    name: string
}