---
title: 'A trip diary with Astro && Cloudflare'
description: 'How to build a simple site using Astro && Cloudflare'
pubDate: 2024-05-21
tags: ["software"]
---

I went to Scotland with my partner this spring and while waiting for our flight back, we spotted a notebook with a nice tartan style. We thought it could be a fun idea to make a diary out of it, with pictures and some recap of what we did, where we went and to try and capture some of our feelings from the trip.

Then we realized it would be nice to share it with our friends and family, and we ended up building a super [simple website](https://scotland-public.krayorn.com/) ([English here](https://scotland-public.krayorn.com/en/)). This is a public version we've deployed without pictures of us.

It's not going to win a pretty website badge or anything, but it was fun and I wanted to write a bit about how we did it here.

## The website

The website is composed of a single Astro page, we could have done only basic HTML and CSS but it gave us the image optimizations for free and we didn't know how complex we'd go at first.

The first step was writing the content: we decided to simply narrate the events, and each of us could add some notes on relevant parts. So we've built a super simple `Paragraph` component that accepted two slots, one for each side where we could put our sticky notes.

```jsx
<div class="paragraph">
    <div class={`side left ${alignLeft ? alignLeft : ""}`}>
        <slot name="postit-left" />
    </div>
    <div class="central-row">
        <slot />
    </div>
    <div class={`side right ${alignRight ? alignRight : ""}`}>
        <slot name="postit-right" />
    </div>
</div>
```

Which is used like this:

```jsx
    <Paragraph>
        <div>
            // Some text
        </div>
        <PostIt slot="postit-left" author="anneso">
            // A note on the left
        </PostIt>
        <PostIt slot="postit-right" author="nath">
            // A note on the right
        </PostIt>
    </Paragraph>
```

Simple.

For the post-it, we used this [sticky note](https://codepen.io/dillonbrady/pen/EgRoZQ).

We've also added an align property so the note would end up at the correct part for longer paragraphs.

The second important bit was the pictures. We wanted to have some flexibility to showcase them, so we've added a `Gallery` component, which is just a wrapper for some CSS. It allows us to have some images in portrait mode, or small or large formats. Really basic stuff.

Last step, a map. We wanted to have a little something to help readers understand the different locations and we went the dumb way. Take a screenshot of the map, then place the pin in position absolute. Then do it again for mobile.
This was not a good idea! When we resized the pin on the map, I had to modify every pin to adjust its position, it was awful.

For the design of the pin, we used another cool [codepen](https://codepen.io/claitonbarreto/pen/dyMgRLQ).

It was near the end of the allotted time for this side project, which took us around 1 day and a half. One afternoon for writing and selecting the pics and one day for building the site.

I was quite pleased with the timing, it didn't take that long, and it was amusing! Just had to deploy it and then done! What a fool I was!

## Hosting

The public version you saw earlier is simply on vercel. Easy, no problem. For the private one, we wanted a password auth, so we couldn't use vercel or GitHub free tier. But I had a machine on DigitalOcean so I simply uploaded the files, wrote a basic Nginx config, and bim! We were good to go.

Wait, it's only http? That's good enough for sure, no need to add https... But that should take what, 10 minutes tops? Yes ok, let's do it. And that was the start of the rabbit hole. 

Being an absolute newbie, I first looked into Cloudflare Origin Server Certificates, then into Cloudflare Edge certificates. Both seemed to do what I needed, but I did not manage to have any of them working.

I then generated a letsencrypt certificate myself, and it worked with 0 effort. But it had an expiration date so I would need to set up some autorenewal or something.

I went to cry for help on Twitter and got saved by [Adrien](https://x.com/AdrienBrault/status/1774854785323131051) who redirected me to Cloudflare tunnels. I read a bit of docs and installed cloudflared to run the tunnel on my server, and bam! HTTPS working! Only took 3 evenings, take that suckers! 

It broke two days later. 

It was an issue between my chair and my keyboard, I hadn't set up cloudflared correctly. I found another bit of [the docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/as-a-service/linux/) that fixed the issue.

## Finishing thoughts

So here we are, we got this side quest completed in 1 day and a half + 3 evenings for the hosting. That's acceptable but way longer than it could have been, and with the new knowledge gained, I hope the next ones will be simpler. 

We still need to do a paper version, which was the original goal, but we've already started talking about making similar websites for other trips. You could think that now that the website is done, we'd just need to add some content, but I'm pretty sure we'll end up rebuilding from scratch everything for the next ones. We probably won't be using a similar layout, maybe we'll want a different vibe... And I'd like to make it better! Prettier, cooler, and more interesting! 

Anyway, we'll see how it goes.
