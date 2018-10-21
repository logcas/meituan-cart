<template>
    <div class="cart">
        <div class="header">
            美团外卖
        </div>
        <div class="content">
            <good-catagory class="catagory" :catagorys="goods" :current="currentIndex" @select-index="selectIndex = $event"></good-catagory>
            <good-list class="list" :goods="goods" @scroll="listScroll" @current-index="setCatagory" :select-index="selectIndex" @add-good="addGood"></good-list>
        </div>
        <shopping-cart class="cart" :cart="shoppingcart" :is-empty="isEmpty" @decrease="decreaseItem" @increase="addGood" @clean-cart="cleanCart"></shopping-cart>
    </div>
</template>

<script>
import Gooditem from '../components/Gooditem.vue';
import GoodCatagory from '../components/GoodCatagory.vue';
import GoodList from '../components/GoodList.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

export default {
    computed:{
        isEmpty() {
            return this.shoppingcart.length === 0;
        }
    },
    data() {
        return {
            currentIndex:0,
            selectIndex:0,
            shoppingcart:[
                {
                    name: '商品1',
                    price: 20,
                    count: 1
                },
                {
                    name: '商品2',
                    price: 35,
                    count: 2
                }
            ],
            goods:[
                {
                    name: '商品分类1',
                    items: [
                        {
                            name: '商品1',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品2',
                            price: 99,
                            like: 0,
                            sales: 666
                        },
                        {
                            name: '商品1',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品2',
                            price: 99,
                            like: 0,
                            sales: 666
                        },
                        {
                            name: '商品1',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品2',
                            price: 99,
                            like: 0,
                            sales: 666
                        }
                    ]
                },
                {
                    name: '商品分类2',
                    items: [
                        {
                            name: '商品3',
                            price: 220,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品4',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品1',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品2',
                            price: 99,
                            like: 0,
                            sales: 666
                        }
                    ]
                },
                {
                    name: '商品分类3',
                    items: [
                        {
                            name: '商品3',
                            price: 220,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品4',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品1',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品2',
                            price: 99,
                            like: 0,
                            sales: 666
                        },
                        {
                            name: '商品3',
                            price: 220,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品4',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品1',
                            price: 20,
                            like: 10,
                            sales: 66
                        },
                        {
                            name: '商品2',
                            price: 99,
                            like: 0,
                            sales: 666
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        listScroll(e) {
            console.log(e);
        },
        setCatagory(current) {
            this.currentIndex = current;
        },
        addGood(g) {
            let name = g.name,
                hasIn = false;
            this.shoppingcart.forEach(el => {
                if(el.name === g.name) {
                    el.count++;
                    hasIn = true;
                }
            });
            if(hasIn) return;
            this.shoppingcart.push({
                name: g.name,
                price: g.price,
                count: 1
            });
        },
        decreaseItem(item) {
            let isDelete = false,
                index = -1;
            
            this.shoppingcart.forEach((el,i) => {
                if(item.name === el.name) {
                    if(--el.count === 0) {
                        isDelete = true;
                        index = i;
                    }
                }
            });

            if(isDelete) {
                this.shoppingcart.splice(index,1);
            }
        },
        cleanCart() {
            console.log('clean');
            this.shoppingcart.splice(0,this.shoppingcart.length);
        }
    },
    components:{
        'good-item': Gooditem,
        'good-catagory': GoodCatagory,
        'good-list': GoodList,
        'shopping-cart': ShoppingCart,
    }
}
</script>

<style lang="scss" scoped>
@function px2rem($px) {
    @return ($px / 100) + rem;
}

.cart {
    overflow: hidden;

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

