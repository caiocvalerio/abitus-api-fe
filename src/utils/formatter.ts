export const formataNome = (name: string): string => {
    if (!name) return 'N/A';
    return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};