import * as Tabs from "@radix-ui/react-tabs";
import "./CyberTabs.css"

const CyberTabs = ({ data }) => {
	return (
        <Tabs.Root className="flex tabsroot" defaultValue={data[0].title}>
		<Tabs.List className="flex flex-col w-1/2" aria-label="Manage your account">
			{data.map(tab => (
				<div className="outer-border h-[69px] w-[304px] bg-neonr mt-2" >
					<Tabs.Trigger className="tabTrigger relative top-[2px] left-[2px] flex items-center h-[65px] w-[300px] bg-red text-left uppercase" key={tab.title} value={tab.title}>
						<div className="h-full mx-2 border-x-2 border-l-black border-r-neonr " />
						
						{
							tab.kind === 'web' && <Globe className="fill-none stroke-white stroke-1" />
						}
						{
							tab.kind === 'app' && <App className="fill-none stroke-white stroke-1" />
						}
						{
							tab.kind === 'contest' && <Contest className="fill-none stroke-white stroke-1" />
						}
						<div className="flex flex-col mt-1 ml-2" >
							<span>{tab.title}</span>
							<span className="text-neony text-sm" >Status: {tab.status}</span>
						</div>
						<div className="hidden highlight ml-auto h-full w-4 shadow-neon bg-neony" ></div>
					</Tabs.Trigger>
				</div>
			))}
		</Tabs.List>
		{data.map(tab => (
			<Tabs.Content className="w-1/2 bg-blue-500" key={tab.title} value={tab.title}>
				{tab.content}
			</Tabs.Content>
		))}
	</Tabs.Root>
    )
}


const Globe = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className} ><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
	)
}

const App = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg>
	)
}

const Contest = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  className={className}><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>
	)
}


export default CyberTabs