'use client'

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

interface MessageInputProps {
	id: string
	type?: string
	required?: boolean
	placeholder?: string
	register: UseFormRegister<FieldValues>
	errors: FieldErrors<FieldValues>
}

const MessageInput: React.FC<MessageInputProps> = ({
	id,
	type,
	required,
	placeholder,
	register,
	errors,
}) => {
	return (
		<div className="relative w-full">
			<input
				type={type || 'text'}
				id={id}
				autoComplete={id}
				{...register(id, { required })}
				placeholder={placeholder}
				className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
			/>
		</div>
	)
}

export default MessageInput
