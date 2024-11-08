import * as Tabs from "@radix-ui/react-tabs";
import "./CyberTabs.css"

// .TabsTrigger[data-state="active"] {
// 	color: violet;
// }

const CyberTabs = ({ data }) => {
    return (
        <Tabs.Root className="flex" defaultValue={data[0].title}>
		<Tabs.List className="flex flex-col w-1/2" aria-label="Manage your account">
			{data.map(tab => (
				<div className="outer-border h-[67px] w-[302px] bg-[#d9453f] mt-2" >
					<Tabs.Trigger  className="tabTrigger pl-2 relative top-px left-px flex flex-col justify-center h-[65px] w-[300px]  bg-[#7c2626] text-left" key={tab.title} value={tab.title}>
						<span>{tab.title}</span>
						<span className="text-[#fcc33c]" >Status: Completed</span>
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

export default CyberTabs