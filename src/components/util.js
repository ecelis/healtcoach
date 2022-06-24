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