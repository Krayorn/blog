import * as Tabs from "@radix-ui/react-tabs";
import "./CyberTabs.css"

import { useState } from 'react';


const CyberTabs = ({ data, className }) => {
	const [filter, setFilter] = useState('active');
	const [selectedTab, setSelectedTab] = useState(0);
	const tabs = data[filter] ?? [];


	const updateFilter = (filter) => {
		setFilter(filter);
		setSelectedTab(0);
	}

	return (
		<div className={className}>
			<div className="flex items-center gap-2">
				<FilterButton onClick={() => updateFilter('active')} name="Current" length={data.active.length} selected={filter === 'active'} />
				<FilterButton onClick={() => updateFilter('completed')} name="Finished" length={data.completed.length} selected={filter === 'completed'} />
				<FilterButton onClick={() => updateFilter('paused')} name="Paused" length={data.paused.length} selected={filter === 'paused'} />
				<FilterButton onClick={() => updateFilter('roleplaying')} name="RPG" length={data.roleplaying.length} selected={filter === 'roleplaying'} />
			</div>
			<Tabs.Root className={`flex flex-col mb-16 md:mb-0 md:flex-row`} value={tabs[selectedTab].title}>
				<Tabs.List className="flex flex-col w-full md:w-1/2 md:w-min-[304px]" aria-label="Manage your account">
					{tabs.map((tab, index) => (
						<Tabs.Trigger key={tab.title} value={tab.title} className="tabTrigger relative mt-4" onClick={() => setSelectedTab(index)}>
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
				{tabs.map(tab => (
					<Tabs.Content className="w-full md:w-1/2" key={tab.title} value={tab.title}>
						<h2 className="uppercase text-neonr glow-text border-b pb-2 border-neonr/[.3]">{tab.title}</h2>
						{
							tab.tasks && tab.tasks.length > 0
							? tab.tasks.map(task => {
								return (
									<div key={task.name} className="uppercase flex items-center" >
										<div className={`${task.targeted ? 'bg-neony' : 'bg-neonr'} cybercheckbox min-w-[15px] w-[15px] h-[15px] relative top-[-1px]`}>
											<div className="inner-cybercheckbox relative top-px left-px w-[13px] h-[13px] bg-dark">
												{task.targeted && <div className="targeted-cybercheckbox relative top-px left-px w-[11px] h-[11px] bg-neony text-sm flex justify-center items-center text-black">!</div> }
												{task.completed && <div className="targeted-cybercheckbox relative top-px left-px w-[11px] h-[11px] bg-neonr text-sm flex justify-center items-center text-black">✓</div> }
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
		</div>
    )
}


const FilterButton = ({ name, length, selected, onClick }) => {
	return (
		<div onClick={onClick} className={`${selected ? 'bg-neonb' : 'bg-neonr'} filter-button p-[1px]`} >
			<div className="bg-dark inner-filter-button" >
				<button className={`${selected ? 'text-neonb bg-neonb/[.4]' : 'text-neonr bg-neonr/[.4]'} flex justify-center items-center px-1 inner-filter-button`}> {name} ({length})</button>
			</div>
		</div>
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