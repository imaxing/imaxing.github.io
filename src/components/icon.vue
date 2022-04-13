<script>
export default {
  name: 'QuickIcon',
  props: { href: String, icon: String },
  render(h) {
    const { href, icon, $slots, $listeners } = this
    return h(href ? 'a' : 'span', { on: $listeners, class: 'icon-link', attrs: { href, target: '_blank' } }, [
      h('i', { class: `iconfont ${icon}` }),
      $slots.default
    ])
  }
}
</script>
<style scoped>
.icon-link {
  text-decoration: none;
}
.iconfont {
  font-size: 20px;
  font-weight: 400;
}
.icon-link .iconfont {
  margin: 0 4px 0 0;
}
</style>
