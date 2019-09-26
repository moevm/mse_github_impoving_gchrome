let countUser = 5;
let label = document.getElementsByClassName("commit-tease");
if(label[0] !== undefined) {
    console.log("TRUE!");
    for(let i = 0; i < countUser; i++) {
        let line = document.createElement("div");
        line.id = "commit";
        let avatar = document.createElement("div");
        avatar.id = "avatar";
        let name = document.createElement("div");
        name.id = "name";
        let date = document.createElement("div");
        date.id = "date";


        avatar.innerHTML = "OO";
        date.innerHTML = "Дата последнего коммита пользователя";
        let user = document.createElement("div");
        user.id = "user";
        let commitMessage = document.createElement("div");
        commitMessage.id = "commitText";
        user.innerHTML = "пользователь";
        commitMessage.innerHTML = "коммит";

        name.innerHTML = "пользователь коммит";
        //name.appendChild(user);
        //name.appendChild(commitMessage);


        line.appendChild(avatar);
        line.appendChild(name);
        line.appendChild(date);

        label[0].before(line);
    }

//label[0].remove();

}
else console.log("FALSE!");