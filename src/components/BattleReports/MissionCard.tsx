import React from "react";

const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return <strong key={index}>{boldText}</strong>;
        }
        return part;
    });
};

type Section = {
    type: 'section';
    fixed: boolean;
    title: string;
}

type Reward = {
    type: 'reward';
    text: Array<string>;
    value: number;
    max?: number;
    valueFixed?: number;
}

type Action = {
    type: 'action';
    title: string;
    starts: string;
    units: string;
    completes: string;
    ifCompleted: string;
}

type Text = {
    type: 'text';
    text: Array<string>;
}

type DashedLine = {
    type: 'dashed_line';
}

type Or = {
    type: 'or';
}

type And = {
    type: 'and';
}

type MissionCard = {
    type: string;
    fixed: boolean;
    name: string;
    content: Array<Section | Reward | Action | Text | DashedLine | Or | And>;
}

const MissionCard = ({ mission, defender }: { mission: MissionCard, defender: boolean }) => {
    // bg-[#602d19] brown primary 
    // bg-[#a61e24] red secondary 
    // bg-[#3d7337] green secondary opponent
    // bg-[#0a0038] blue
    // bg-[#476960] gray
    // bg-[#602d91] fixed blue && and 
    // bg-[#6f5087] fixed vp
    // bg-[#296473] or
    // bg-[#476979] action
    
    let bgColor = '';
    if (mission.type === 'Primary Mission') {
        bgColor = '#602d19';
    } else if (mission.type === 'Secondary Mission') {
        bgColor = '#a61e24';
        if (defender) {
            bgColor = '#3d7337';
        }
    }

    let lastSectionIsfixed = false;
    let lastAddisAnd = false
    return (
        <div className="bg-white w-[300px] h-[420px]">
            <div className={`bg-[${bgColor}] pt-4 text-center text-white px-3 pb-2`}>
                <h3 className="text-xs font-bold uppercase">{mission.fixed ? 'Fixed - ' : ''} {mission.type}</h3>
                <h2 className="text-lg font-bold uppercase border-b-4 border-white w-full">{mission.name}</h2>
            </div>
            
            <div className="space-y-1 mt-1 text-xs [&>*]:mb-1">
                {mission.content.map((item, index) => {
                    if (item.type === 'text') {
                        return (
                            <div key={index} className="px-3 leading-none">
                                <div>{item.text.map((text, textIndex) => (
                                    <span key={textIndex} className="block">{parseBoldText(text)}</span>
                                ))}</div>
                            </div>
                        );
                    }
                
                    if (item.type === 'action') {
                        return (
                            <div key={index} className="mx-3 border border-[#476979] leading-none">
                                <div className="py-[1px] bg-[#476979] font-bold uppercase text-white text-center">{item.title}</div>
                                <div><b className="font-bold uppercase" >Starts:</b> {parseBoldText(item.starts)}</div>
                                <div><b className="font-bold uppercase" >Units:</b> {parseBoldText(item.units)}</div>
                                <div><b className="font-bold uppercase" >Completes:</b> {parseBoldText(item.completes)}</div>
                                <div><b className="font-bold uppercase" >If completed:</b> {parseBoldText(item.ifCompleted)}</div>
                            </div>
                        );
                    }


                    if (item.type === 'section') {
                        lastSectionIsfixed = item.fixed ?? false;
                        return (
                            <div key={index} className="flex items-center justify-between tracking-tight">
                                <div className={`${lastSectionIsfixed ? 'bg-[#602d91]' : 'bg-[#0a0038]'} pl-3 w-[220px] text-white uppercase`}>{item.title} {mission.fixed ? ( item.fixed ? ' - Fixed' : ' - Tactical' ) : ''}</div>
                                <div className={`${lastSectionIsfixed ? 'bg-[#6f5087]' : 'bg-[#476960]'} w-[60px] text-white text-center font-bold uppercase mr-3`}>VP</div>
                            </div>
                        );
                    }

                    if (item.type === 'reward') {
                        return (
                            <div key={index} className="flex items-center justify-between">
                            <div className="pl-3 w-[210px] leading-none space-y-1">{item.text.map((text, textIndex) => (
                                <span key={textIndex} className="block">{parseBoldText(text)}</span>
                            ))}</div>
                            { item.valueFixed && 
                                 <div className={`bg-[#6f5087] w-[60px] text-white text-center font-bold uppercase mr-1 flex flex-col`}> 
                                    <span>{lastAddisAnd ? '+' : ''}{item.valueFixed} VP</span>
                                    <span className="uppercase font-normal text-[8px]">(Fixed)</span>
                                 </div>
                            }
                            <div className={`${lastSectionIsfixed ? 'bg-[#6f5087]' : 'bg-[#476960]'} w-[60px] text-white text-center font-bold uppercase mr-3 flex flex-col`}> 
                                <span>{lastAddisAnd ? '+' : ''}{item.value} VP</span>
                                {item.valueFixed !== undefined && <span className="uppercase text-[8px] font-normal">(Tactical)</span>}
                                {item.max !== undefined && <span className="uppercase text-[8px] font-normal">(Max {item.max} VP)</span>}
                            
                            </div>
                        </div>
                        );
                    }


                    if (item.type === 'or') {
                        lastAddisAnd = false;
                        return (
                            <div key={index} className="pl-3 pr-5">
                                <div className="bg-[#296473] text-white text-center font-bold uppercase flex items-center justify-center relative">
                                    <span>OR</span>
                                    <svg className="absolute right-[20px] w-[15px] h-[15px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                </div>
                            </div>
                        );
                    }

                    if (item.type === 'and') {
                        lastAddisAnd = true;
                        return (
                            <div key={index} className="pl-3 pr-5">
                                <div className="bg-[#602d91] text-white text-center font-bold uppercase flex items-center justify-center relative">
                                    <span>AND</span>
                                    <span className="absolute right-[20px]">+</span>
                                </div>
                            </div>
                        );
                    }

                    if (item.type === 'dashed_line') {
                        return (
                            <div key={index} className="px-3">
                                <div className="border-b border-dashed border-[#602d91]"></div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    )
}

export default MissionCard;