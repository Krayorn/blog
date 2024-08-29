---
title: 'One Click Mute && Block Chrome extension for X/Twitter && LinkedIn'
description: 'How I built my extension that helps you keep your social feeds clean'
pubDate: 2024-08-29
tags: ["software"]
---

I just published my [first Chrome extension](https://chromewebstore.google.com/detail/twitterxlinkedin-one-clic/ibnghddpkdpbgcfcaajdhpnkfgbdadpp). It's simple, it's stupid, it allows you to mute or block users on Twitter in one click instead of 2 or 3.

## The beginning 

I decided to write a Chrome extension after reading a tweet that said 

> You can customize your internet so much and so easily, here's some boilerplates: [...]

I'm not a big fan of boilerplates (maybe worth another post), so I skipped these links, but I got curious and wanted to see how hard it would be to create something myself. 

As a side note, while writing this I just realized how easy it is to nerdsnipe me. I already knew that I was a sucker for challenges and competitions but this project was just an excuse for me to build something. I'm getting tricked into making stuff!

So now that I wanted to write an extension, I needed to pick a topic. I recalled someone mentioning that they were cleaning their timeline by muting aggressively using an extension to gain time. And indeed I found an extension doing this, but only on Twitter. So the plan was to do the same, but then port it to other social media and use a single extension to keep all your feeds clean.

## Building

I extensively used Anthropic's Claude to build the extension, I had battle-tested it on some Swift earlier (stay tuned, this was for a fun project!) and thought it would be amazing for this use case.


It took a few iterations, but Claude is really really good. In no time I had the buttons ready, I had to adapt the code and prompt it multiple times to use some html attributes to detect the different actions instead of just reading the text (which would not work for every language). It also used some relatively long timeout between the actions and would open the options menus a few milliseconds before closing it.

So I suggested a trick: just before opening the menu, add some CSS to make it very small, almost invisible, then click on the button. It worked perfectly and made everything cleaner. Claude also handled the confirmation modal to block someone like a pro.

## Step 2: expand!

It was time to expand!

First stop, LinkedIn! I switched the actions to "Unfollowing" someone without deleting the network connection, and flagging a post as "Not interesting". It felt like a better match for this professional social network. 

Once again, Claude was great, but the code started to be a little complex, and iterating with the AI made it messier, so some cleanup will be required!

As of today (29/08/2024), the extensions have about 15 users, so not a lot, but I'm quite happy because it seems to grow a tiny bit every week! Hoping that some updates and features will help on that front.

I don't know where I'll go next, I thought about Reddit but it does not look like the desktop site has an option to mute/hide subreddits from the feed, so I can't add shortcuts for that. And I'm not using any other social media. So I could create accounts on some other only to add the shortcuts, or stay with those two for now and see if I have ideas later on. I'll probably go with the latter.

## Final thoughts

This quick project was a lot of fun, and damn! It's indeed simple to customize the web. I have two other extensions in progress, and another one planned, and I don't see myself slowing down anytime soon! This is an easy way to make some sites better, and I think it could make good leverage for other projects! 