import { categories } from "@/assets/data/categories";


export const categoryColors: { [key: string]: string } = categories.reduce((acc, category) => {
    acc[category] = getColorForCategory(category);
    return acc;
}, {} as { [key: string]: string });


function getColorForCategory(category: string): string {
    switch (category) {
        case 'freelance':
            return "bg-indigo-400 text-indigo-600";
        case 'social':
            return "bg-teal-400 text-teal-600";
        case 'productivity':
            return "bg-blue-400 text-blue-600";
        case 'wallet':
            return "bg-yellow-400 text-yellow-600";
        case 'health':
            return "bg-purple-400 text-purple-600";
        case 'education':
            return "bg-pink-400 text-pink-600";
        case 'finance':
            return "bg-orange-400 text-orange-600";
        default:
            return "bg-gray-400 text-gray-600";
    }
}