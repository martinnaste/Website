import React, {useEffect, useState} from 'react'
import LeaderboardModal from './LeaderboardModal'
import './Gamebox.css'
import './HeroSection.css'

//Worked through this tutorial https://www.youtube.com/watch?v=MCVU0w73uKI and implemented it within a useEffect().
//Made some changes to better the game and be relatable to the website overall
function Gamebox({ clickShip }) {
    //List of icons
    const icons = ['code-branch-solid', 'code-solid', 'css3-brands', 'ethereum-brands', 'free-code-camp-brands', 'html5-brands', 'java-brands', 'js-square-brands', 'node-js-brands', 'python-brands', 'react-brands', 'terminal-solid']

    const [refresh, setRefresh] = useState(false)
    const [score, setScore] = useState(0)
    const [showModal, setShowModal] = useState(false)

    let canFire = true;
    let scoreText = "Score: "

    let game = {
        over: false,
        active: false
    }

    function exitGame() {
        clickShip()
        game.active = false
    }

    function refreshGame(){
        setRefresh(!refresh)
    }

    function resetScore(){
        setScore(0)
    }

    //PreLoad all the images so when the game starts we arent stuck without images during the randomiser 
    function preload() {
        for (let i = 0; i < icons.length; i++) {
            const image = new Image()
			image.src = require(`../assets/images/icons/${icons[i]}.png`);
        }
    }
    preload()

    useEffect(() => {
        const canvas = document.querySelector('canvas')
        const scoreEl = document.querySelector('#scoreEl')
        const c = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 80

        class Player {
            constructor() {
                this.velocity = {
                    x: 0,
                    y: 0
                }

                this.opacity = 1

                const image = new Image()
                image.src = require(`../assets/images/gameShipLarge.png`);
                image.onload = () => {
                    //Game ship Large scaled down
                    const scale = 33
                    this.image = image
                    this.width = image.width / scale
                    this.height = image.height / scale
                    this.position = {
                        x: canvas.width / 2 - this.width / 2,
                        y: canvas.height - this.height - 110
                    }

                    // Old Game Ship scaling
                    // const scale = 2
                    // this.image = image
                    // this.width = image.width * scale
                    // this.height = image.height * scale
                    // console.log(this.width, this.height);
                    // this.position = {
                    //     x: canvas.width / 2 - this.width / 2,
                    //     y: canvas.height - this.height - 110
                    // }
                }
            }

            draw() {
                c.save()
                c.globalAlpha = this.opacity
                c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
                c.restore()
            }

            update() {
                if (this.image){
                    this.draw()
                    this.position.x += this.velocity.x
                }
            }
        }

        class Projectile {
            constructor({position, velocity}) {
                this.position = position
                this.velocity = velocity

                this.radius = 4
            }

            draw() {
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                c.fillStyle = 'red'
                c.fill()
                c.closePath()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }

        class Particle {
            constructor({position, velocity, radius, color}) {
                this.position = position
                this.velocity = velocity

                this.radius = radius
                this.color = color
                this.opacity = 1
            }

            draw() {
                c.save()
                c.globalAlpha = this.opacity
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                c.fillStyle = this.color
                c.fill()
                c.closePath()
                c.restore()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
                this.opacity -= 0.01
            }
        }

        class InvaderProjectile {
            constructor({position, velocity}) {
                this.position = position
                this.velocity = velocity

                this.width = 3
                this.height = 10
            }

            draw() {
                c.fillStyle = 'white'
                c.fillRect(this.position.x, this.position.y, this.width, this.height)
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }

        class Invader {
            constructor({position}) {
                this.velocity = {
                    x: 0,
                    y: 0
                }

                const image = new Image()
                //randomises the image for each invader in the grid
                image.src = require(`../assets/images/icons/${icons[Math.floor(Math.random() * icons.length)]}.png`);
                image.onload = () => {
                    const scale = 20
                    this.image = image
                    this.width = image.width / scale
                    this.height = image.height / scale
                    this.position = {
                        x: position.x,
                        y: position.y
                    }
                }
            }

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
            }

            update({velocity}) {
                if (this.image){
                    this.draw()
                    this.position.x += velocity.x
                    this.position.y += velocity.y
                }
            }

            shoot(invaderProjectiles) {
                invaderProjectiles.push(new InvaderProjectile({
                    position: {
                        x: this.position.x + this.width / 2,
                        y: this.position.y + this.height
                    },
                    velocity: {
                        x: 0,
                        y: 4
                    }
                }))
            }
        }

        class Grid {
            constructor() {
                this.position = {
                    x: 0,
                    y: 0
                }

                this.velocity = {
                    x: 2,
                    y: 0
                }

                this.invaders = []

                //Randomising the rows and column amounts for the grid
                const cols =  Math.floor(Math.random() * 10 + 5)
                const rows =  Math.floor(Math.random() * 5 + 2)

                this.width = cols * 36

                for (let i = 0; i < cols; i++){
                    for (let j = 0; j < rows; j++){
                        this.invaders.push(new Invader({
                            position: {
                                x: i * 36,
                                y: j * 36
                            }
                        }))
                    }
                }
            }

            update() {
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y

                this.velocity.y = 0

                if (this.position.x + this.width >= canvas.width || this.position.x <= 0){
                    this.velocity.x = -this.velocity.x
                    this.velocity.y = 48
                }
            }
        }

        const player = new Player()
        const projectiles = []
        const grids = []
        const invaderProjectiles = []
        const particles = []

        const keys = {
            a: {
                pressed: false
            },
            d: {
                pressed: false
            },
            k: {
                pressed: false
            },
        }

        let frames = 0
        let randomInterval = Math.floor((Math.random() * 500) + 750)
        let score = 0;
        //Had game{} here but moved to outside for access

        //Function that is called to create the particles at the object which is destroyed (Ship/Inavder)
        function createParticles({object}) {
            for (let i = 0; i < 15; i++){
                particles.push(new Particle({
                    position: {
                        x: object.position.x + object.width / 2,
                        y: object.position.y + object.height / 2
                    },
                    velocity: {
                        x: (Math.random() - 0.5) * 2,
                        y: (Math.random() - 0.5) * 2
                    },
                    radius: Math.random() * 3,
                    color: 'white'
                })) 
            }
        }

        function animate() {
            //If the game is not active then dont run the animation
            if (!game.active) return
            //Checking if user have hit the refresh button while its animating
            //if the user has not, it will run the animation, else it will reset the canvas and then reset the refresh
            //variable to false and start the game again
            if (!refresh) {
                requestAnimationFrame(animate)
                c.fillStyle = '#14202d'
                c.fillRect(0, 0, canvas.width, canvas.height)
                player.update()
                //Memory clearing - if the particle is invisible, delete it from the array
                //else update its position etc
                particles.forEach((particle, index) => {
                    if (particle.opacity <= 0){
                        setTimeout(() => {
                            particles.splice(index, 1)
                        }, 0)
                    } else {
                        particle.update()
                    }
                })
                
                //Clean up the projectiles if they leave the screen
                invaderProjectiles.forEach((invaderProjectile, index) => {
                    if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height){
                        setTimeout(() => {
                            invaderProjectiles.splice(index, 1)
                        }, 0)
                    } else {
                        invaderProjectile.update()
                    }
                    //Projectile hits player - remove the invader projectile, turn the game state to off after 2 seconds
                    //destroy the ship and save the score to the global score variable
                    if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y
                        &&
                        invaderProjectile.position.x + invaderProjectile.width >= player.position.x
                        &&
                        invaderProjectile.position.x <= player.position.x  + player.width){
                            setTimeout(() => {
                                invaderProjectiles.splice(index, 1)
                                player.opacity = 0
                                game.over = true
                            }, 0)
                            setTimeout(() => {
                                game.active = false
                            }, 2000)
                            createParticles({
                                object: player
                            })
                            setScore(score)
                            setTimeout(() => {
                                setShowModal(true)
                            }, 1500)
                    } else{
                        invaderProjectile.update()
                    }
                })
                //Removes the projectile from the array - memory clearing
                projectiles.forEach((projectile, index) => {
                    //If it hits the top of the window
                    if (projectile.position.y + projectile.radius <= 0){
                        //Fixes flashing
                        setTimeout(() => {
                            projectiles.splice(index, 1)
                        }, 0)
                    } else {
                        projectile.update()
                    }
                })
    
                grids.forEach((grid, gridIndex) => {
                    grid.update()
                    //Spawn projectiles from enemies
                    if(frames % 100 === 0 && grid.invaders.length > 0){
                        //Random shots from the middle of a random invader in a grid
                        grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
                    }
                    grid.invaders.forEach((invader, i) => {
                        invader.update({velocity: grid.velocity})
    
                        //Checking if the projectile hits any invader in the grid
                        projectiles.forEach((projectile, j) => {
                            if (projectile.position.y - projectile.radius <= invader.position.y + invader.height 
                                && 
                                projectile.position.x + projectile.radius >= invader.position.x
                                &&
                                projectile.position.x - projectile.radius <= invader.position.x + invader.width
                                &&
                                projectile.position.y + projectile.radius >= invader.position.y){
    
                                setTimeout(() => {
                                    const invaderFound = grid.invaders.find((invader2) => {
                                        return invader2 === invader
                                    })
                                    const projectileFound = projectiles.find((projectile2) => {
                                        return projectile2 === projectile
                                    })
    
                                    //If theres an invader there and a pojectile there
                                    if (invaderFound && projectileFound){
                                        //Increment score
                                        score += 100
                                        scoreEl.innerHTML = score
                                        createParticles({
                                            object: invader
                                        })
                                        
                                        //Remove invader and projectile
                                        grid.invaders.splice(i, 1)
                                        projectiles.splice(j, 1)
    
                                        //makes it move to the end of the new grid size, not the original size
                                        if (grid.invaders.length > 0){
                                            const firstInvader = grid.invaders[0]
                                            const lastInvader = grid.invaders[grid.invaders.length-1]
    
                                            grid.width = lastInvader.position.x - firstInvader.position.x + 36
                                            grid.position.x = firstInvader.position.x
                                        } else {
                                            grids.splice(gridIndex, 1)
                                        }
                                    }
                                }, 0)
                            }
                        })
                    })
                })
                
                //Moving the ship left and right within the boundaries of the window
                if (keys.a.pressed && player.position.x >= 0) {
                    player.velocity.x = -5
                } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
                    player.velocity.x = 5
                } else {
                    player.velocity.x = 0
                }
    
                //Spawning enemies - push a new grid to the grid array
                if (frames % randomInterval === 0){
                    grids.push(new Grid())
                    frames = 0
                    randomInterval = Math.floor((Math.random() * 500) + 750)
                }
    
                frames++ 
            } else if (refresh){
                // Reset the canvas to default, then change the refresh variable back to false
                c.fillStyle = '#14202d'
                c.fillRect(0, 0, canvas.width, canvas.height)
                score = 0
                scoreEl.innerHTML = score
                setRefresh(!refresh)
            }
        }

        setTimeout(() => {
            game.active = true
            animate()
        }, 500)

        window.addEventListener('keydown', ({key}) => {
            //These two conditionals so it doesnt render anything in the switch
            if (game.over) return
            if (!game.active) return
            switch (key){
                //Left
                case 'a':
                    keys.a.pressed = true
                    break;
                //Right
                case 'd':
                    keys.d.pressed = true
                    break;
                //Shoot
                case 'k':
                    if (canFire){
                        canFire = false
                        projectiles.push(
                            new Projectile({
                                position: {
                                    x: player.position.x + player.width / 2,
                                    //change back to y: player.position.y + 20 if using the original ship image 
                                    y: player.position.y
                                },
                                velocity: {
                                    x: 0,
                                    y: -5 
                                }
                            })
                        )
                        setTimeout(() => {
                            canFire = true
                        }, 200)
                    }
                    break;
                default:
                    break;
            }
        })

        window.addEventListener('keyup', ({key}) => {
            //These two conditionals so it doesnt render anything in the switch
            if (game.over) return
            if (!game.active) return
            switch (key){
                case 'a':
                    keys.a.pressed = false
                    break;
                case 'd':
                    keys.d.pressed = false
                    break;
                case 'k':
                    break;
                default:
                    break;
            }
        })
    }, [refresh, canFire])

    return (
        <div className='hero-container'>
            <p style={{'backgroundColor':'#14202d', "color":"white", "marginLeft":"10px", "marginTop":"10px"}}>
				<span>
					{scoreText}
				</span>
				<span id="scoreEl">
					0
				</span>
			</p>
			<canvas  />
            {showModal && <LeaderboardModal score={score} onClose={() => setShowModal(false)} resetScore={resetScore} refreshGame={refreshGame}/>}
            <div className='ship-container'>
                <img className='ship' src={require("../assets/images/ship-red.png")} alt='ship' onClick={exitGame}></img>
                <img className='refresh' src={require("../assets/images/icons/rotate-right-solid.png")} alt='refresh' onClick={refreshGame} width="20" height="20"></img>
                <img className='leaderboard' src={require("../assets/images/icons/list-ol-solid.png")} alt='leaderboard' onClick={() => setShowModal(true)} width="20" height="20"></img>
                <h1 className='help-text'>Move Left : A --- Move Right : D --- Shoot : K</h1>
            </div>
        </div>
    )
}

export default Gamebox