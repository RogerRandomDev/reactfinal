class AuthApi {

    _baseUrl = "/api/";
    _api = null;

    constructor(api) {
        this._api = api;
    }

    async login(email, password) {
        var _this = this;
        var result = await _this._api.postData(_this._baseUrl + "login", {
            "email": email,
            "password": password
        })
        if(result.status === 200){
            authenticationManager.updateToken(result.data.accessToken);
            return result;
        }  
    }
    
    async refresh(refreshToken) {
        var _this = this;
        var result = await _this._api.postData(_this._baseUrl + "refreshtoken", refreshToken);
        return result;
    }
}

export default AuthApi;