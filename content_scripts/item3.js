setInterval(() => {
  
let short_task_info = document.getElementsByClassName("Details-content--shown");
for (let i = 0; i < short_task_info.length; ++i) {
    if (short_task_info[i].childElementCount < 3) {
        if (short_task_info[i] !== undefined) {
            let gitExtTask3 = document.createElement("div");
            gitExtTask3.id = "git_ext_task3";

            let copyImg = document.createElement("img");
            copyImg.src = "https://img.icons8.com/material-sharp/10/000000/copy.png";

            let lineTask3 = document.createElement("button");
            lineTask3.id = "copy_task_button";
            lineTask3.onclick= function () {
                let titleList = document.getElementsByClassName("text-bold js-issue-title");
                let title = titleList[0];
                let bodyList= document.getElementsByClassName("d-block comment-body markdown-body  js-comment-body");
                let body = bodyList[0];
                chrome.storage.local.get((['token'], (res) => {
                    let token = res['token'];
                    let url = window.location.pathname.split("/");
                    let path = `https://api.github.com/repos/${url[1]}/${url[2]}/issues`;
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("POST", path + "?access_token=" + token, false);
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.send(JSON.stringify({
                        title: title.innerHTML,
                        body: body.innerText,
                    }));
                    document.location.reload(true);
                }));
            };
            lineTask3.classList.add("btn-link");
            lineTask3.classList.add("muted-link");
            lineTask3.innerHTML = "Clone task";

            gitExtTask3.appendChild(copyImg);
            gitExtTask3.appendChild(lineTask3);
            short_task_info[i].appendChild(gitExtTask3);
        }
    }
}
}, 100);