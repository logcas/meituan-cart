<template>
    <div class="good-item">
        <img src="../assets/logo.png">
        <div class="good-item-name">
            {{good.name}}
        </div>
        <div class="good-item-like">
            <span class="sales">月销{{good.sales}}</span>
            <span class="like">赞{{good.like}}</span>
        </div>
        <div class="good-item-price">
            ￥{{good.price}}
        </div>
        <button class="add" @click="$emit('add-good',good)">+</button>
    </div>
</template>

<script>
export default {
    props:['good'],
    methods:{

    }
}
</script>

<style lang="scss" scoped>
@function px2rem($px) {
    @return ($px / 100) + rem;
}

.good-item {
    position: relative;
    padding: px2rem(40) px2rem(30);
    border-top: px2rem(1) solid #d8d8d8;

    img {
        width: px2rem(200);
        height: px2rem(200);
        float: left;
    }

    .good-item-name {
        margin-left: px2rem(230);
        font-size: px2rem(50);
        color: #000;
        font-weight: 900;
    }

    .good-item-like {
        margin-top: px2rem(20);
        margin-left: px2rem(230);
        font-size: px2rem(40);
        color: #999999;

        .like {
            margin-left: px2rem(30);
        }
    }

    .good-item-price {
        margin-top: px2rem(20);
        margin-left: px2rem(230);
        font-size: px2rem(40);
        font-weight: 900;
        color: #06c1b0;
    }

    .add {
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

</style>
