'use client'

import { clsx } from 'clsx'
import Link from 'next/link'

interface MobileItemsProps {
	href: string
	label: string
	icon: any
	onClick?: () => void
	active?: boolean
}
const MobileItem: React.FC<MobileItemsProps> = ({ href, label, icon: Icon, onClick, active }) => {
	const handleClick = () => {
		if (onClick) return onClick()
	}
	return (
		<Link
			className={clsx(
				`
                group
                flex 
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-gray-500
                hover:text-black
                hover:bg-gray-100
            `,
				active && 'bg-gray-100 text-black'
			)}
			onClick={handleClick}
			href={href}
		>
			<Icon className="h-6 w-6" />
			<span className="sr-only">{label}</span>
		</Link>
	)
}

export default MobileItem
