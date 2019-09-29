let search = document.getElementsByClassName("d-sm-flex project-header-controls flex-row flex-items-center f6");
if(search[0] !== undefined) {
    console.log(search);
    let gitExt = document.createElement("div");
    gitExt.id = "git_ext";

    let plus_img = document.createElement("img");
    plus_img.id = "plus_img";
    plus_img.src = "https://img.icons8.com/small/16/000000/plus.png";

    let line = document.createElement("button");
    line.id = "create_task_button";
    line.classList.add("btn-link");
    line.classList.add("muted-link");
    line.innerHTML = "Create task";

    gitExt.appendChild(plus_img);
    gitExt.appendChild(line);

    search[0].appendChild(gitExt);
}
else console.log("FALSE!");