---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Board game software ideas'
description: 'Collection of ideas linked to boardgames & software.'
pubDate: 2023-12-04
tags: ["board games", "software"]
published: false
---

I'm a big board game fan. I like to play, I like to paint the miniatures from my games and I just love to spend an evening with friends, dice, tokens and cards !

I've recently started to code a board game logging app, I want to use it to get the classic statistics, but other apps already provides that. However, I have a lot more ideas, some of them might see the light of the day, some of them might not but here they are !

## Custom fields set for each game to generate more fun stats and metrics

This one will certainly end up in my app since it's one of the easiest one and a big reason I started coding my own logging system ! Every user should be able to set custom fields for each different game such as "character played", "HP left", "cards bought", "score"... It's pretty simple, and would allow some really fun graphs like "Which character is the most played ?" or "How many times did X win without losing a single unit?". I think it'd also be a good base for some of the other ideas down there. 
I'll add to the app a custom_field table, where each field would have some type (string, int, select), and a table to store the results of theses, might look like this:

```
id | custom_field_id | entry_id | player_result_id | value
```

I might have to add some diffent columns that could be nullable if I'm playing with different types (value_str, value_int, value_select_id) just to simplify the SQL queries that will aggregate those... But I think it will be clearer as soon as I start implementing and shipping it (Probably with a blog post).

## Campaign mode

Second straightforward idea, might leverage the custom fields system. I just want to be able to link some play together in a campaign, most of the custom fields might stay the same between games, so carry them over. Some loot or general stats might also be good to save between games instead of some random notes in the boxes... 

## Turn by Turn recap for a play

Starting to get in the more complex ideas, it would be cool to be able to see the progression of some games after each turn, either by seeing the state of the score, units, points evolve, with some pictures of the board or of the cards played ? Some of the requisite for such a feature to be useful is that it must be super simple to add some actions and save the state of the game. I don't want to spend half the game just writing stuff down.

## RPG detailed history

Similar to the last idea, but more oriented towards Role Playing Games. Would be useful to be able to save inventory, used spells, hit points or any of the game ressources (using the custom fields !). And being able to go back and see what we had at a certain point, where we gained it or just to remember what happened in the last session would be good. 
For this, I definitely want to do some Event Sourcing. I've already read some code using the pattern, and went through one implementation on a [friend side project](https://github.com/ludofleury/blackflag). Now would be my time to implement it, while being super generic which may make things interesting (letting users define their own events ?!).

## Animation of a play

Now things gets really wild. This idea first came to mind after a few games of Senjutsu, but I think it could be interesting in any fighting game. Using some very precise data from the Turn by Turn recap of a game, I would love to get an animation/video showing the movements of the characters, the attacks, misses and blocks. It would be a sick way to finish a 1h game with a 30seconds video. The animation/script would have to be coded from scratch with new assets for each game but it would be a very fun (& challenging) project, with a very visual output.

## Wargame Tracking, Smart Overlay and Positional data

Piling on the Turn by Turn recap of a play and applying it to wargames could bring some interesting and more complex outputs. There is too many units in most wargames to spend the time to track their positions. And there is no grid system anyway, so we'd need to use some kind of abstract positions. But what if I put a sensor under the base of each miniature ? If the board is delimited itself, I figure that it shouldn't be too hard to get the position of each unit. But this is really unknown territory for me ! At the start of the game, once the sensor is linked to its unit, we could also get some data and events concerning the active units ! For games streamed or recorded, this could really enhance the viewers experience !
I know that I'll write some posts with plenty of pictures about some games, but I may also try to do some videos someday !

## Site Navigation & Usage

Not really a feature per-se, but I really want to create a neat experience while using the website. Currently, it's very simple and pretty ugly. First focus is usability. But I want at some point to have other people using my app. And for that, I'll get a killer UX ! Right now, I'm thinking something that give a sci-fi vibe, with panel and sections sliding in and out as you need them. Probably desktop oriented, but I'll have to make it usable on mobile as othewise, plenty of people won't log their games ! 
Might be my biggest challenge, as I'm not at all familiar with what makes a good experience and even have trouble with just making a simple good looking UI, but if I manage to do only half of what I have in mind, it'll already be pretty cool.