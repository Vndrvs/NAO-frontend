<script setup>
import { useToast } from '@/composables/useToast';
const { notifications } = useToast();
</script>

<template>
    <Teleport to="body">
        <div class="fixed bottom-4 right-4 z-9999 flex flex-col gap-2 pointer-events-none">
            <transition-group 
                enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div 
                    v-for="note in notifications" 
                    :key="note.id"
                    class="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-red-500/50 text-red-400 rounded-lg shadow-2xl"
                >
                    <Icon name="lucide:alert-circle" class="w-5 h-5" />
                    <span class="text-sm font-bold">{{ note.msg }}</span>
                </div>
            </transition-group>
        </div>
    </Teleport>
</template>