<template>
    <div>
        <LayoutHeader/>
        <div class="container lg:grid lg:grid-cols-12 lg:gap-10">
            <LayoutSidebar class="sticky top-16.25 hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block" />

            <slot />
        </div>
        
    </div>
</template>