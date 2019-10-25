document.addEventListener('DOMContentLoaded', function() {
    const checkPageButton = document.getElementById('createRepos');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            alert(document.body.innerHTML);
            const count = document.getElementById('count').valueOf().value;
            const year = document.getElementById('year').valueOf().value;
            const token = document.getElementById('token').valueOf().value;
            const users = document.getElementById('users').valueOf().value.split(',').map(user => user.trim());
            const teams = document.getElementById('teams').valueOf().value.split(',').map(team => team.trim());
            for(let i = 0; i < parseInt(count); ++i) {
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", "https://api.github.com/user/repos?access_token=" + token, false);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify({name: (i + 1) + year, auto_init: true}));
                alert(xhttp.responseText);
                const name = (i + 1) + year;
                const repo = "<ORGANIZATION_OWNER>" + "/" + (i + 1) + name;//TODO create input for organization owner
                xhttp.open("PUT", "https://api.github.com/repos/"+repo+"/branches/master/protection?access_token=" + token, false);
                xhttp.send(JSON.stringify({
                    required_status_checks: null,
                    enforce_admins: null,
                    required_pull_request_reviews: null,
                    restrictions: {
                        users: users,
                        teams: teams
                    }
                }));
                alert(xhttp.responseText);
            }
        });
    }, false);
}, false);
