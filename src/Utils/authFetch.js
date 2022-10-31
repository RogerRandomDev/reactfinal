async fetchData(url) {
    var _headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var token = await authenticationManager.getAccessToken();
    if (token) {
         _headers.headers['Authorization'] = "Bearer" + token;
    }
    let result = await axios.get(_url, _headers);
    if(result.status === 200) {
        return result;
    }
}