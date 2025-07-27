export interface RequestQuery {
    searchTerm?: string;
    sort?: string;
    limit?: string;
    page?: string;
    fields?: string;
    [key: string]: unknown; 
}
