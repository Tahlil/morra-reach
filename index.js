import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/render';
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
const reach = loadStdlib(process.env);


const allResults = [ "It's a Draw", "Alice Wins!", "Bob Wins!", "No Result" ];

const {standardUnit} = reach;
const defaults = {defaultFundAmt: '10', defaultWager: '3', standardUnit};

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {view: 'ConnectAccount', ...defaults};
    }
    async componentDidMount() {
      const acc = await reach.getDefaultAccount();
      const balAtomic = await reach.balanceOf(acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      this.setState({acc, bal});
      if (await reach.canFundFromFaucet()) {
        this.setState({view: 'FundAccount'});
      } else {
        this.setState({view: 'DeployerOrAttacher'});
      }
    }
    async fundAccount(fundAmount) {
      await reach.fundFromFaucet(this.state.acc, reach.parseCurrency(fundAmount));
      this.setState({view: 'DeployerOrAttacher'});
    }
    async skipFundAccount() { this.setState({view: 'DeployerOrAttacher'}); }
    selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
    selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
    render() { return renderView(this, AppViews); }
  }

  class Player extends React.Component {
    random() { return reach.hasRandom.random(); }

    async getFingers(){
        const numberOfFingers = await new Promise(resolveHandF => {
            this.setState({view: 'GetFingers', playable: true, resolveHandF});
          });
        this.setState({view: 'WaitingForResults', numberOfFingers});
        return numberOfFingers;
    }
    async sayNumber(){
        const numberTold = await new Promise(resolveHandN => {
            this.setState({view: 'GetNumber', playable: true, resolveHandN});
          });
        this.setState({view: 'WaitingForResults', numberTold});
        return numberTold;
    }

    showResult(res){
     this.setState({view: 'Done', outcome: allResults[res]});
    }

 
    playFinger(numberOfFingers) { this.state.resolveHandF(numberOfFingers) }
    finalNumber(numberTold) { this.state.resolveHandN(numberTold) }
  }

  class Deployer extends Player {
    constructor(props) {
      super(props);
      this.state = {view: 'Deploy'};
    }

    async deploy() {
      const ctc = this.props.acc.contract(backend);
      this.setState({view: 'Deploying', ctc});
      this.deadline = {ETH: 10, ALGO: 100, CFX: 1000}[reach.connector];
      backend.Alice(ctc, this);
      const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
      this.setState({view: 'WaitingForAttacher', ctcInfoStr});
    }
    render() { return renderView(this, DeployerViews); }
  }

  class Attacher extends Player {
    constructor(props) {
      super(props);
      this.state = {view: 'Attach'};
    }
    attach(ctcInfoStr) {
      const ctc = this.props.acc.contract(backend, JSON.parse(ctcInfoStr));
      this.setState({view: 'Attaching'});
      backend.Bob(ctc, this);
    }

    render() { return renderView(this, AttacherViews); }
  }

renderDOM(<App />);