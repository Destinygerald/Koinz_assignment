import React from "react"
import { IconType } from "react-icons"

export type tPageIndicatorContext = {
    state: number,
    actions: tPageIndicatorContextActions
}

export type tContextChildren = {
    children: React.ReactNode
}

type tPageIndicatorContextActions = {
    changeCurrentPage: (arg: number) => void
}

type tSliderContextActions = {
    openSlider: () => void,
    closeSlider: () => void
}


export type tSliderContext = {
    state: boolean,
    actions: tSliderContextActions
}

export type tDropMenu = {
    menu? : boolean,
    menuFalse: () => void
}

export type tGroupItem = {
    key? : string | number,
    nav: string,
    label: string,
    icon?: IconType | any,
    color?: string
}

export type tSidebarGroup = {
    group_name? : string, 
    group_items: tGroupItem[],
    type?: number
}

export type tPlaylistOfTheDay = {
    tracks: number,
    playtime: number,
    cover: string
}

export type tRandomSongCard = {
    songname: string,
    artist: string,
    releasetime: string,
    cover: string
}

export type tFeedsItemNav = {
    active: string,
    label: string,
    navChange: (arg: string) => void
}

export type tFeedPlaylistCard = {
    playlist_title: string, 
    playlist_cover_image?: string,
    tracks: number,
    playtime: number,
    release_date: string
}

export type tFeedArtistCard = {
    artist_name: string,
    artist_image?: string,
    no_of_songs: number
}

export type tFeedsAlbumCard = {
    album_name: string,
    artist_name: string,
    no_of_songs: number
}

export type tFeedsSideCard = {
    cover_image?: string,
    song_title: string,
    song_artist: string,
    playtime: number
}

export type tPlaylistHeader = {
    displayType: number,
    gridDisplay: () => void,
    rowDisplay: () => void
}

export type tGridCard = {
    id: string,
    cover_image?: string,
    playlist_name: string,
    no_of_songs: number
}

export type tPlaylistMain = Omit<tPlaylistHeader, 'gridDisplay' | 'rowDisplay'>

export type tPlaylistSongsHdr = {
    playlist_name: string, 
    year: string, 
    no_of_songs: number, 
    playtime: number,
    added_by: string
}

export type tSongCard = {
    cover_image?: string, 
    song_name: string, 
    artist: string, 
    runtime: number
}
