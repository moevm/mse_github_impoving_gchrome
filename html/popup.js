document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get("token", function(result) {
        if(typeof result.token !== "undefined") {
            document.getElementById("create_repo_panel").style.display = "block";
            document.getElementById("logout-button").style.display = "block";
            document.getElementById("oauth-button").style.display = "none";
        } else {
            document.getElementById("create_repo_panel").style.display = "none";
            document.getElementById("logout-button").style.display = "none";
            document.getElementById("oauth-button").style.display = "block";
        }
        return result
    });

    const checkPageButton = document.getElementById('createRepos');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.storage.local.get((['token'], (res) => {
                const year = document.getElementById('year').valueOf().value;
                const grList = document.getElementById('grList').valueOf().value.split(',').map(user => user.trim());
                const token = res.token;
                const users = document.getElementById('users').valueOf().value.split(',').map(user => user.trim());
                const teams = document.getElementById('teams').valueOf().value.split(',').map(team => team.trim());
                for (let i = 0; i < grList.length; ++i) {
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("POST", "https://api.github.com/user/repos?access_token=" + token, false);
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    const name = grList[i] + "-" + year;
                    const repo = "<ORGANIZATION_OWNER>" + "/" + name;
                    xhttp.send(JSON.stringify({name: name, auto_init: true}));
                    xhttp.open("PUT", "https://api.github.com/repos/" + repo + "/branches/master/protection?access_token=" + token, false);
                    xhttp.send(JSON.stringify({
                        required_status_checks: null,
                        enforce_admins: null,
                        required_pull_request_reviews: null,
                        restrictions: {
                            users: users,
                            teams: teams
                        }
                    }));
                }
            }));
        });
    }, false);

    document.getElementById('logout-button').addEventListener("click", function () {
        window.oauth2.clearToken();
        location.reload();
    });

    document.getElementById('oauth-button').addEventListener("click", function() {
        window.oauth2.start();
    });
}, false);