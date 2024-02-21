export interface QueryParam {
	key: string
	value: string
}

export interface QueryParamsProps {
	queryParams: QueryParam[]
	setQueryParams: (params: QueryParam[]) => void
}
