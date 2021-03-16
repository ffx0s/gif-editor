<template>
  <Card
    class="pic-item"
    :url="data.key"
    :name="data.title"
    @click.native="choose"
  >
    <template slot="wrap">
      <div class="layer top">
        <i class="icon-heart" :class="[likeMap[data._id] && 'like']" @click="like"></i>
        <i class="icon-pencil" title="编辑表情" @click="edit"></i>
      </div>
      <div class="layer bottom">
        <a href="javascript:;" @click="$emit('clickTag', tag)" v-for="(tag, index) in data.tags" :key="index">#{{tag}}</a>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from './Card'
import { setImg } from '@/utils/upyun'

export default {
  props: ['data'],
  computed: {
    likeMap() {
      return this.$store.state.like.data
    }
  },
  data() {
    return {
      loading: false,
      likeTotal: this.data.like
    }
  },
  methods: {
    like() {
      if (this.loading) return
      this.loading = true
      this.$store
        .dispatch('like/execute', {
          id: this.data._id,
          status: !this.likeMap[this.data._id]
        })
        .then(() => {
          this.loading = false
          this.likeTotal += this.likeMap[this.data._id] ? 1 : -1
        })
        .catch(() => {
          this.loading = false
        })
    },
    edit() {
      this.$store.commit('side/toggle')
      this.$router.push({
        name: 'editor',
        query: { pic: setImg(this.data.key) }
      })
    },
    choose() {
      // if (browser.ios) return
      // this.$store.commit('side/toggle')
      // this.edit()
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="postcss" scoped>
.pic-item {
  margin-bottom: 10px; /*no*/
  overflow: hidden;
  background-color: white;
  cursor: pointer;
  & img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  &:hover {
    & .layer.top,
    & .layer.bottom {
      transform: translateY(0);
    }
  }
  & .layer {
    position: absolute;
    left: 0;
    padding: 0 5px; /*no*/
    box-sizing: border-box;
    font-size: 12px; /*no*/
    width: 100%;
    overflow: hidden;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    & a {
      margin-right: 10px; /*no*/
      color: white;
      &:hover {
        text-decoration: underline;
      }
    }
    &.bottom {
      bottom: 0;
      height: 25px; /*no*/
      line-height: 25px; /*no*/
      transform: translateY(100%);
      transition: transform 0.2s ease-out;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: white;
    }
    &.top {
      height: 50px; /*no*/
      top: 0;
      left: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
      transform: translateY(-100%);
      transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
        -webkit-transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    & i {
      padding-top: 5px; /*no*/
      margin-left: 10px; /*no*/
      font-size: 16px; /*no*/
      color: white;
      float: right;
      width: 30px; /*no*/
      height: 30px; /*no*/
      text-align: center;
      line-height: 30px; /*no*/
      cursor: pointer;
      &:hover {
        transform-origin: center;
        animation: beat 0.25s infinite alternate;
      }
    }
    & .icon-heart {
      &.like {
        color: #e646b6;
      }
    }
  }
}

@keyframes beat {
  to {
    transform: scale(1.2);
  }
}
</style>
