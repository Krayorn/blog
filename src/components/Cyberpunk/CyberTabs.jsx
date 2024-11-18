import * as Tabs from "@radix-ui/react-tabs";
import "./CyberTabs.css"

const CyberTabs = ({ data, className }) => {
	return (
        <Tabs.Root className={`${className} flex`} defaultValue={data[0].title}>
		<Tabs.List className="flex flex-col w-1/2 w-min-[304px] " aria-label="Manage your account">
			{data.map(tab => (
				<Tabs.Trigger key={tab.title} value={tab.title} className="tabTrigger relative mt-4" >
				{
					tab.tasks && tab.tasks.some(task => task.targeted) && 
					<div className={`absolute left-[-18px] bg-neony cybercheckbox min-w-[15px] w-[15px] h-[15px] top-[-1px]`}>
						<div className="inner-cybercheckbox relative top-px left-px w-[13px] h-[13px] bg-dark">
							<div className="targeted-cybercheckbox relative top-px left-px w-[11px] h-[11px] bg-neony text-sm flex justify-center items-center text-black">!</div>
						</div>
					</div>
				}
				<div className="outer-border h-[69px] w-[304px] bg-neonr" >
					<div className="inner-border relative top-[2px] left-[2px] flex items-center h-[65px] w-[300px] bg-red text-left uppercase">
					
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
						<div className="highlight hidden ml-auto h-full w-4 shadow-neon bg-neony" ></div>
					</div>
				</div>
				</Tabs.Trigger>
			))}
		</Tabs.List>
		{data.map(tab => (
			<Tabs.Content  className="w-1/2" key={tab.title} value={tab.title}>
				<h2 className="uppercase text-neonr glow-text border-b pb-2 border-neonr/[.3]" >{tab.title}</h2>
				{
					tab.tasks && tab.tasks.length > 0
					? tab.tasks.map(task => {
						return (
							<div  key={task.name} className="uppercase flex items-center" >
								<div className={`${task.targeted ? 'bg-neony' : 'bg-neonr'} cybercheckbox min-w-[15px] w-[15px] h-[15px] relative top-[-1px]`}>
									<div className="inner-cybercheckbox relative top-px left-px w-[13px] h-[13px] bg-dark">
										{task.targeted && <div className="targeted-cybercheckbox relative top-px left-px w-[11px] h-[11px] bg-neony text-sm flex justify-center items-center text-black">!</div> }
									</div>
								</div>
								<div className="ml-4">{task.name}</div>
							</div>
						)
					})
					: <div className="no_tasks shadow-neonr flex m-auto justify-center p-2 uppercase w-[130px]" >
						<span className="bg-dark px-4" >No tasks</span>
					</div>
				}
				<div className="border-t mt-2 py-2 border-neonr/[.3] text-neonr" >
					{tab.content.map(c => <p key={c}>{c}</p>)}
				</div>
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