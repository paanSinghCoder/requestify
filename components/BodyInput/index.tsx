import React from 'react'
import { BodyInputProps } from './BodyInput.types'

const BodyInput: React.FC<BodyInputProps> = ({
	jsonInput,
	setJsonInput,
	parsedJson,
	setParsedJson
}) => {
	const handleJsonInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = event.target.value
		setJsonInput(inputValue)

		try {
			const parsedData = JSON.parse(inputValue)
			setParsedJson(parsedData)
		} catch (error) {
			setParsedJson(null)
		}
	}

	return (
		<div>
			<textarea
				value={jsonInput}
				onChange={handleJsonInputChange}
				className="border rounded-md p-3 focus:outline-none focus:ring-0 focus:ring-offset-0"
				placeholder="Enter body in JSON format here"
				rows={15}
				cols={90}
			/>
			{!parsedJson && jsonInput.trim() !== '' && (
				<div>
					<p className="text-red-500">Invalid JSON. Please edit</p>
				</div>
			)}
		</div>
	)
}

export default BodyInput
