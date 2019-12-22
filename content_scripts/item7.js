let pullRequests = [];
let issues = [];
let isLoad = false;
let reg = /(#\d*)/;

chrome.extension.onMessage.addListener(function(request, sender, response) {
    if (request.type === 'updatePage') {
        chrome.storage.local.get((['token'], (res) => {
            let token = res['token'];
            let url = window.location.pathname.split("/");
            let path = `https://api.github.com/repos/${url[1]}/${url[2]}/pulls?access_token=${token}`;
            if (token != undefined && isLoad === false) {
                isLoad = true;
                getAllPullRequests(path, 1);
            }
        }));
    }
    return true;
});

function setClips() {
    let connections_pulls = document.getElementsByClassName("card-octicon position-absolute");
    if (connections_pulls.length === 0) setTimeout(setClips, 500);
    for (let elem of connections_pulls) {
        try {
            let isCreate = isIssue(elem.nextElementSibling.nextElementSibling.firstElementChild.innerHTML.replace('#', ''));
            if (!isCreate) {
                let conflict_icon = document.createElement("img");
                conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle";
                conflict_icon.src = "https://image.flaticon.com/icons/svg/107/107817.svg";
                conflict_icon.alt = "Not connected";
                elem.appendChild(conflict_icon);
            }
        } catch (e) {
            continue;
        }
    }
}

function getAllPullRequests(path, numberPage) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (data) {
        if (this.readyState === 4 && this.status === 200) {
            let responseData = JSON.parse(data.target.response);
            if (responseData.length === 0) {
                findIssue(pullRequests);
                setClips();
                return;
            }
            pullRequests = pullRequests.concat(responseData);
            getAllPullRequests(path, ++numberPage);
        }
    };
    xhttp.open("GET", `${path}&page=${numberPage}`, true);
    xhttp.send();
}

function findIssue(pullRequests) {
    for (let elem of pullRequests) {
        if (elem.state === 'open' && isRelations(elem.body)){
            issues.push(reg.exec(elem.body)[1].replace('#', ''));
        }
    }
}

function isRelations(body) {
    return reg.test(body);
}

function isIssue(number) {
    for (let elem of issues) {
        if (elem === number) return true;
    }
    return false;
}
