'use client'

import React, { useState } from 'react'
import useRoutes from '../../hooks/useRoutes'
import DesktopItem from './DesktopItem'
import { User } from '@prisma/client'
import Avatar from '../Avatar'

interface DesktopSideBarProps {
	currentUser: User
}

const DesktopSidebar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
	const routes = useRoutes()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
			<nav className="mt-4 flex flex-col justify-between">
				<ul role="list" className="flex flex-col items-center space-y-1">
					{routes.map((item) => (
						<DesktopItem
							key={item.label}
							href={item.href}
							label={item.label}
							icon={item.icon}
							onClick={item.onClick}
							active={item.active}
						/>
					))}
				</ul>
			</nav>
			<nav className="mt-4 flex flex-col justify-between items-center">
				<div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
					<Avatar user={currentUser} />
				</div>
			</nav>
		</div>
	)
}

export default DesktopSidebar
