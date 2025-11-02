import { getCollection } from "astro:content";

export const getPosts = async () => {
    return (await getCollection('blog')).filter(post => !post.id.includes('/fr')).map(post => ({...post, slug: post.data.perma != undefined ? post.data.perma : post.id}))
}

export const getTranslatedPosts = async () => {
    return (await getCollection('blog')).filter(post => post.id.includes('/fr')).map(post => ({...post, slug: post.data.perma != undefined ? post.data.perma : post.id}))
}

export const getBattleReports = async () => {
    return await getCollection('battle_report')
}