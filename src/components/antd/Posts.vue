<template>
  <a-descriptions title="no">
    <a-descriptions-item label="title">{{ posts.postsData.title }}</a-descriptions-item>
    <a-descriptions-item label="body">{{ posts.postsData.body }}</a-descriptions-item>
  </a-descriptions>
  <a-descriptions title="use swr">
    <a-descriptions-item label="title">{{ data ? data.title : "" }}</a-descriptions-item>
    <a-descriptions-item label="body">{{ data ? data.body : "" }}</a-descriptions-item>
    <a-descriptions-item label="title + body">{{ title }}</a-descriptions-item>
  </a-descriptions>
  <a-button @click="changePosts">获取请求数据</a-button>
  <a-button @click="myReset">重置</a-button>
</template>

<script lang="ts">

//数据请求
import { defineComponent, reactive, toRefs, toRef, computed,watch,ref  } from "vue";
import { Request1 } from "../../request";
import { useSWR } from 'vueposu'


export default defineComponent({
  props: {
    msg: {
      type: String,
    }
  },
  setup(props, context) {


    const p = {
      userId: 0,
      id: 0,
      title: "title",
      body: "body"
    }
    const posts = reactive({
      postsData: p
    })

    const myReset = ()=>{
      posts.postsData = p
    }

    const changePosts = () => {
      Request1("https://jsonplaceholder.typicode.com/posts/1").then((d: { userId: number; id: number; title: string; body: string; }) => {
        console.log(d)
        posts.postsData = d
      }).catch((e: any) => {
        console.log(e)
      })
    }

    const changePostsSwrTest = (url: string) => fetch(url).then(r => r.json())

    const { data, error } = useSWR("https://jsonplaceholder.typicode.com/posts/1", changePostsSwrTest)

    const title = computed(() => data.value? data.value.title:"")
    console.log(data)
    console.log(error)

/*    const refTest = ref(0)
    const title = computed(() => data.title)
    setTimeout(()=>{
      console.log(data)
    }, 2000)
    console.log(data)
    console.log(error)
    console.log(title)
    console.log(refTest)
    console.log(posts)
    console.log(toRef(posts, 'postsData'))
    console.log(toRefs(posts).postsData)*/






    return {posts, myReset, changePosts, data, title}
  }
})


</script>

<style scoped>

</style>
