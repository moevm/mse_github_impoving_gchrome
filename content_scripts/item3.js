setInterval(() => {
  
let short_task_info = document.getElementsByClassName("link-gray-dark js-project-card-details-external-link");
for (let i = 0; i < short_task_info.length; ++i) {
    if (short_task_info[i].childElementCount < 3) {
        if (short_task_info[i] !== undefined) {
            let gitExtTask3 = document.createElement("div");
            gitExtTask3.id = "git_ext_task3";

            let copyImg = document.createElement("img");
            copyImg.src = "https://img.icons8.com/material-sharp/10/000000/copy.png";

            let lineTask3 = document.createElement("button");
            lineTask3.id = "copy_task_button";
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