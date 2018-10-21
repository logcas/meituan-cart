<template>
    <div class="shopping-cart" :class="{'empty':isEmpty}">
        <div class="pocket" v-show="isShow">
            <div class="pocket-header">
                <button class="clean-pocket" @click="$emit('clean-cart')">清空购物车</button>
            </div>
            <div class="pocket-content">
                <div class="item-detail" v-for="(item,key) in cart" :key="key">
                    <span class="item-name">{{item.name}}</span>
                    <span class="item-price">￥{{item.price}}</span>
                    <button class="count-btn decrease" @click="$emit('decrease',item)">-</button>
                    <span class="item-count">{{item.count}}</span>
                    <button class="count-btn increase" @click="$emit('increase',item)">+</button>
                </div>
            </div>
        </div>
        <div class="cart" @click="showDetail">
            <div class="counter">{{totalCount}}</div>
        </div>
        <span class="total">￥{{totalPrice}}</span>
        <span class="delivery-price">另需配送费￥1</span>
        <button class="buy">去结算</button>
    </div>
</template>

<script>
export default {
    props:['cart','isEmpty'],
    computed:{
        totalCount() {
            let count = 0;
            this.cart.forEach(item => {
                count += item.count;
            });
            return count;
        },
        totalPrice() {
            let total = 0;
            this.cart.forEach(item => {
                total += item.price * item.count;
            });
            return total;
        }
    },
    data(){
        return {
            isShow: false,
        }
    },
    methods:{
        showDetail() {
            console.log('click')
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style lang="scss" scoped>
@function px2rem($px) {
    @return ($px / 100) + rem;
}

.shopping-cart {
    height: px2rem(140);
    width: 100%;
    background: #404040;
    overflow: visible;
    font-size: px2rem(40);
    color: #999999;


    .pocket {
        position: absolute;
        bottom: px2rem(140);
        width: 100%;
        background: #ffffff;
        margin-top: px2rem(1) solid #dadada;

        .pocket-header {
            position: relative;
            height: px2rem(140);
            width: 100%;
            background: #f5f5f5;

            button {
                position: absolute;
                top: 50%;
                right: px2rem(30);
                transform: translateY(-50%);
                font-size: px2rem(40);
                color: #999999;
                border-width: 0;
                background:inherit;
                outline: none;
            }
        }

        .pocket-content {
            .item-detail {
                position: relative;
                height: px2rem(180);
                background: #ffffff;
                line-height: px2rem(180);
                color: #000;
                font-size: px2rem(40);

                .item-name {
                    position: absolute;
                    left: px2rem(30);
                }

                .item-price {
                    position: absolute;
                    left: px2rem(400);
                }

                .item-count {
                    position: absolute;
                    display: inline-block;
                    right: px2rem(120);
                }

                .decrease {
                    position: absolute;
                    right: px2rem(180);
                    top: 50%;
                    transform: translateY(-50%);
                }

                .increase {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: px2rem(30);
                }
            }

            .count-btn {
                width: px2rem(70);
                height: px2rem(70);
                position: absolute;
                top: px2rem(135);
                right: px2rem(30);
                background: #06c1b0;
                border-radius: px2rem(35);
                border-width: 0;
                outline: none;

                color: #fff;
                font-size: px2rem(50);
                font-weight: bold;
                line-height: px2rem(70);
                text-align: center;

                &:active {
                    background: #059b8e;
                }
            }
        }
    }

    &.empty {
        .cart {
            background: #b4b4b4;
            background-image: url(../assets/cart.png);
            background-size: 100%;
            
            .counter {
                visibility: hidden;
            }
        }

        .buy {
            background: #404040;
            color: #999999;
        }

        .delivery-price {
            display: inline;
            font-size: px2rem(40);
            top: 50%;
            transform: translateY(-50%);
        }

        .total {
            display: none;
        }
            
    }

    .total {
        position: absolute;
        top: px2rem(10);
        left: px2rem(185);
        font-size: px2rem(50);
        color: #06c1ae;
        font-weight: 900;
    }

    .cart {
        position: relative;
        float: left;
        margin-top: px2rem(-20);
        margin-left: px2rem(25);
        width: px2rem(120);
        height: px2rem(120);
        border-radius: px2rem(60);
        background: #06c1ae;
        background-image: url(../assets/cart.png);
        background-size: 100%;

        .counter {
            position: absolute;
            top: 0;
            right: 0;
            width: px2rem(40);
            height: px2rem(40);
            border-radius: px2rem(20);
            color: #fff;
            font-size: px2rem(30);
            line-height: px2rem(40);
            text-align: center;
            background: #fe9900;
            z-index: 50;
        }
    }

    .delivery-price {
        position: absolute;
        top: px2rem(80);
        left: px2rem(185);
        font-size: px2rem(35);
    }

    .buy {
        position: absolute;
        right: 0;
        width: px2rem(314);
        height: 100%;
        background: #fe9900;
        border-width: 0;
        outline: none;

        color: #fff;
        font-size: px2rem(40);
        line-height: px2rem(140);
        text-align: center;

    }

}

</style>
