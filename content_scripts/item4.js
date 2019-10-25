let countComment = 3;

setInterval(() => {
    let commentBlock = document.getElementsByClassName("previewable-edit reorderable-task-lists project-comment-body-hover js-comment js-task-list-container");
    if(commentBlock[0] !== undefined) {
        //console.log(commentBlock[0].childElementCount);
        if(commentBlock[0].childElementCount == 4) {
            let commentDiv = document.createElement("div");
            commentDiv.id = "comments";
            for(let i = 0; i < countComment; i++) {
                let comment = document.createElement("div");
                comment.innerHTML = "Комментарий!";
                //commentBlock[0].appendChild(comment);
                commentDiv.appendChild(comment);
            }
            commentBlock[0].appendChild(commentDiv);
        }
    }
}, 100);
