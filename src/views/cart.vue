<template>
    <div class="cart">
        <div class="header">美团外卖</div>
        <div class="content">
            <good-catagory
                class="catagory"
                :catagorys="goods"
                :current="currentIndex"
                @select-index="selectIndex = $event"
            ></good-catagory>
            <good-list
                class="list"
                :goods="goods"
                @scroll="listScroll"
                @current-index="setCatagory"
                :select-index="selectIndex"
                @add-good="addGood"
            ></good-list>
        </div>
        <shopping-cart
            class="cart"
            :cart="shoppingcart"
            :is-empty="isEmpty"
            @decrease="decreaseItem"
            @increase="addGood"
            @clean-cart="cleanCart"
        ></shopping-cart>
        <div class="ball-container">
            <div v-for="(ball,key) in balls" :key="key" :ball="ball">
                <transition
                    name="drop"
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop"
                >
                    <div class="ball-outer" v-show="ball.isShow">
                        <div class="ball-inner"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Gooditem from "../components/Gooditem.vue";
import GoodCatagory from "../components/GoodCatagory.vue";
import GoodList from "../components/GoodList.vue";
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
  computed: {
    isEmpty() {
      return this.shoppingcart.length === 0;
    }
  },
  data() {
    return {
      currentIndex: 0,
      selectIndex: 0,
      shoppingcart: [
        {
          name: "商品1",
          price: 20,
          count: 1
        },
        {
          name: "商品2",
          price: 35,
          count: 2
        }
      ],
      goods: [
        {
          name: "商品分类1",
          items: [
            {
              name: "商品1",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品2",
              price: 99,
              like: 0,
              sales: 666
            },
            {
              name: "商品1",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品2",
              price: 99,
              like: 0,
              sales: 666
            },
            {
              name: "商品1",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品2",
              price: 99,
              like: 0,
              sales: 666
            }
          ]
        },
        {
          name: "商品分类2",
          items: [
            {
              name: "商品3",
              price: 220,
              like: 10,
              sales: 66
            },
            {
              name: "商品4",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品1",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品2",
              price: 99,
              like: 0,
              sales: 666
            }
          ]
        },
        {
          name: "商品分类3",
          items: [
            {
              name: "商品3",
              price: 220,
              like: 10,
              sales: 66
            },
            {
              name: "商品4",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品1",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品2",
              price: 99,
              like: 0,
              sales: 666
            },
            {
              name: "商品3",
              price: 220,
              like: 10,
              sales: 66
            },
            {
              name: "商品4",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品1",
              price: 20,
              like: 10,
              sales: 66
            },
            {
              name: "商品2",
              price: 99,
              like: 0,
              sales: 666
            }
          ]
        }
      ],
      balls: [
        { isShow: false },
        { isShow: false },
        { isShow: false },
        { isShow: false },
        { isShow: false },
        { isShow: false }
      ],
      droppingBalls: []
    };
  },
  methods: {
    listScroll(e) {
      console.log(e);
    },
    setCatagory(current) {
      this.currentIndex = current;
    },
    addGood(g, e) {
      console.log(e);
      this.drop(e.target);
      let name = g.name,
        hasIn = false;
      this.shoppingcart.forEach(el => {
        if (el.name === g.name) {
          el.count++;
          hasIn = true;
        }
      });
      if (hasIn) return;
      this.shoppingcart.push({
        name: g.name,
        price: g.price,
        count: 1
      });
    },
    decreaseItem(item) {
      let isDelete = false,
        index = -1;

      this.shoppingcart.forEach((el, i) => {
        if (item.name === el.name) {
          if (--el.count === 0) {
            isDelete = true;
            index = i;
          }
        }
      });

      if (isDelete) {
        this.shoppingcart.splice(index, 1);
      }
    },
    cleanCart() {
      this.shoppingcart.splice(0, this.shoppingcart.length);
    },
    drop(elem) {
      let len = this.balls.length;
      // 从空闲的小球中取一个小球
      for (let i = 0; i < len; ++i) {
        if (!this.balls[i].isShow) {
          this.balls[i].elem = elem;
          this.balls[i].isShow = true;
          this.droppingBalls.push(this.balls[i]);
          return;
        }
      }
    },
    // beforeDrop并不是小球的过渡
    // 因此，可以在这里设定小球的初始位置
    // 因为CSS中我们把小球的位置设置到了购物车的位置
    // 所以整个逻辑是：
    // 1. beforeDrop() => 把小球位移到按钮的位置，并且显示
    // 2. dropping() => 小球过渡动画启动，从按钮位置过渡回原点 => 也就是translate为0的点
    // 3. afterDrop() => 引发重绘，并且隐藏小球，把小球从活动序列中去掉。
    beforeDrop(elem) {
      let len = this.balls.length;
      for (let i = len - 1; i >= 0; --i) {
        if (this.balls[i].isShow) {
          let ball = this.balls[i];
          // rect 获取按钮在视口中的位置
          let rect = ball.elem.getBoundingClientRect();
          let x = rect.left;
          // y 是负数，因为把小球从购物车图标的位置向右上方移动，X增加，Y减小
          let y = -(window.innerHeight - rect.top);
          elem.style.display = "block";
          // 外层框控制小球的Y坐标
          elem.style.webkitTransform = `translate3d(0,${y}px,0)`;
          elem.style.transform = `translate3d(0,${y}px,0)`;
          // 内层框控制小球的X坐标
          let inner = elem.getElementsByClassName("ball-inner")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(elem, done) {
      let rf = elem.offsetHeight;
      this.$nextTick(() => {
        elem.style.webkitTransform = "translate3d(0,0,0)";
        elem.style.transform = "translate3d(0,0,0)";
        let inner = elem.getElementsByClassName("ball-inner")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        elem.addEventListener("transitionend", done);
      });
    },
    afterDrop(elem) {
      let ball = this.droppingBalls.shift();
      if (ball) {
        ball.isShow = false;
        elem.style.display = "none";
      }
    }
  },
  components: {
    "good-item": Gooditem,
    "good-catagory": GoodCatagory,
    "good-list": GoodList,
    "shopping-cart": ShoppingCart
  }
};
</script>

<style lang="scss" scoped>
@function px2rem($px) {
  @return ($px / 100) + rem;
}

.cart {
  overflow: hidden;

  .ball-outer {
    position: fixed;
    bottom: px2rem(32);
    left: px2rem(22);
    z-index: 999;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .ball-inner {
      width: px2rem(70);
      height: px2rem(70);
      border-radius: px2rem(35);
      background: #06c1b0;
      transition: all 0.4s linear;
    }
  }

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: px2rem(150);
    line-height: px2rem(150);
    font-size: px2rem(50);
    color: #565656;
    text-align: center;
    background: #f9f9f9;
    border-bottom: 1px solid #b3b3b3;
    z-index: 999;
  }

  .content {
    position: absolute;
    width: 100%;
    top: px2rem(151);
    bottom: px2rem(140);

    .catagory {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
    }

    .list {
      position: absolute;
      left: px2rem(250);
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  .cart {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>

