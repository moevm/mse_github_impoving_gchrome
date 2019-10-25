setTimeout(function() {
    let issues = document.getElementsByClassName("commit-build-statuses");
    if(issues[0] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
        conflict_icon.alt = "Conflict"

        issues[0].appendChild(conflict_icon)
    }
    else console.log("FALSE!")

    if(issues[2] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
        conflict_icon.alt = "Conflict"

        issues[2].appendChild(conflict_icon)
    }
    else console.log("FALSE!")

    if(issues[4] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
        conflict_icon.alt = "Conflict"

        issues[4].appendChild(conflict_icon)
    }
    else console.log("FALSE!")
}, 100)