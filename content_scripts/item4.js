setInterval(() => {
    chrome.storage.local.get((['token'], (res) => {
        let token = res['token'];
        let url = window.location.pathname.split("/");
        let path = `https://api.github.com/repos/${url[1]}/${url[2]}/issues/`;
        if (token != undefined) createComments(path, token);
    }));
}, 100);

function createComments(partPath, token) {
    let commentBlock = document.getElementsByClassName("previewable-edit reorderable-task-lists project-comment-body-hover js-comment js-task-list-container");
    if (commentBlock[0] !== undefined && commentBlock[0].childElementCount === 4) {
        let commentDiv = document.createElement("div");
        commentBlock[0].appendChild(commentDiv);
        let numberSpan = document.getElementsByClassName('link-gray-dark js-project-card-details-external-link');
        let numberIssue = numberSpan[0].childNodes[3].innerHTML.replace('#', '');
        let comments = [];
        let path = `${partPath}${numberIssue}/comments?access_token=${token}`;
        getComments(comments, commentDiv, path, 1)
    }
}

function getComments(comments, commentDiv, path, numberPage) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (data) {
        if (this.readyState === 4 && this.status === 200) {
            let responseData = JSON.parse(data.target.response);
            if (responseData.length === 0) return;
            for (let elem of responseData) {
                let comment = {
                    'comment': elem.body,
                    'date': elem.created_at,
                    'user': elem.user.login,
                    'avatar': elem.user.avatar_url,
                    'id': elem.user.id
                };
                comments.push(comment);
            }
            commentDiv.className = ' comments';
            for (let elem of comments) createElement(elem, commentDiv);
            comments = [];
            let iconCountComments = document.getElementsByClassName('octicon octicon-comment v-align-middle');
            let button = iconCountComments[0].parentNode;
            button.style.cursor = 'pointer';
            button.addEventListener('click', (event) => {
                let commentsBlock = document.getElementsByClassName('comments')[0];
                if (commentsBlock.style.display === 'none') {
                    commentsBlock.style.display = '';
                } else {
                    commentsBlock.style.display = 'none';
                }
            });
            getComments(comments, commentDiv, path, ++numberPage);
        }
    };
    xhttp.open("GET", `${path}&page=${numberPage}`, true);
    xhttp.send();
}

function createElement(elem, commentDiv) {
    let container = document.createElement("div");
    container.className += ' pt-3 px-3 d-flex';
    let avatarContainer = document.createElement("div");
    avatarContainer.className += ' pr-2';
    let avatar = document.createElement("a");
    avatar.className += ' js-hovercard-left';
    avatar.setAttribute('data-hovercard-type', 'user');
    avatar.setAttribute('data-hovercard-url', `/users/${elem.user}/hovercard`);
    avatar.setAttribute('data-octo-click', 'hovercard-link-click');
    avatar.setAttribute('data-octo-dimensions', 'link_type:self');
    avatar.setAttribute('href', `/${elem.user}`);
    let icon = document.createElement('img');
    icon.className += 'avatar';
    icon.setAttribute('height', `44`);
    icon.setAttribute('width', `44`);
    icon.setAttribute('alt', `@${elem.user}`);
    icon.src = elem.avatar;
    avatar.appendChild(icon);
    avatarContainer.appendChild(avatar);

    let head = document.createElement('div');
    head.className += ' flex-auto overflow-hidden';
    let name = document.createElement('a');
    name.className += ' text-bold text-gray js-hovercard-left';
    name.setAttribute('data-hovercard-type', 'user');
    name.setAttribute('data-hovercard-url', `/users/${elem.user}/hovercard`);
    name.setAttribute('data-octo-click', 'hovercard-link-click');
    name.setAttribute('data-octo-dimensions', 'link_type:self');
    name.setAttribute('href', `/${elem.user}`);
    name.innerHTML = `${elem.user}`;
    let dateContainer = document.createElement('div');
    dateContainer.className += ' text-gray';
    dateContainer.innerHTML = 'commented ';
    let relativeTime = document.createElement('relative-time');
    relativeTime.className += ' no-wrap';
    relativeTime.setAttribute('datetime', elem.date);
    dateContainer.appendChild(relativeTime);

    head.appendChild(name);
    head.appendChild(dateContainer);

    let panel = document.createElement('div');
    panel.className += ' edit-comment-hide';
    let detailes = document.createElement('div');
    detailes.className += ' Details js-details-container';
    panel.appendChild(detailes);
    let pos = document.createElement('div');
    pos.className += ' project-issue-body-wrapper position-relative js-project-issue-body-wrapper';
    detailes.appendChild(pos);
    let last = document.createElement('div');
    last.className += ' js-project-issue-body-container';
    pos.appendChild(last);
    let table = document.createElement('table');
    table.className += ' d-block';
    last.appendChild(table);
    let tr = document.createElement('tr');
    tr.className += ' d-block';
    table.appendChild(tr);
    let td = document.createElement('td');
    td.className += 'd-block comment-body markdown-body  js-comment-body';
    tr.appendChild(td);
    let p = document.createElement('p');
    p.className += ' text-gray';
    td.appendChild(p);
    let text = document.createElement('em');
    text.innerHTML = `${elem.comment}`;
    p.appendChild(text);

    container.appendChild(avatarContainer);
    container.appendChild(head);
    commentDiv.appendChild(container);
    commentDiv.appendChild(panel);
}
