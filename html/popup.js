document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('createRepos');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            alert(document.body.innerHTML);
            var count = document.getElementById('count').valueOf().value;
            var year = document.getElementById('year').valueOf().value;
            for(let i = 0; i < parseInt(count); ++i) {
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", "https://api.github.com/user/repos?access_token=<ACCESS_TOKEN>", false);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify({name: (i + 1) + year, auto_init: true}));
                alert(xhttp.responseText);
                var name = (i + 1) + year;
                var repo = "<ORGANIZATION_OWNER>" + "/" + (i + 1) + name;
                xhttp.open("PUT", "https://api.github.com/repos/"+repo+"/branches/master/protection?access_token=<ACCESS_TOKEN>", false);
                xhttp.send(JSON.stringify({
                    required_status_checks: null,
                    enforce_admins: null,
                    required_pull_request_reviews: null,
                    restrictions: {
                        users: [
                            "<USER_NAME>"
                        ],
                        teams: [
                            "<TEAM_NAME>"
                        ]
                    }
                }));
                alert(xhttp.responseText);
            }
        });
    }, false);
}, false);
