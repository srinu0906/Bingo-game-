# Bingo Game – Multiplayer Web App

A real-time multiplayer Bingo game built with **HTML**, **CSS**, **JavaScript**, and **PHP**, with game data managed using **MySQL**. Two players can connect via a unique code and play online in sync.

This web application implements the classic two-player Bingo game. Each player has a 5x5 grid with randomly arranged numbers from 1 to 25. During each turn, players call out a number (1 to 25) to each other, and both mark it on their grids. A "Bingo" occurs when five boxes are marked in a row, column, or diagonal. The first player to achieve five Bingos wins the game!

### How it Works:

- Player 1 selects "Create Code" on the homepage, while Player 2 selects "Enter Code."
- A unique code is generated for Player 1, who shares it with Player 2 to start the game.
- Player 2 enters the code, and the game begins.
- Both players are now connected and can play the game online in real time.

 **Live Demo**: [srinu24bingo.infinityfreeapp.com](http://srinu24bingo.infinityfreeapp.com/?i=1)

---

##  Features

- **Multiplayer Bingo** — Create or join a session with a game code
- **Real-Time Updates** — Live game sync using AJAX & PHP
- **Modern UI** — Animated borders, responsive design
- **Persistent State** — Game data saved in MySQL
- **Customizable** — Easy to modify styles and logic

---

## Project Structure

```

/Source code
├── index.html             # Landing page
├── generator.html         # Start a new game with a unique code
├── validator.html         # Join game using a shared code
├── game.html              # Main Bingo board
├── main.js                # Frontend game logic
├── style.css              # Styles and animations
├── borderanimation.js     # Visual effects for game UI
├── bingo.php              # Backend for updating game state
├── generator.php          # Backend logic to start game
├── validator.php          # Backend logic to join game
├── db.php                 # MySQL connection logic
├── mark.png               # UI image asset
└── README.md

````

---

## How to Play

1. **Start a Game**
   - Go to [`generator.html`](http://srinu24bingo.infinityfreeapp.com/generator.html)
   - Generate and share the unique game code

2. **Join a Game**
   - Go to [`validator.html`](http://srinu24bingo.infinityfreeapp.com/validator.html)
   - Enter the code to join your friend's game

3. **Play Bingo!**
   - Mark your board as numbers are called
   - Game syncs in real time for both players
   - Complete a row, column, or diagonal to win!

---

## Technologies Used:

- **Frontend**: HTML, CSS3, JavaScript
- **Backend**: PHP as the server-side scripting language
- **Database**: phpMyAdmin for data management
- **Communication**: Polling-based interaction between client and server
- **Hosting**: Hosted on `infinityfree.com`

---

## Setup & Deployment

### Requirements

- Web server with PHP (XAMPP, WAMP, LAMP, etc.)
- MySQL database
- phpmyadmin (Optional)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/srinu0906/Bingo-game-.git

2. **Database Setup**

   * Create a MySQL database
   * Use the table structure referenced in `bingo.php` / `db.php`
   * Update credentials in `db.php` accordingly

3. **Run Locally**

   * Place files in your web server’s root (e.g., `htdocs`)
   * Access `index.html` via `http://localhost/Bingo-game-`

---

##  Author

Developed by **Srinu Vakada**

*  [LinkedIn](https://www.linkedin.com/in/srinu-vakada-84b690275/)
*  [GitHub](https://github.com/srinu0906)
*  [HackerRank](https://www.hackerrank.com/profile/vakadasrinu24)

---


## Live Demo

Click here to play:
 [http://srinu24bingo.infinityfreeapp.com/?i=1](http://srinu24bingo.infinityfreeapp.com/?i=1)


