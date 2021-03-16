<template>
<div class="side" :class="{'expand': sideStatus}">
  <div class="row-between side-header">
    <IconButton class="back" icon-class="icon-undo" @click.native="$store.commit('side/toggle')" />
    <form action="" class="search" @submit.prevent="load(true)">
      <input ref="input" class="search-input" type="search" v-model="keywords" placeholder="搜索表情包，例如：蘑菇头">
      <IconButton icon-class="icon-search" @click.native="load(true)" />
    </form>
    <IconButton class="home" icon-class="icon-home-1" @click.native="linkTo('https://biaoqing233.com')" />
  </div>
  <ScrollView ref="scroller" class="list">
    <list v-model="loading" :finished="finished" @load="load">
      <VRow :gutter="10">
        <VCol :key="picture._id" v-for="picture in pictures">
          <Item @clickTag="clickTag" :data="picture" alias="list" />
        </VCol>
      </VRow>
      <div class="empty" v-if="empty">空空如也~</div>
      <div class="status" v-show="loading">加载中...</div>
      <div class="status" v-show="finished">没有更多了！</div>
    </list>
  </ScrollView>
  <a href="//biaoqing233.com" class="more">
    查看更多
  </a>
</div>
</template>

<script>
import { search, pictures } from '@/api/pictures'
import List from '@/components/List'
import ScrollView from '@/components/ScrollView'
import Item from './Item'

export default {
  components: {
    List,
    ScrollView,
    Item
  },
  data() {
    return {
      pictures: [],
      keywords: '',
      type: 'latest',
      query: {
        page: 1,
        limit: 40
      },
      loading: false,
      finished: false,
      empty: false
    }
  },
  computed: {
    sideStatus() {
      return this.$store.state.side.status
    }
  },
  mounted() {
    // 获取浏览器本地点赞数据
    this.$store.commit('like/get')
  },
  methods: {
    load(clear) {
      if (this.loading) return false
      const keywords = this.keywords.trim()
      if (clear) {
        this.$refs.scroller.$el.scrollTop = 0
        this.query.page = 1
      }
      if (keywords) {
        this.getPictures(search(keywords, this.query), clear)
      } else {
        this.getPictures(pictures(this.type, this.query), clear)
      }
      setTimeout(() => {
        this.$refs.input.blur()
      })
    },
    getPictures(request, clear) {
      if (this.loading) return false
      this.loading = true
      request
        .then(({ docs: pictures, pages, page, total }) => {
          this.empty = total === 0
          this.finished = !this.empty && page === pages
          this.pictures = clear ? pictures : this.pictures.concat(pictures)
          this.query.page += 1
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    clickTag(name) {
      this.keywords = name
      this.load(true)
    },
    linkTo (href) {
      location.href = href
    }
  }
}
</script>

<style lang="postcss">
.side {
  position: relative;
  padding: 10px;
  height: 100%;
  overflow: hidden;
  background-color: #191919;
  box-sizing: border-box;
  z-index: 9999;
  & .search {
    position: relative;
    flex: 1;
    margin: 0 5px;
    & .icon-btn {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 18px; /*no*/
      height: 100%;
    }
  }
  & .search-input {
    margin: 0;
    padding: 8px 10px;
    width: 100%;
    line-height: normal;
    font-size: 14px; /*no*/
    background: #191919;
    border: none;
    border-radius: 50px;
    color: white;
    box-sizing: border-box;
    border: 1px solid var(--gray); /*no*/
    transition: 0.3s background;
    appearance: none;
    &:focus {
      background-color: white;
      border-color: transparent;
      color: #191919;
      & + .icon-btn {
        color: #191919;
      }
    }
  }

  & .list {
    margin-top: 10px;
    margin-bottom: 20px;
    & .scroll-list {
      padding-bottom: 60px;
    }
  }
  & .empty {
    position: absolute;
    top: 40%;
    color: white;
    text-align: center;
    width: 100%;
  }
  & .status {
    padding: 10px 0; /*no*/
    font-size: 14px; /*no*/
    text-align: center;
    color: white;
  }

  & .home {
    font-size: 20px;
  }
  & .back {
    display: none;
    font-size: 20px; /*no*/
  }

  & .more {
    position: fixed;
    bottom: 20px; /*no*/
    right: 20px; /*no*/
    width: 28px; /*no*/
    height: 28px; /*no*/
    padding: 8px; /*no*/
    line-height: 15px; /*no*/
    font-size: 12px; /*no*/
    text-align: center;
    border-radius: 50%;
    color: white;
    background-color: var(--orange);
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.3); /*no*/
    z-index: 2;
    transform: translateZ(0);
  }
}
</style>
