'use client'

import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/navigation'
import React from 'react'

const LearnMoreButton = () => {
	const router = useRouter()
	return (
		<button
			onClick={e => {
				e.preventDefault()
				router.push('https://stackoverflow.com/')
			}}
			className="border flex items-center justify-center px-4 py-2 rounded-md mx-auto text-sm shadow">
			<ExternalLinkIcon className="h-4 w-4 mr-3" />
			Learn more about HTTP methods
		</button>
	)
}

export default LearnMoreButton
