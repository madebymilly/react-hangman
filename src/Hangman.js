import React, { Component } from "react";
import AlphaButtons from './AlphaButtons';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words.js";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    buttons: 'abcdefghijklmnopqrstuvwxyz'
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    let theWord = this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    if (this.state.gameOver) {
      theWord = this.state.answer;
    }
    return theWord;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    let tempWinner = false;
    // if all letters in answer are in set:
    console.log(this.state.answer.split(""))
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      winner: tempWinner
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  // generateButtons() {
  //   return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
  //     <button
  //       key={ltr}
  //       value={ltr}
  //       onClick={this.handleGuess}
  //       disabled={this.state.guessed.has(ltr)}
  //     >
  //       {ltr}
  //     </button>
  //   ));
  // }

  /** handle Restart:
    - pick new word
    - reset guessed list
    - reset nWrong
   */
  handleRestart() {
    this.setState({
      answer: randomWord(),
      guessed: new Set(),
      nWrong: 0
    })
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong // does not have to be state!
    const winGame = this.guessedWord().join("") === this.state.answer
    const altText = `${this.state.nWrong} / ${this.props.maxWrong} guesses`
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText} />
        <p className='Hangman-errors'>Number of mistakes: {this.state.nWrong}</p>
        <p className='Hangman-word'>{gameOver ? this.state.answer : this.guessedWord()}</p>
        {!gameOver && !winGame && <AlphaButtons buttons={this.props.buttons} handleGuess={this.handleGuess} guessed={this.state.guessed} />}
        {winGame && <p>You Win!!!</p>}
        {gameOver && <p className='Hangman-gameover'>GAME OVER!</p>}
        <button className='Hangman-restart' onClick={this.handleRestart}>RESTART</button>
      </div>
    );
  }
}

export default Hangman;
