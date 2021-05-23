<template>

    <div class="sidebar">

        <input v-model="searchWord" @input="onInputChange()" type="text" class="sidebar__input">

        <div v-if="filtered" class="sidebar__checkbox__panel">

            <div v-for="(item, index) in classes" :key="index" >

                <input @change="filterResult()" :name="item" v-model="selectedClass" :value="item.toLowerCase()" type="checkbox" class="sidebar__checkbox">

                <label :for="item">{{item}}</label>

            </div>

        </div>

    </div>

</template>

<script>

export default {

    name: 'Sidebar',

    props: {

        filtered: {

            type: Boolean,
            default: false,

        }
    },
    data: () => ({

        searchWord: '',
        timer: null,
        classes: [

            'Verb',
            'Noun',
            'Adjective',
            'Adverb',
            'Preposition',
            'Determiner',
            'Pronoun',
            'Conjunction',

        ],
        selectedClass: [],

    }),
    created() {

        if ( this.filtered ) {

            if ( this.$route.query.class ) {

                this.selectedClass = this.$route.query.class.split(',')

            } else {

                this.selectedClass = this.$store.getters[ 'words/favorites/getClasses' ]

            }

            this.searchWord = this.$route.query.filter || this.$store.getters[ 'words/favorites/getFilter' ]

            if (!this.$route.query.hasOwnProperty('filter') || !this.$route.query.hasOwnProperty('class')) {

                this.$router.push({

                    query: {

                        'filter': this.searchWord,
                        'class': String( this.selectedClass )

                    }

                })

            }

        } else {
            this.searchWord = this.$route.query.search || this.$store.getters[ 'words/favorites/getSearch' ]

            if (!this.$route.query.hasOwnProperty('search')) {

                this.$router.push({

                    query: {

                        'search': this.searchWord

                    }

                })

            }

        }

    },
    methods: {

        onInputChange() {

            if (this.filtered) {

                this.filterResult()

            } else {

                this.fetchResult()

            }

        },
        fetchResult() {

            if ( this.timer < 1000 ) {

                clearTimeout( this.timer )

            }

            this.timer = setTimeout(() => {

                if ( this.searchWord.length > 0 ) {

                    this.$store.dispatch('words/favorites/saveSearch', this.searchWord)

                    this.$router.push({

                        query: {

                            'search': this.searchWord

                        }

                    })

                    console.log('searchWord', this.searchWord);

                }

            }, 1000)

        },
        filterResult() {

            this.$store.dispatch('words/favorites/saveFilter', this.searchWord)
            this.$store.dispatch('words/favorites/saveClasses', this.selectedClass)

            this.$router.replace({

                query: {

                    'filter': this.searchWord,
                    'class': String(this.selectedClass)

                }

            })

        }

    }

}

</script>

<style scoped>

.sidebar {

    display: flex;
    flex-direction: column;
    flex-basis: 200px;
    min-width: 200px;
    align-items: start;
    background-color: #e9e9e9;
    border-radius: 3px;
    padding:12px;
    padding-bottom:56px
}

.sidebar__input {

	border:1px solid #CCC;
	background:#FFF;
	margin:0 0 5px;
	padding:10px;
    border-radius:3px;
    width:calc(100% - 24px)

}

.sidebar__checkbox__panel {

    display:flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column

}

.sidebar__checkbox--checked {



}

</style>
