'use client'

import ReactSelect from 'react-select'

interface SelectProps {
	disabled?: boolean
	value?: Record<string, any>
	label: string
	options: Record<string, any>[]
	onChange: (value: Record<string, any>) => void
}

const Select: React.FC<SelectProps> = ({ disabled, value, label, options, onChange }) => {
	return (
		<div className="z-[100]">
			<label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="mt-2">
				<ReactSelect
					isDisabled={disabled}
					value={value}
					options={options}
					onChange={onChange}
					isMulti
					menuPortalTarget={document.body}
					styles={{
						menuPortal: (base) => ({ ...base, zIndex: 9999 }),
					}}
					classNames={{ control: () => 'text-sm' }}
				/>
			</div>
		</div>
	)
}

export default Select
