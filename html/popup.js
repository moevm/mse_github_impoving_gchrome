document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('createRepos');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            alert(document.body.innerHTML);
            var count = document.getElementById('count').valueOf().value;
            var year = document.getElementById('year').valueOf().value;
            for(let i = 0; i < parseInt(count); ++i) {
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", "https://api.github.com/user/repos?access_token=30832e1a2f7c458352a84d410d6fff2b18b379c0", false);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify({name: (i + 1) + year}));
                alert(xhttp.responseText)
            }
        });
    }, false);
}, false);