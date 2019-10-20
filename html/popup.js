document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('createRepos');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            alert(document.body.innerHTML);
            var count = document.getElementById('count').valueOf().value;
            var year = document.getElementById('year').valueOf().value;

        });
    }, false);
}, false);