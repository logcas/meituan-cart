<template>
    <div class="catagory">
        <ul>
            <li v-for="(item,key) in catagorys" :key="key" :item="item" @click="selectIndex(key)" :class="{actived:current===key}">{{item.name}}</li>
        </ul>
    </div> 
</template>

<script>
export default {
    props: ['catagorys','current'],
    methods:{
        selectIndex(index) {
            this.$emit('select-index',index);
        }
    }
}
</script>

<style lang="scss" scoped>
@function px2rem($px) {
    @return ($px / 100) + rem;
}

.catagory {
    overflow: auto;
    width: px2rem(250);
    margin: 0;
    padding: 0;
    height: 100%;
    ul {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        background: #f5f6f8;

        li {
            margin: 0;
            padding: 0;
            width: 100%;
            height: px2rem(150);
            background: #f5f6f8;
            border-bottom: px2rem(5) dotted #b3b3b5;

            color: #999999;
            font-size: px2rem(50);
            line-height: px2rem(150);
            text-align: center;

            &.actived {
                background: #fff;
                border-width: 0;
                color: #06c1b0;

            }
        }
    }
}

</style>
