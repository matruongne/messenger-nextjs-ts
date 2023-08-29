import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '../../actions/getCurrentUser'

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser()
		const { name, image } = await req.json()

		if (!currentUser?.id || !currentUser?.email)
			return new NextResponse('Unauthorized', { status: 401 })

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name,
				image,
			},
		})
		return NextResponse.json(updatedUser)
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
