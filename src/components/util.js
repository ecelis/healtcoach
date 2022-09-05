export function apiUrlBuilder(dest) {
    const token = localStorage.getItem('token');
    let url = null;
    if (token) {
        url = `${process.env.REACT_APP_APIURL}/${dest}?token=${token}`;
    }
    return url;
}

export const axiosOpts = {
    headers: { 'Content-Type': 'application/json'}
};

export const mealCategories = [
    { id: 1, description: 'Fruit', ico: String.fromCodePoint('0x1F349')},  // :leafy_green:
    { id: 2, description: 'Grains', ico: String.fromCodePoint('0x1F35A')},  // .🍉 
    { id: 3, description: 'Meats', ico: String.fromCodePoint('0x1F356')},  // :rice:
    { id: 4, description: 'Milk', ico: String.fromCodePoint('0x1F9C8')}, // :seedling:
    { id: 5, description: 'Seeds', ico: String.fromCodePoint('0x1F331')} ,  // :meat_bone:
    { id: 6, description: 'Vegetals', ico: String.fromCodePoint('0x1F96C')},   // :meat_bone:
    { id: 7, description: 'Beverages', ico: String.fromCodePoint('0x1F964')}  // :cup_with_straw:
];
