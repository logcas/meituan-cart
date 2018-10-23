<template>
    <div class="good-list" @scroll="listScroll" ref="mainroot">
        <div class="catagory actived">{{currentName}}</div>
        <li v-for="(item,key) in goods" :key="key" ref="list">
            <div class="catagory">{{item.name}}</div>
            <good-item
                class="good-item"
                v-for="(i,k) in item.items"
                :key="k"
                :good="i"
                @add-good="addGood(i,$event)"
            ></good-item>
        </li>
    </div>
</template>

<script>
import GoodItem from "./Gooditem.vue";
export default {
  props: ["goods", "selectIndex"],
  computed: {
    currentIndex() {
      let current = -1;
      this.heights.forEach((h, index) => {
        if (h - this.scrollTop <= 200) {
          current = index;
        }
      });
      return current;
    },
    currentName() {
        let name = '';
      if (this.goods[this.currentIndex]) {
        name = this.goods[this.currentIndex].name;
      }
      return name;
    }
  },
  watch: {
    selectIndex(newIndex, oldIndex) {
      let root = document.querySelector(".good-list");
      console.log("change");
      console.log(newIndex);
      this.$nextTick(() => {
        root.scrollTop =
          this.heights[newIndex] - 148 <= 0 ? 0 : this.heights[newIndex] - 148;
      });
    }
  },
  data() {
    return {
      heights: [],
      scrollTop: 0
    };
  },
  methods: {
    listScroll(e) {
      this.scrollTop = e.target.scrollTop;
      this.$emit("current-index", this.currentIndex);
    },
    // 计算单个分类的高度
    getListHeight() {
      this.$refs.list.forEach(el => {
        console.log(el.getBoundingClientRect().top);
        this.heights.push(el.getBoundingClientRect().top);
      });
    },
    addGood(i, e) {
      this.$emit("add-good", i, e);
    }
  },
  mounted() {
    console.log(this.$refs.mainroot.scrollTop);
    console.log(this.$refs.mainroot.getBoundingClientRect().top);
    this.getListHeight();
  },
  components: {
    "good-item": GoodItem
  }
};
</script>

<style lang="scss" scoped>
@function px2rem($px) {
  @return ($px / 100) + rem;
}

.good-list {
  position: relative;
  padding: 0;
  list-style: none;
  overflow: auto;

  li {
    margin: 0;
    padding: 0;
    width: 100%;
  }

    .catagory {
      height: px2rem(70);
      padding-left: px2rem(15);
      color: #555555;
      line-height: px2rem(70);
      font-size: px2rem(40);

      background: #f7f7f7;
      z-index: 999;

      &.actived {
        position: fixed;
        top: px2rem(150);
        width: 100%;
        z-index: 10;
      }

      &.actived + good-item {
        position: relative;
        top: px2rem(200);
      }
    }
}
</style>
