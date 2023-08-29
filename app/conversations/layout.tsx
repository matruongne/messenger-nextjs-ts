import Sidebar from '../components/sidebar/Sidebar'
import ConversationList from './components/ConversationList'
import getConversations from '../actions/getConversations'
import getUsers from '../actions/getUsers'

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
	const conversations = await getConversations()
	const users = await getUsers()
	return (
		//@ts-expect-error Server Component
		<Sidebar>
			<ConversationList users={users} initialItems={conversations} />
			<div className="h-full">{children}</div>
		</Sidebar>
	)
}

export default ConversationsLayout
