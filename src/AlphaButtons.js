import React, { Component } from 'react'

export default class AlphaButtons extends Component {
  render() {
    return (
      <p className='Hangman-btns'>
        {this.props.buttons.split("").map(ltr =>  (
          <button
            key={ltr}
            value={ltr}
            onClick={this.props.handleGuess}
            disabled={this.props.guessed.has(ltr)}
          >
            {ltr}
          </button>
        ))}
      </p>
    )
  }
}
