<template>
    <div class="app-wrapper">
        <div class="main-container">
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-container>
                    <el-header>Header</el-header>
                    <el-main>
                        <router-view />
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@mixin clearfix {
    &::after {
        content: "";
        display: table;
        clear: both;
    }
}

.app-wrapper {
    @include clearfix;

    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.main-hidden {
    margin-left: 0 !important;
}

.app-mask {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.re-screen {
    margin-top: 12px;
}
</style>
