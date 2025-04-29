// Etter alt er lastet, så starter funksjonen/spillet

document.addEventListener("DOMContentLoaded", () => {

    // Det som er inni funksjonen, skal kun kjøre så lenge spillet fortsatt fungerer
    if (!isGameOver) {
    


    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid")
    const alert = document.querySelector("#alert")

    let randomTime = Math.random() * 4000
    let gravity = 0.9
    let isJumping = false
    let isGameOver = false

    function control(e) {
        if (e.code === "Space") {
            if (!isJumping) {
                jump()
            console.log("jumping button")
            }
        }

    }

    document.addEventListener("keydown", control)

    let position = 0
    function jump() {
        isJumping = true
        let count = 0
        let timerId = setInterval( () => {

            if (count ===15) {
                clearInterval(timerId)
                let downTimerId = setInterval(()=> {
                    if(count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    count--
                    position = position * gravity
                    dino.style.bottom = position + "px"

                }, 20)

            }

//jump up
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + "px"
        }, 20)
    }

    function generateObstecales() {
        let obstaclePosition = 1000
        const obstacle = document.createElement("div")
        obstacle.classList.add("obstacle")
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + "px"

        let timerId = setInterval( () => {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
                clearInterval(timerId)
                isGameOver = true
                alert.innerHTML = "Game Over"
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition -= 10
            obstacle.style.left = obstaclePosition + "px"
        }, 20)
        setTimeout(generateObstecales, randomTime)
    }
}
    
    generateObstecales()


    
})