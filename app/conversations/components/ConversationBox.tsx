'use client'

import { Conversation, Message, User } from '@prisma/client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { clsx } from 'clsx'
import { FullConversationType } from '../../types/index'
import useOtherUser from '../../hooks/useOtherUser'
import Avatar from '../../components/Avatar'

interface ConversationBoxProps {
	data: FullConversationType
	selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
	const otherUser = useOtherUser(data)
	const session = useSession()
	const router = useRouter()

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`)
	}, [data.id, router])

	const lastMessage = useMemo(() => {
		const messages = data.messages || []

		return messages[messages.length - 1]
	}, [data.messages])

	const userEmail = useMemo(() => {
		return session?.data?.user?.email
	}, [session.data?.user?.email])

	const hasSeen = useMemo(() => {
		if (!lastMessage) return false

		const seenArray = lastMessage.seen || []

		if (!userEmail) return false

		return seenArray.filter((user) => user.email === userEmail).length !== 0
	}, [lastMessage, userEmail])

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) return 'Sent an image'

		if (lastMessage?.body) return lastMessage.body

		return 'Started a new message'
	}, [lastMessage])

	return (
		<div
			className={clsx(
				`
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
    `,
				selected ? 'bg-neutral-100' : 'bg-white'
			)}
			onClick={handleClick}
		>
			<Avatar user={otherUser} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="font-medium text-lg text-gray-900">{data.name || otherUser.name}</p>
						{lastMessage?.createdAt && (
							<p className="text-xs text-gray-400 font-light">
								{format(new Date(lastMessage.createdAt), 'p')}
							</p>
						)}
					</div>
					<p
						className={clsx(
							`
                    truncate text-sm 
                    `,
							hasSeen ? 'text-gray-500' : 'text-black font-medium'
						)}
					>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ConversationBox
