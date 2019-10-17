<template>
    <div class="newsline">
        <h1 class="newsline__header">Latest News</h1>
        <div class="toggle__wrapper">
            <div class="toggle__tab" :class="{isCard: isCard}" @click="toggleView">Card View</div>
            <div class="toggle__tab" :class="{isList : isList}" @click="toggleView">List View</div>
        </div>
        <div class="news" :class="{isList: isList}">
            <news-card 
                v-for="(news, i) in allNews"
                :key="i"
                :news="news"
            />
        </div>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NewsCard from '@/components/NewsCard';
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: "Timeline",
    components: {
        InfiniteLoading,
        NewsCard
    },
    data: () => ({
        page: 0,
        list: [],
        isCard: true,
        isList: false
    }),
    computed: {
        ...mapGetters([
            'allNews',
            'totalCount'
        ])
    },
    methods: {
        async infiniteHandler($state) {
            this.page = this.page + 1
            await this.$store.dispatch('getNews', {
                page: this.page
            })
            if(this.page * 20 < this.totalCount) {
                $state.loaded()
            } else {
                $state.complete()
            }
        },
        toggleView() {
            this.isCard = !this.isCard;
            this.isList = !this.isList;
        }
    },
    mounted() {
        // this.$store.dispatch('getNews', {
        //     page: this.page
        // })
    }
}
</script>
<style lang="scss">

.newsline {
    margin: 0 auto;
    padding: 1rem 3rem;
    text-align: center;
    max-width: 1200px;
    &__header {
        color: #912F56;
        text-decoration: underline;
    }
    .news {
        margin-top: 30px;
        display: grid;
        justify-content: center;
        grid-template-columns:  repeat(auto-fill, minmax(300px,1fr));
        grid-gap: 20px;
        &.isList {
            display: block;
            .card {
                flex-direction: row;
                margin-bottom: 1rem;
                flex-flow:column wrap; 
                &__image,
                &__description,
                &__text {
                    display: none;
                }
                &__link {
                    order: 2;
                }
            }
        }
    }
}
.toggle__wrapper {
    display: flex;
}
.toggle__tab {
    padding: 1rem 2rem;
    cursor: pointer;
    &.isCard,
    &.isList {
        border-bottom: 4px solid #912F56;
    }
}

</style>