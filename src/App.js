import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App2.css';
import { getMints } from './actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/home';
import CAA from './components/daopages/caa';
import GGSG from './components/daopages/ggsg';
import Noot from './components/daopages/noot';
import MonkeDAO from './components/daopages/monkedao';
import BitBearAlpha from './components/daopages/bitbearalpha';
import InternalAlpha from './components/daopages/internalalpha';
import trustDAO from './components/daopages/trustdao';
import Auth from './components/common/auth';
import CheckDiscord from './components/giveaways/checkDiscord';
import MintNavbar from './components/navbar/navbar';
import BasicLayout from './components/common/basiclayout';
import ReactGA from 'react-ga4';

//Kellen Imports
import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';

const wallets = [getPhantomWallet(), getLedgerWallet()]
ReactGA.initialize("G-9EKCL3T07T");
ReactGA.send("pageview");


const opts = {
	preflightCommitment: "processed"
};

const App = () => {

  const walletContext = useWallet();

  const network = "http://api.mainnet-beta.solana.com/";
  const connection = new Connection(network, 'processed');
  const provider = new Provider(connection, walletContext, opts.preflightCommitment);
  const userAccount = new Wallet(connection, provider.wallet);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
    <ConnectionProvider endpoint={network}>
		<WalletProvider wallets={wallets} autoConnect>
			<WalletModalProvider>
      <div className="main-app">
        <BasicLayout>
        <Switch>
          {/*<Route path="/" exact component={() => <Redirect to="/mints" />} /> */}
          <Route path="/" exact component={Home}/>
          <Route path="/auth" exact component={Auth} />
          <Route path="/checkdiscord" exact component={CheckDiscord} />
          <Route path="/caa" exact component={CAA}/>
          <Route path="/monkedao" exact component={MonkeDAO}/>
          <Route path="/ggsg" exact component={GGSG}/>
          <Route path="/tD" exact component={trustDAO}/>
          <Route path="/bitbearalpha" exact component={BitBearAlpha}/>
          <Route path="/internalalpha" exact component={InternalAlpha}/>
          <Route path="/noot" exact component={Noot}/>

          <Route path="/mints/search" exact component={Home}/>

        </Switch>
        </BasicLayout>
        </div>

			</WalletModalProvider>
		</WalletProvider>
	</ConnectionProvider>
  </BrowserRouter>

  );
};

export default App;