<template>
    <div v-html="formartContent" v-highlight class="markdown-body" />
</template>
<script>
import { copyText } from "@/utils";
    export default {
        name: 'Markdown',
        props: ['content'],
        directives: {
            highlight: (el) => {
                el.querySelectorAll('pre code').forEach((block)=>{
                    window.hljs && window.hljs.highlightBlock(block)
                })
            }
        },
        computed: {
            formartContent() {
                return this.content.replace(/<pre>/g, `<pre><span class="copy">复制</span>`)
            }
        },
        mounted() {
            this.$nextTick(this.initCopyCode);
        },
        methods: {
            initCopyCode() {
                let pre = document.querySelectorAll("pre");
                for (let i = 0; i < pre.length; i++) {
                    const preItem = pre[i];
                    const copyEl = preItem.querySelector(".copy");
                    const codeEl = preItem.querySelector("code");
                    copyEl.onclick = () => {
                        copyText(codeEl.innerHTML.replace(/<\/?.+?>/g, ""));
                        copyEl.innerText = "复制成功";
                        const timer = setTimeout(() => {
                            copyEl.innerText = "复制";
                            clearTimeout(timer);
                        }, 2000);
                    };
                }
                },
        }
    }
</script>
<style scoped>
.markdown-body {
    background: #fff;
}
</style>