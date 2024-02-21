'use client'

import Navbar from '@/components/Navbar'
import QueryParams from '@/components/QueryParams'
import { QueryParam } from '@/components/QueryParams/QueryParams.types'
import Tabs from '@/components/Tabs'
import { TabsType } from '@/components/Tabs/Tabs.types'
import { useState } from 'react'

export default function Home() {
	const [method, setMethod] = useState('GET')
	const [url, setUrl] = useState('')
	const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: '', value: '' }])

	const handleQueryParamsChange = (updatedQueryParams: QueryParam[]) => {
		setQueryParams(updatedQueryParams)
	}

	const submit = (e: React.FormEvent) => {
		e.preventDefault

		alert(url)
	}

	const tabs: TabsType[] = [
		{
			id: 0,
			title: 'Query',
			component: <QueryParams queryParams={queryParams} setQueryParams={handleQueryParamsChange} />
		},
		{
			id: 1,
			title: 'Body',
			component: <>Body</>
		},
		{
			id: 2,
			title: 'Auth',
			component: <>Auth</>
		},
		{
			id: 3,
			title: 'Docs',
			component: <>Docs</>
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
						onSubmit={e => submit(e)}
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
								disabled={false}
								type="submit"
								className="py-3 px-5 bg-blue-700 hover:bg-blue-800 rounded-md my-3 ml-3 text-white text-xs font-bold disabled:bg-gray-400">
								SEND
							</button>
						</div>
						<Tabs tabs={tabs} />
					</form>
				</div>
				<div className="w-auto "></div>
			</div>
		</main>
	)
}
