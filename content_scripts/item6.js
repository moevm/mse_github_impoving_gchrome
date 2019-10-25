function getPulls(token, url, start_from) {
    return fetch(start_from ? url + '&page=' + start_from : url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()).then(data => {
        addMergeConflitIcon(data)
        if (data.length == 0)
            return
        else 
            return getPulls(token, url, start_from + 1)
    })
}

function addMergeConflitIcon(pulls) {
    for(const pr of pulls) {
        if(!pr.merge_commit_sha) {
            let issue = $(`#issue_${pr.number}`)
            if(issue.length) {
                issue = issue.children()[0].children[1]
                let conflict_icon = document.createElement("img")
                conflict_icon.className = "conflict-icon-ext octicon octicon-check v-align-middle"
                conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
                conflict_icon.alt = "Conflict"
                conflict_icon.title = "Merge conflict"

                issue.appendChild(conflict_icon)
            }
        }
    }
}

chrome.extension.onMessage.addListener(function(request, sender, response) {
    if (request.type === 'updatePage') {
        let url = window.location.pathname.split("/")
    
        let path = `https://api.github.com/repos/${url[1]}/${url[2]}/pulls?state=open&per_page=30&sort=created&direction=desc`
    
        getPulls("", path, 1)
    }
  
    return true;
})

