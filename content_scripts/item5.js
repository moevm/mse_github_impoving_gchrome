chrome.extension.onMessage.addListener(function(request, sender, response) {
    if (request.type === 'updatePage') {
        chrome.storage.local.get((['token'], (res) => {
            let token = res['token'];
            let url = window.location.pathname.split("/");
            let path = `https://api.github.com/repos/${url[1]}/${url[2]}/commits?access_token=${token}`;
            if (token != undefined) createCommitsList(path, url);
        }));
    }
    return true;
});

function createCommitsList(path, url) {
    let label = document.getElementsByClassName("commit-tease js-details-container Details d-flex rounded-top-1");
    if (label[0] !== undefined && label.length === 1) {
        let usersCommits = [];
        function findName(name) {
            for (let elem of usersCommits) if(elem.name === name) return true;
            return false;
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (data) {
            if (this.readyState === 4 && this.status === 200) {
                let responseData = JSON.parse(data.target.response);
                for (let elem of responseData) {
                    if (findName(elem.commit.author.name)) continue;
                    let lastCommitUser = {
                        'name': elem.commit.author.name,
                        'commit': elem.commit.message,
                        'date': elem.commit.author.date,
                        'avatar': elem.author.avatar_url,
                        'sha': elem.sha,
                        'id': elem.author.id
                    };
                    usersCommits.push(lastCommitUser);
                }

                let select = document.createElement('div');
                select.setAttribute('id', 'selectCommits');
                select.className += ' commit-tease js-details-container Details d-flex rounded-top-1';
                select.style.cursor = 'pointer';
                select.setAttribute('min-width', '300');
                let textSelect = document.createElement('u');
                textSelect.innerHTML = 'SHOW last users commit';
                select.appendChild(textSelect);
                label[0].before(select);

                for (let elem of usersCommits) createElement(elem, url, select);

                let toggle = false;
                document.getElementById("selectCommits").onclick = () => {
                    let commits = document.getElementsByClassName("optionCommit");
                    if (toggle) {
                        textSelect.innerHTML = 'SHOW last users commit';
                        for(let elem of commits) {
                            elem.classList.remove('d-flex');
                            elem.style.display = 'none';
                        }
                    } else {
                        textSelect.innerHTML = 'HIDE last users commit';
                        for(let elem of commits) {
                            elem.style.display = '';
                            elem.classList.add('d-flex');
                        }
                    }
                    toggle = !toggle;
                };
            }
        };
        xhttp.open("GET", path, true);
        xhttp.send();
    }
}

function createElement(elem, url, select) {
    let container = document.createElement("div");
    container.className += ' commit-tease js-details-container Details rounded-top-1 optionCommit';
    container.style.display = 'none';
    let avatarContainer = document.createElement("div");
    avatarContainer.className += ' AvatarStack flex-self-start';
    let avatar = document.createElement("div");
    avatar.className += ' AvatarStack-body';
    avatar.setAttribute('aria-label', `${elem.name}`);
    let refImg = document.createElement('a');
    refImg.className += ' avatar';
    refImg.setAttribute('data-skip-pjax', 'true');
    refImg.setAttribute('data-hovercard-type', 'user');
    refImg.setAttribute('data-hovercard-url', `/hovercards?user_id=${elem.id}`);
    refImg.setAttribute('data-octo-click', 'hovercard-link-click');
    refImg.setAttribute('data-octo-dimensions', 'link_type:self');
    refImg.setAttribute('href', `/${elem.name}`);
    let icon = document.createElement('img');
    icon.setAttribute('height', `20`);
    icon.setAttribute('width', `20`);
    icon.setAttribute('alt', `@${elem.name}`);
    icon.src = elem.avatar;
    avatarContainer.appendChild(avatar);
    avatar.appendChild(refImg);
    refImg.appendChild(icon);

    let info = document.createElement('div');
    info.className += ' flex-auto f6 mr-3';
    let userRef = document.createElement('a');
    userRef.className += ' commit-author tooltipped tooltipped-s user-mention';
    userRef.setAttribute('href', `/${url[1]}/${url[2]}/commits?author=${elem.name}`);
    userRef.setAttribute('aria-label', `View all commits by ${elem.name}`);
    let commitRef = document.createElement('a');
    commitRef.className += ' message text-inherit';
    commitRef.setAttribute('data-pjax', 'true');
    commitRef.setAttribute('title', elem.commit);
    commitRef.setAttribute('href', `/${url[1]}/${url[2]}/commit/${elem.sha}`);
    userRef.innerHTML = `${elem.name} `;
    commitRef.innerHTML = elem.commit;
    info.appendChild(userRef);
    info.appendChild(commitRef);

    let commitAndDate = document.createElement('div');
    commitAndDate.className += ' no-wrap d-flex flex-self-start flex-items-baseline';
    let pred = document.createElement('span');
    pred.className += ' mr-1';
    pred.innerHTML = 'Latest commit';
    let shaRef = document.createElement('a');
    shaRef.className += ' commit-tease-sha mr-1';
    shaRef.innerHTML = elem.sha.substring(0, 7);
    shaRef.setAttribute('href', `/${url[1]}/${url[2]}/commit/${elem.sha}`);
    let date = document.createElement('span');
    let relativeTime = document.createElement('relative-time');
    relativeTime.className += ' no-wrap';
    relativeTime.setAttribute('datetime', elem.date);
    date.appendChild(relativeTime);
    commitAndDate.appendChild(pred);
    commitAndDate.appendChild(shaRef);
    commitAndDate.appendChild(date);

    container.appendChild(avatarContainer);
    container.appendChild(info);
    container.appendChild(commitAndDate);
    select.after(container);
}
