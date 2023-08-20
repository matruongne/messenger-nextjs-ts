import { useMemo } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import useConversation from './useConversation'

const useRoutes = () => {
	const pathname = usePathname()
	const { conversattionId } = useConversation()

	const routes = useMemo(
		() => [
			{
				label: 'Chat',
				href: '/conversations',
				icon: HiChat,
				active: pathname === '/conversations' || !!conversattionId,
			},
			{
				label: 'Users',
				href: '/users',
				icon: HiUsers,
				active: pathname === '/users',
			},
			{
				label: 'LogOut',
				href: '#',
				onClick: () => signOut(),
				icon: HiArrowLeftOnRectangle,
			},
		],
		[pathname, conversattionId]
	)
	return routes
}

export default useRoutes