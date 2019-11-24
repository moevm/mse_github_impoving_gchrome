(function() {
    window.oauth2 = {

        access_token_url: "https://github.com/login/oauth/access_token",
        authorization_url: "https://github.com/login/oauth/authorize",
        client_id: "330ca5ac23002e95d75b",
        client_secret: "0e6453aaab8496b9808f66d4b66dec7eb14ab7b1",
        redirect_url: "https://github.com/robots.txt",
        scopes: ["repo"],

        key: "oauth2_token",

        start: function() {
            window.close();
            var url = this.authorization_url + "?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_url + "&scope=";
            for(var i in this.scopes) {
                url += this.scopes[i];
            }
            chrome.tabs.create({url: url, active: true});
        },

        finish: function(url) {

            function removeTab() {
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id);
                });
            };

            if(url.match(/\?error=(.+)/)) {
                removeTab();
            } else {
                var code = url.match(/\?code=([\w\/\-]+)/)[1];

                var that = this;
                var data = new FormData();
                data.append('client_id', this.client_id);
                data.append('client_secret', this.client_secret);
                data.append('code', code);

                var xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function(event) {
                    if(xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            if(xhr.responseText.match(/error=/)) {
                                removeTab();
                            } else {
                                var response = xhr.responseText;
                                var jsonResponse = JSON.parse(response);
                                var tokenOauth = jsonResponse.access_token
                                var obj = { 'token': tokenOauth };
                                chrome.storage.local.set(obj, function() {
                                    console.log('oAuth Token saved');
                                });
                                removeTab();
                            }
                        } else {
                            removeTab();
                        }
                    }
                });
                xhr.open('POST', this.access_token_url, true);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send(data);
            }
        },
        
        getToken: function() {
            chrome.storage.local.get("token", function(result) {
                return result.token
            });
        },

        clearToken: function() {
            chrome.storage.local.remove("token", function() {
                console.log("Token Cleared")
            });
        }
    }
})();
