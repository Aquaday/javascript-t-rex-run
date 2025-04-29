// Etter alt er lastet, så starter funksjonen/spillet

document.addEventListener("DOMContentLoaded", () => {


// Hent elementer fra index.html
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid")
    const alert = document.querySelector("#alert")

    // Definer forskjellige variabler vi skal bruke lengre nede i koden
    let position = 0
    let gravity = 0.9
    let isJumping = false
    let isGameOver = false


    // Funksjonen skjekker om det spesifikke eventet eller (e) har skjedd, 
    // i dette tilfelle sjekker om "eventet" e.code === "Space"/ space er trykket på, 
    // og gjør deretter det som er inne i funksjonen
    function control(e) {
        if (e.code === "Space") {
            // Kjører denne funksjonen så lenge isJumping er false, 
            // som kan skrives som !isJumping istedenfor isJumping = false
            if (!isJumping) {
                jump()
            }
        }

    }

    // Sjekker dokumentet om en eller annen knapp på tastaturet er trykket ned, og kjører funksjonen control
    document.addEventListener("keydown", control)

    // Lager funksjonen til jump
    function jump() {
        // Endrer denne for å gjøre at control(e) funksjonen ikke kan trykkes på nytt.
        isJumping = true

        // Definerer og starter count/opptelling på 0
        let count = 0

        // Lager en timer/funksjon som kjører igjennom seg selv i hver 20ms, 
        // helt til noe sier stopp
        let timerId = setInterval( () => {

            // hvis count er opp i 15, så stopper den funksjonen fra å kjøre flere ganger.
            if (count === 15) {
                clearInterval(timerId)

                // Lager en ny funksjon som kjører hvert 20ms, helt til count er nede på 0. 
                let downTimerId = setInterval(()=> {
                    if(count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }

                    // Endrer på posisjonen på dino Id, sånn at den faller ned, og fjerner 1 fra count.
                    position -= 5
                    count--
                    position = position * gravity
                    dino.style.bottom = position + "px"
                }, 20)
            }

            // Endrer på posisjonen på dino Id, sånn at den hopper opp, og legger til 1 på count.
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + "px"

        }, 20)
    }
    
// Lager hindere i veien
    function generateObstacles() {

            // Det som er inni funksjonen, skal kun kjøre så lenge spillet ikke er over
        if (!isGameOver) {

            // Definerer startpunktet til hvert hinder, og lager et hinder (div med obstacle class på seg), 
            // og legger den inn i grid, og gir deretter den posisjonen som er definert 
        let obstaclePosition = 1000
        const obstacle = document.createElement("div")
        obstacle.classList.add("obstacle")
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + "px"

        // Lager en til funksjon som kjører hvert 20ms, helt til den blir stoppet
        let timerId = setInterval( () => {

            // Her stopper funksjonen å loope hvis alle 3 tingene stemmer, 
            // og gjør resten av det inne i if squarebrackets{}
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
                clearInterval(timerId)
                isGameOver = true
                alert.innerHTML = "Game Over"

                // Så lenge grid har ett firstChild (ett element inne i div med klassen grid), 
                // så looper den igjennom og fjerner det elementet, som i dette tilfelle er dino og obstacles
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }

            // For hver gang denne funksjonen kjøres igjennom, 
            // så tar den vekk 10 fra den originale obstaclePoistion som var 1000, 
            // og oppdaterer left position verdien.
            obstaclePosition -= 10
            obstacle.style.left = obstaclePosition + "px"
        }, 20)

        // Lager ett tilfeldig tall mellom 0 og 4000, og legger det til setTimeout, 
        // som gjør at etter randomTime i ms har gått, så kjører den generateObstacles igjen
        let randomTime = Math.random() * 4000
        setTimeout(generateObstacles, randomTime)
    }
}
// Vi kjører funksjonen en gang manuelt for å begynne å lage obestacles. 
// Vi trenger kun å gjøre det med denne, for resten av funksjonene starter når man trykker Space.
generateObstacles()
    
})