import { QueryParam } from '@/components/QueryParams/QueryParams.types'

// Create a string query param eg: ?name=Gaurav&isDev=true
export const createQueryParamString = (qParams: QueryParam[]) => {
	const validQueryParams = qParams.filter(param => param.key !== '' && param.value !== '')

	const paramString = validQueryParams
		.map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
		.join('&')

	return `?${paramString}`
}
