---
title: 'No bug policy'
description: 'Why you should have a no bug policy, how to try and push it at your place of work and some of the non-obvious benefits of having a no bug policy'
pubDate: 2025-10-25
tags: ["software"]
---

You should strive to have a **No bug policy**. 

No matter how undoable you think it is, how much disbelief you'll get from other developers that have been working there too long and say that it's not possible. No matter all the "this doesn't work in the real world" or "It can only work in a certain type of company", you have to try. 

I've introduced this policy at my place of work two years ago. The system is simple, we have a Slack channel, every bug is posted on that channel. The engineers from the team (~7-10 persons) pick them up when there is a new one and fix it. We got one emoji when you start working on it so that someone else doesn't spend time checking it out, and another one once you're done. We still have bugs, it'd be naive to think we don't anymore, but we address all of them. Sometimes we get more bugs, that mean our work was sloppy, so we slow down to fix them. Sometimes we get very few or no bugs.

What's important is that we don't have to ask ourselves "Should I fix it ?", "How important is that ?". We see an issue, we fix it. No time spent on triaging or prioritizing, which means it's actually faster than not handling them. That's the strength of a no bug policy.

I'm going to tell how the change happened at my place of work, with our specificities and quirks. This probably won't work as is for your company, but that's your job, not mine. But hopefully this can give you some ideas to make it work in your context.

Depending on your political capital (~= your influence), you might have different options like trying to get buy-in from your direct manager, your PM and/or your team. I did a mix of that and another simpler option. I started fixing every single bug that was reported. Front, back, in parts of the codebase I knew well, in parts of the codebase I didn't even know existed.
That means that for some time, I was only fixing bugs, and early on, the more bugs you fix, the more bugs are reported. It's because the users now realized things were moving, they didn't have to report only the most breaking bugs that blocked them, but little things that forced them a hard refresh or a secondary button not working as expected were also getting fixed. 
The system was healing.

If you have to, make a ticket for your manager or PM, but if possible I'd advise against it, you want to reduce friction as much as possible. You want to get the bugs from as close to the users as possible, ask them yourself the questions if you have any, and then warn them when it's fixed.

Hopefully, you won't be alone for long fixing every bug raised, for me, the rest of the team quickly joined me in this practice for the following reasons. 
Firstly, it makes sense to fix bugs, you want the software to work. Secondly, look at how you react when you encounter bugs in products you often use, from Slack, to Gmail, Twitter or GitHub, there is nothing more annoying than when you report a bug and it doesn't get fixed, that's not the feeling you want in your users. Thirdly, we got some positive feedback so fast, like so fast. Our internal users were so happy, it made their work day easier, it strengthened the relations between our teams by building trust. They were also able to use this to reinforce the trust they had with our end-users, our response time to fix issues and the overall quality of our app went up, and it helped them reassure customers. 

If you're swamped under projects and deadlines for new features and have no leeway at all, it'll be more difficult. But most bugs aren't juggernaut needing to refactor a whole service, they're often simpler than they look, so it's possible to fix one in the morning, or at the end of the workday after a meeting. The more bugs there are in the codebase, the more bugs you'll introduce when modifying code to add capabilities anyway, so take some time to fix a few. It's important that even if you don't spend all your time fixing bugs, you never stop fixing some. Some people think that "it's the company culture", but it's the people that create the culture. We decided that we were a team that fixed all their bugs, so we do. And it can start by you, because you're a big part of your team culture.

I'll finish this post by mentioning some of the benefits that might be less obvious than just making your software work and making your users happier. 
- It's so much easier to work when you're proud of what you do. It's easier to be proud of what you do when you try to do good, high quality work.
- No matter if the users are internal or external, by fixing bugs, you talk to them, you learn more about how they use the software, giving you more ideas and helping you make tons of technical decisions with your new domain knowledge.
- When you make people job easier or more enjoyable, a lot of them are happy to listen to you or help you if you have questions or needs, this increases greatly your influence and political capital at your place of work (which you can then use to keep improving the culture). PM are happy because they don't have to spend time triaging or prioritizing bugs, users are happy because the software works better, devs are happy because the codebase has less weird behaviors where it's unclear how it should work (that's most bugs). 
- The topic is often mentioned when we do interviews for hiring, often making a good impression. We also have good feedbacks from people outside of engineering when compared to their previous jobs. 


The bar to make good software is surprisingly low. You can start by fixing the bugs that are reported. You'll already be ahead.