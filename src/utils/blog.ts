import { getCollection } from "astro:content";

export const getPosts = async () => {
    return (await getCollection('blog')).filter(post => !post.slug.includes('/fr')).map(post => ({...post, slug: post.data.perma != undefined ? post.data.perma : post.slug}))
}

export const getTranslatedPosts = async () => {
    return (await getCollection('blog')).filter(post => post.slug.includes('/fr')).map(post => ({...post, slug: post.data.perma != undefined ? post.data.perma : post.slug}))
}
