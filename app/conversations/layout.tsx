import Sidebar from '../components/sidebar/Sidebar'

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		//@ts-expect-error Server Component
		<Sidebar>
			<div className="h-full">{children}</div>
		</Sidebar>
	)
}

export default ConversationsLayout
