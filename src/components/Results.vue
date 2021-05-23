<template>

    <div class="results">

        <div v-if="computedList.length == 0">
            <p v-if="$route.name == 'Home'">No results. Try another word.</p>
            <p v-if="$route.name == 'Favorites'">No favorites. Try to add some.</p>

        </div>

        <div
            v-else
            v-for="(item, index) in computedList"
            :key="index" @click="item.expanded = !item.expanded"

            class="results__item">

            <div class="results__item__wrapper" :class="{ 'results__item__wrapper--expanded': item.expanded}">

                <div
                    v-if="$route.name == 'Favorites'"
                    @dragstart="dragStart( item, index, $event )"
                    @dragover="dragOver( item, index, $event )"
                    @dragend="dragEnd( item, index, $event )"
                    draggable="true"
                    class="results__item--phrase">
                    <drag-button-icon />
                </div>

                <div class="results__item--phrase">{{item.phrase}}</div>

                <div class="results__item--type">{{item.type}}</div>

                <div class="results__item--description">{{item.description}}</div>

                <div class="results__item__icon" @click.stop="onFavoriteClick(item);">

                    <favorite-icon :active="favoriteIDs.includes(item.uuid)" />

                </div>

            </div>

            <div v-if="item.expanded" class="results__item__expansion">

                <div>
                    Transcription: <span class="results__item--transcription">{{item.transcription || 'none'}}</span>
                </div>

                <div>
                    Other variants: <span class="results__item--variants">{{String(item.variants)}}</span>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

import FavoriteIcon from './FavoriteIcon'
import DragButtonIcon from './DragButtonIcon'

export default {

    name: 'Sidebar',
    components: {

        FavoriteIcon,
        DragButtonIcon,

    },
    props: {

        draggable: {

            type: Boolean,
            default: false,

        },

        favorites: {

            type: Boolean,
            default: false,

        }

    },

    data: () => ({

        searchList: [],
        key: '3b65c385-4119-4ed9-aa70-661325681c91',
        selected: null,
        pointer: {
            x: 0,
            y: 0,
        },
        overItem: {},
        dragging: false,
    }),

    computed: {

        computedList() {

            if (this.$route.name == 'Home') {

                return this.sortedList

            } else if (this.$route.name == 'Favorites') {

                return this.favoritesList

            } else {

                return []

            }

        },

        sortedList() {

            if ( this.searchList.length > 0 ) {

                return this.searchList.sort()

            } else {

                return []

            }

        },
        favoritesList() {

            return this.$store.getters[ 'words/favorites/getCurrentFavorites' ].filter( item => {

                if (this.$route.query.class && this.$route.query.class.length > 0) {

                    return item.phrase.includes(this.$route.query.filter || '') && this.$route.query.class.includes(item.type)

                } else {

                    return item.phrase.includes(this.$route.query.filter || '')

                }

            });

        },

        favoriteIDs() {

            return this.$store.getters[ 'words/favorites/getFavoritesIDs' ];

        },

    },

    watch: {

        '$route.query.search': function( newValue ) {

            this.searchList = []

            this.fetchResult( newValue )

        },

    },

    created() {

        if (this.$route.query.search) {

            this.fetchResult( this.$route.query.search )

        }

        if (this.favorites) {

            this.$store.dispatch('words/favorites/fetchFavorites')

        }

    },

    methods: {

        dragStart( item, index, e ) {

            this.pointer.y = e.clientY

            this.dragging = true

        },

        dragOver( item, index, e ) {

            setTimeout(() => {

                this.overItem = {

                    item,
                    index,

                }

            }, 100)

        },

        dragEnd( item, index, e ) {

            this.$store.dispatch('words/favorites/arrangeFavorites', {

                index: index,
                overItemIndex: this.overItem.index,
                item: item

            })

            this.overItem = {}

            this.dragging = false

        },

        isBefore( first, second ) {

            let current = null

            if ( first.parentNode === second.parentNode ) {

                for ( current = first.previousSibling; current; current = current.previousSibling ) {

                    if (cur === second) return true

                }

            } else return false;

        },

        onFavoriteClick(current) {

            if (this.favoriteIDs.includes(current.uuid)) {

                this.$store.dispatch('words/favorites/removeFavoriteItem', current.uuid)

            } else {

                this.$store.dispatch('words/favorites/addFavoriteItem', current)

            }

        },
        fetchResult ( searchWord, single = false ) {

            if ( searchWord ) {

                this.$http.get(searchWord, {

                    params: {

                        key: this.key,

                    }

                }).then((response) => {

                    if ( typeof response.data[0] == 'string' ) {

                        let filteredArray = response.data.filter((item, index, array) => {

                            return item.includes(searchWord)

                        })

                        filteredArray.map((item, index) => {

                            this.fetchResult( item, true )

                        })

                    } else {

                        if ( single ) {


                            let item = response.data[0],
                                _obj = {

                                    uuid: item.meta.uuid,
                                    phrase: item.meta.stems[0],
                                    type: item.fl,
                                    description: item.shortdef[0],
                                    transcription: !!item.hwi.prs ? item.hwi.prs[0].mw : null,
                                    variants: item.meta.stems,
                                    expanded: false,

                                },
                                stringArray = this.searchList.map( item => JSON.stringify(item) )

                            if ( !stringArray.includes( JSON.stringify( _obj ) ) ) {

                                this.searchList.push( _obj )

                            }

                        } else {

                            response.data.map((item, index) => {

                                if ( index < 10 && (item.meta.stems[0].includes(searchWord))) {

                                    this.searchList.push({

                                        uuid: item.meta.uuid,
                                        phrase: item.meta.stems[0],
                                        type: item.fl,
                                        description: item.shortdef[0],
                                        transcription: !!item.hwi.prs ? item.hwi.prs[0].mw : null,
                                        variants: item.meta.stems,
                                        expanded: false,

                                    })

                                }

                            })

                        }

                    }

                })

            }

        }

    }

}

</script>

<style scoped>

.results {

    display: flex;
    /* flex-basis: auto; */
    min-width:0;
    flex-direction: column;
    flex-grow: 1;
    padding-left:40px;

}
.results__item {
    border-radius: 3px;
    background-color:white;
    margin-bottom:10px;
    padding: 0px 16px;
    transition: 0.15s all linear

}
.results__item__wrapper {

    display: flex;
    height:40px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;

}
.results__item__expansion{

    display:flex;
    flex-direction: column;
    padding-bottom:10px;
    align-items: flex-start;

}
.results__item--transcription{

    font-style: italic;

}
.results__item--variants{

    font-weight: bold;

}

.results__item--phrase {

    font-weight: bold;
    margin-right:24px;

}

.results__item--type {

    font-style: italic;
    margin-right:24px;

}

.results__item--description {

    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

}

.results__item__icon {

    justify-content: flex-end;

}

</style>
