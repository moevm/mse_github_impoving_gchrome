setTimeout(function() {
    console.log(7)
    let connections_pulls = document.getElementsByClassName("card-octicon position-absolute");
    if(connections_pulls[0] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/107/107817.svg"
        conflict_icon.alt = "Not connected"

        connections_pulls[0].appendChild(conflict_icon)
    }
    else console.log("FALSE!")

    if(connections_pulls[2] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/107/107817.svg"
        conflict_icon.alt = "Not connected"

        connections_pulls[2].appendChild(conflict_icon)
    }
    else console.log("FALSE!")

    if(connections_pulls[4] !== undefined) {
        let conflict_icon = document.createElement("img")
        conflict_icon.className = "conflict-icon-ext octicon-check v-align-middle"
        conflict_icon.src = "https://image.flaticon.com/icons/svg/107/107817.svg"
        conflict_icon.alt = "Not connected"

        connections_pulls[4].appendChild(conflict_icon)
    }
    else console.log("FALSE!")
}, 500)