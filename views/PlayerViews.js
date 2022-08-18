import React from 'react';

const exports = {};

// Player views must be extended.
// It does not have its own Wrapper view.

exports.GetHand = class extends React.Component {
  render() {
    const {parent, playable, hand} = this.props;
    return (
      <div>
        {hand ? 'It was a draw! Pick again.' : ''}
        <br />
        {!playable ? 'Please wait...' : ''}
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.playHand('ROCK')}
        >Rock</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('PAPER')}
        >Paper</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('SCISSORS')}
        >Scissors</button>
      </div>
    );
  }
}

exports.GetFingers = class extends React.Component {
  render() {
    let numberOfFingers =  0;
    const {parent, playable} = this.props;

    function handleChange(e){
      console.log("Changed Value:", e.currentTarget.value);
      numberOfFingers=e.currentTarget.value;
      console.log("Number of finger selected: ", numberOfFingers);
    }
    return (
      <div>
        {!playable ? 'Please wait...' : ''}
        <br />
        <input
          type='number'
          placeholder='Number should be 0-5'
          onChange={(e) => handleChange(e)}
        /> 
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.playFinger(numberOfFingers)}
        >Show Finger</button>
        
      </div>
    );
  }
}

exports.GetNumber = class extends React.Component {
  render() {
    let number =  0;
    const {parent, playable} = this.props;

    function handleChange(e){
      console.log("Changed Value:", e.currentTarget.value);
      number=e.currentTarget.value;
      console.log("Number selected: ", number);
    }
    return (
      <div>
        {!playable ? 'Please wait...' : ''}
        <br />
        <input
          type='number'
          placeholder='enter'
          onChange={(e) => handleChange(e)}
        /> 
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.finalNumber(number)}
        >Say Number</button>
        
      </div>
    );
  }
}

exports.WaitingForResults = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for results...
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome} = this.props;
    return (
      <div>
        Thank you for playing. The outcome of this game was:
        <br />{outcome || 'Unknown'}
      </div>
    );
  }
}

exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;