import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import { pusherServer } from '../../../libs/pusher'

interface IParams {
	conversationId?: string
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
	try {
		const { conversationId } = params
		const currentUser = await getCurrentUser()

		if (!currentUser?.id || !currentUser?.email)
			return new NextResponse('Unauthorized', { status: 401 })

		const exisingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				user: true,
			},
		})

		if (!exisingConversation) return new NextResponse('Invalid ID', { status: 400 })

		const deleteConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		})

		exisingConversation.user.map((user) => {
			if (user.email) pusherServer.trigger(user.email, 'conversation:remove', exisingConversation)
		})

		return NextResponse.json(deleteConversation)
	} catch (error) {
		return new NextResponse('Internal error', { status: 500 })
	}
}
