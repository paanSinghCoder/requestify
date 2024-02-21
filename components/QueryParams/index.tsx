import React from 'react'
import { TrashIcon, PlusIcon } from '@heroicons/react/outline'
import { QueryParam, QueryParamsProps } from './QueryParams.types'

const QueryParams: React.FC<QueryParamsProps> = ({ queryParams, setQueryParams }) => {
	const handleAddQueryParam = () => {
		setQueryParams([...queryParams, { key: '', value: '' }])
	}

	const handleRemoveQueryParam = (index: number) => {
		if (queryParams.length === 1) return
		setQueryParams(queryParams.filter((_, i) => i !== index))
	}

	const handleQueryParamChange = (index: number, field: keyof QueryParam, value: string) => {
		// Remove spaces from the input value
		const sanitizedValue = value.replace(/\s/g, '')

		const updatedQueryParams = [...queryParams]
		updatedQueryParams[index][field] = sanitizedValue
		setQueryParams(updatedQueryParams)
	}

	return (
		<div className="px-2">
			<div className="px-1 py-6">
				<PlusIcon
					className="h-6 w-6 text-gray-600 cursor-pointer hover:text-green-600"
					onClick={handleAddQueryParam}
				/>
			</div>
			{queryParams.map((param, index) => (
				<div
					key={index}
					className="flex items-center gap-2 mb-3 focus:outline-none focus:ring-0 focus:ring-offset-0">
					<input
						type="text"
						name={`key-${index}`}
						className="block flex-1 rounded-md border py-1.5 pl-3 border-gray-300 pr-3 text-gray-900 placeholder:text-gray-400"
						placeholder="Key"
						value={param.key}
						onChange={e => handleQueryParamChange(index, 'key', e.target.value)}
					/>
					<input
						type="text"
						name={`value-${index}`}
						className="block flex-1 rounded-md border py-1.5 pl-3 border-gray-300 pr-3 text-gray-900 placeholder:text-gray-400"
						placeholder="Value"
						value={param.value}
						onChange={e => handleQueryParamChange(index, 'value', e.target.value)}
					/>
					{queryParams.length > 1 && (
						<TrashIcon
							className="h-5 w-5 text-gray-600 cursor-pointer hover:text-red-600 mx-4"
							onClick={() => handleRemoveQueryParam(index)}
						/>
					)}
				</div>
			))}
		</div>
	)
}

export default QueryParams
