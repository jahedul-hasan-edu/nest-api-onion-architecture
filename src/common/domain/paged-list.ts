interface IPagedQuery{
    pageNumber?: number;
    pageSize?: number;
}

export class PagedList<T extends IPagedQuery>{
    constructor(
        public query: T
    ){}

    public getOptions(): any{
        if(!this.query.pageNumber) this.query.pageNumber=1;

        if(!this.query.pageSize) this.query.pageSize=10;

        if(this.query.pageNumber<1) this.query.pageNumber=1;

        const skip = (this.query.pageNumber-1)*this.query.pageSize;
        
        return {
            skip: Number(skip),
            take: Number(this.query.pageSize)
        };
    }
}