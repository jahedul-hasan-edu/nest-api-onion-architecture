import { PaginationResourceParameters } from "src/common/domain/pagination-resource-parameter";

export class ResourceParameters extends PaginationResourceParameters{
    
    orderBy: string;

    searchQuery: string;
}