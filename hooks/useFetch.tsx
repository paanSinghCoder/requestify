'use client'

import { useState } from 'react'

const useFetch = () => {
	const [data, setData] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const call = (url: string, method: string = 'GET', body?: any) => {
		try {
			setLoading(true)
			fetch(url, {
				method
			})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					setData(data)
				})
		} catch (error) {
			console.error(error)
			setError(error + '')
		} finally {
			setLoading(false)
		}
	}
	return { res: data, loading, error, call }
}

export default useFetch
