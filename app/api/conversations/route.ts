import getCurrentUser from '../../actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { pusherServer } from '../../libs/pusher'

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser()

		const body = await req.json()
		const { userId, isGroup, members, name } = body

		if (!currentUser?.id || !currentUser?.email)
			return new NextResponse('Unauthorized', { status: 401 })

		if (isGroup && (!members || members.length < 2 || !name))
			return new NextResponse('Invalid data', { status: 400 })

		if (isGroup) {
			const newConversation = await prisma.conversation.create({
				data: {
					name,
					isGroup,
					user: {
						connect: [
							...members.map((member: { value: string }) => ({
								id: member.value,
							})),
							{
								id: currentUser.id,
							},
						],
					},
				},
				include: {
					user: true,
				},
			})

			newConversation.user.forEach((user) => {
				if (user.email) {
					pusherServer.trigger(user.email, 'conversation:new', newConversation)
				}
			})

			return NextResponse.json(newConversation)
		}

		const existingConversations = await prisma.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser.id],
						},
					},
				],
			},
		})

		const singleConversation = existingConversations[0]

		if (singleConversation) return NextResponse.json(singleConversation)

		const newConversation = await prisma.conversation.create({
			data: {
				user: {
					connect: [{ id: userId }, { id: currentUser.id }],
				},
			},
			include: {
				user: true,
			},
		})

		newConversation.user.map((user) => {
			if (user.email) {
				pusherServer.trigger(user.email, 'conversation:new', newConversation)
			}
		})

		return NextResponse.json(newConversation)
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
