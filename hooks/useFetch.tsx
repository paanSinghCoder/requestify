'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

const useFetch = () => {
	const [data, setData] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const call = (url: string, method: string = 'GET', body?: any) => {
		try {
			setLoading(true)
			console.log(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				...(method === 'POST' && { body: JSON.stringify(body) })
			})
			fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				...(method === 'POST' && { body: JSON.stringify(body) })
			})
				.then(res => {
					if (!res.ok) {
						// throw new Error('Network response was not OK')
						toast.error('Something went wrong while making the request. Please check console.')
					}
					return res
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					setData(data)
				})
		} catch (error) {
			console.error(error)
			toast.error('Somthing went wrong. Please check console.')
			setError(true)
		} finally {
			setLoading(false)
		}
	}
	return { res: data, loading, error, call }
}

export default useFetch
