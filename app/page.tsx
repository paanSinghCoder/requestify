'use client'

import BodyInput from '@/components/BodyInput'
import LearnMoreButton from '@/components/LearnMoreButton'
import Navbar from '@/components/Navbar'
import QueryParams from '@/components/QueryParams'
import { QueryParam } from '@/components/QueryParams/QueryParams.types'
import Tabs from '@/components/Tabs'
import { TabsType } from '@/components/Tabs/Tabs.types'
import { createQueryParamString } from '@/helpers'
import useFetch from '@/hooks/useFetch'
import { Suspense, useState } from 'react'
import toast from 'react-hot-toast'

export default function Home() {
	const [method, setMethod] = useState('GET')
	const [url, setUrl] = useState('')
	const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: '', value: '' }])

	//JSON input
	const [jsonInput, setJsonInput] = useState<string>('')
	const [parsedJson, setParsedJson] = useState<any>(null)
	//JSON input

	const { res, loading, error, call } = useFetch()

	const handleQueryParamsChange = (updatedQueryParams: QueryParam[]) => {
		setQueryParams(updatedQueryParams)
	}

	const submit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!url.trim()) {
			toast.error('Add a valid URL')
			return
		}

		const queryParamsString = createQueryParamString(queryParams)

		call(url + queryParamsString, method)
	}

	const tabs: TabsType[] = [
		{
			id: 0,
			title: 'Query',
			component: (
				<Suspense fallback={<>Loading...</>}>
					<QueryParams queryParams={queryParams} setQueryParams={handleQueryParamsChange} />
				</Suspense>
			)
		},
		{
			id: 1,
			title: 'Body',
			component: (
				<Suspense fallback={<>Loading...</>}>
					<BodyInput
						jsonInput={jsonInput}
						setJsonInput={setJsonInput}
						parsedJson={parsedJson}
						setParsedJson={setParsedJson}
					/>
				</Suspense>
			)
		},
		{
			id: 2,
			title: 'Auth',
			component: <>Coming soon</>
		},
		{
			id: 3,
			title: 'Docs',
			component: (
				<Suspense fallback={<>Loading...</>}>
					<LearnMoreButton />
				</Suspense>
			)
		}
	]

	return (
		<main className="w-screen h-screen">
			<div className="border-b">
				<Navbar />
			</div>
			<div className="grid grid-cols-2 mx-auto border-l border-r border-b rounded-b-md">
				<div className="w-auto border-r">
					<form
						onSubmit={submit}
						className="flex flex-col mx-auto border-b text-center items-center justify-center mt-4 focus:outline-none focus:ring-0 focus:ring-offset-0">
						<div className="py-2 w-full flex items-center justify-center px-4">
							<select
								value={method}
								onChange={e => setMethod(e.target.value)}
								className="bg-gray-50 flex items-center justify-center border-t w-24 border-b border-l text-gray-500 text-sm font-semibold rounded-l-md px-2 focus:ring-0 focus:ring-offset-0 py-3">
								<option value="GET" selected>
									GET
								</option>
								<option value="POST">POST</option>
							</select>
							<input
								type="url"
								value={url}
								onChange={e => setUrl(e.target.value)}
								className="px-4 py-2 my-1 rounded-r-md border text-md w-full"
								placeholder="https://"
							/>
							<button
								disabled={loading}
								type="submit"
								className="py-3 px-5 bg-blue-700 hover:bg-blue-800 rounded-md my-3 ml-3 text-white text-xs font-bold disabled:bg-gray-400">
								SEND
							</button>
						</div>
						<Tabs tabs={tabs} />
					</form>
				</div>
				<div className="overflow-auto max-h-[650px]">
					<pre className="w-auto">
						{res ? (
							JSON.stringify(res, undefined, 2)
						) : (
							<div className="h-full w-full flex items-center justify-center">
								Start by adding an API URL and hitting Enter
							</div>
						)}
					</pre>
				</div>
			</div>
		</main>
	)
}
