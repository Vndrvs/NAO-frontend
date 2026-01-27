const notifications = ref<{ id: number; msg: string; type: 'error'|'success' }[]>([]);

export const useToast = () => {
    const error = (msg: string) => {
        const id = Date.now();
        notifications.value.push({ id, msg, type: 'error' });
        setTimeout(() => notifications.value = notifications.value.filter(n => n.id !== id), 3000);
    };
    return { notifications, error };
};