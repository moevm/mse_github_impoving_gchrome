setTimeout(function() {
    console.log(8)
    let connections_pulls = document.getElementsByClassName("card-octicon position-absolute");
    if(connections_pulls[1] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
        conflict_icon.alt = "Not connected"

        connections_pulls[1].appendChild(conflict_icon)
    }
    else console.log("FALSE!")

    if(connections_pulls[3] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
        conflict_icon.alt = "Not connected"

        connections_pulls[3].appendChild(conflict_icon)
    }
    else console.log("FALSE!")

    if(connections_pulls[4] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/578/578996.svg"
        conflict_icon.alt = "Not connected"

        connections_pulls[4].appendChild(conflict_icon)
    }
    else console.log("FALSE!")
}, 550)