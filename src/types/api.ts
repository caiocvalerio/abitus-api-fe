export interface SortObject {
    unsorted?: boolean;
    sorted?: boolean;
    empty?: boolean;
}

export interface PageableObject {
    unpaged?: boolean;
    pageNumber?: number;
    paged?: boolean;
    pageSize?: number;
    offset?: number;
    sort?: SortObject;
}

export interface Page<T> {
    totalElements?: number;
    totalPages: number;
    pageable?: PageableObject;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    size?: number;
    content?: T[];
}