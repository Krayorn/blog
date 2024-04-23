import { getCollection } from "astro:content";

export const getPosts = async () => {
    return (await getCollection('blog')).filter(post => !post.slug.includes('/fr'))
}

export const getTranslatedPosts = async () => {
    return (await getCollection('blog')).filter(post => post.slug.includes('/fr'))
}
