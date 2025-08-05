export interface PaginationParams<TParams = Record<string, unknown>> {
  pageNum: number
  pageSize: number
  params?: TParams
}
