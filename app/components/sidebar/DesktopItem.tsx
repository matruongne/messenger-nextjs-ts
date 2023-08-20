'use client'

import { clsx } from 'clsx'
import Link from 'next/link'

interface Props {
	href: string
	label: string
	icon: any
	onClick?: () => void
	active?: boolean
}

const DesktopItem = ({ href, label, icon: Icon, onClick, active }: Props) => {
	const handleClick = () => {
		if (onClick) return onClick()
	}

	return (
		<li className="" onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					`
            group
            flex
            gap-x-3
            rounded-md
            text-sm
            p-3
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100
            `,
					active && 'bg-gray-100 text-black'
				)}
			>
				<Icon className="h-6 w-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	)
}

export default DesktopItem
