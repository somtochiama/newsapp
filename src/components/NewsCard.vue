<template>
    <div class="card">
        <div class="card__image">
            <img :src="news.urlToImage" alt="Image">
        </div>
        <div class="card__content">
            <h3 class="card__title">{{ news.title }}</h3>
            <p v-if="news.author" class="card__author">Author: {{ news.author }}</p>
            <p v-if="readMore" class="card__description">{{ news.description }} <a @click="readMore = !readMore">Read more</a></p>
            <p  v-else class="card__text">{{ news.content || news.description }} <a @click="readMore = !readMore">See less</a></p>
            <p class="card__publishedAt">Published on :{{ news.publishedAt | filterDate }}</p>
            <p class="card__source">Source: {{ news.source.name }}</p>
        </div>
        <p class="card__link"><a :href="news.url">Read more </a></p>
    </div>
</template>

<script>
export default {
  name: "NewsCard",
  data() {
      return {
          readMore: true
      }
  },
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  filters: {
      filterDate(value) {
          if(value) {
              return new Date(value).toLocaleDateString('en-GB', { day : 'numeric', month : 'short', year : 'numeric'});
          }
      }
  }
};
</script>
<style lang="scss" scoped>
.card {
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__image {
    width: 100%;
    object-fit: cover;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      min-height: 100px;
    }
  }
  &__content {
    padding: 1rem;
    text-align: left;
  }
  &__link {
    background: #912f56;
    margin: 0;
    padding: 1rem;
    color: #ffffff;
    margin-top: auto;
    a,
    a:hover,
    a:active,
    a:visited {
      color: inherit;
      text-decoration: none;
    }
  }
  &__title {
    margin-top: 0;
  }
  &__author {
    font-style: italics;
    color: #912f56;
  }
  &__text,
  &__description {
      a {
          color: #912f56;
          text-decoration: underline;
          cursor: pointer;
          display: block;
      }
  }
}
</style>