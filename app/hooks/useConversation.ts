import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const useConversation = () => {
	const params = useParams()

	const conversattionId = useMemo(() => {
		if (!params?.conversationId) return ''
		return params.conversationId as string
	}, [params?.conversationId])

	const isOpen = useMemo(() => !!conversattionId, [conversattionId])

	return useMemo(() => ({ isOpen, conversattionId }), [isOpen, conversattionId])
}

export default useConversation
