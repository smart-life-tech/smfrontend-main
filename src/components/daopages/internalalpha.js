import React, { useEffect, useState } from 'react';
import { getMints } from '../../actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mints from '../mints/mints';
import TodayMints from '../mints/todayMints';
import CyberWallets from '../../wallets/cyberapeWallets';
import brandLogo from '../../assets/bitbearalpha.png'
import Footer from '../common/footer';
import Card from '@mui/material/Card';
import { Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import RenderSelectButtons from '../common/renderSelectButtons';
import { getOneUserWithID } from '../../actions/users';
import '../daopages/daopages.css';

import Form from '../form/aggregateform';
//Kellen Imports

import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';

// Constants
const TWITTER_HANDLE = 'realsolmints';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const pageName = 'internalalpha';
const dao = '';





const opts = {
	preflightCommitment: "processed"
};

const wallets = [getPhantomWallet(), getLedgerWallet()]

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  const [walletAddress, setWalletAddress] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const [sort, setSort] = useState('Upcoming');
  const { currentUser } = useSelector((state) => state.user);



  const AdminWallets = ["680887038916165827", "484894692987633686"]



  const renderConnectedContainer = () => (
    <div>
        <div>

        </div>
    </div>
  );

  const renderUnauthenticatedContainer = () => (
    <div>
        <Card>
          <h2>Please make sure you connect with a wallet that holds a Galactic Gecko NFT.</h2>
        </Card>
        <br></br>
    </div>
  );

  const renderSelectButtons = () => {
    return (
    <RenderSelectButtons sort={sort} setSort={setSort} />
    )
  }

  const renderAdminContainer = () => {
    return (
      <div>
        <div>
      </div>
      <Form dao={dao} />
  </div>
    );
};



    return (
        <div className="App">
            <div className={walletAddress ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <div>
                        <p className="header main-text-logo">SolMints Alpha</p>
                    </div>
                    <div>
                    </div>
                    <div>
                        
                    </div>
                    {!AdminWallets.includes(currentUser.discordID) && currentUser!==null && renderConnectedContainer()}
                    {AdminWallets.includes(currentUser.discordID) && renderAdminContainer()}
                    
                </div>
            </div>
        </div>
    )

}

export default Home;