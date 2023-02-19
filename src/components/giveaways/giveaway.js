import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './giveaway.css';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import GiveawayDialog from './giveawayDialog';
import WinnersDialog from './winnersDialog';
import cx from 'clsx';
import Dialog from '@mui/material/Dialog';
import Countdown from './countdown';
import axios from 'axios';
import DetailContent from '../mints/MintDetail/mintdetail';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import twitterLogo from '../../assets/twitter.svg';
import discordLogo from '../../assets/discord.svg';
import Link from '@mui/material/Link';
import useWindowDimensions from '../common/useWindowDimensions';




const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      boxShadow: 'none',
      borderRadius: 0,
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
  }));


const Giveaway = ({ giveaway, wallet, AdminWallets }) => {
    const shadowStyles = useSoftRiseShadowStyles();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [winnerDialogOpen, setWinnerDialogOpen] = React.useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);
    const [alreadyVoted, setAlreadyVoted] = React.useState(false);
    const [mint, setMint] = React.useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const { height, width } = useWindowDimensions();

    const numEntered = giveaway.entries.length;
    const winTime = new Date(giveaway.createdAt);
    winTime.setHours(winTime.getHours() + giveaway.timeInHours);
    //console.log(winTime);
    const nowTime = new Date();

    const useStyles = makeStyles({
        root: {
        },
      });
    
    const styles = useStyles();

    const theme = createTheme({
      palette: {
          discord: {
              main: '#5865F2',
              contrastText: '#ffffff',
          },
          twitter: {
              main: '#00acee',
              contrastText: '#ffffff',
          },
      }

    });

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleWinnerDialogOpen = () => {
      setWinnerDialogOpen(true);
    };

  const handleWinnerDialogClose = () => {
      setWinnerDialogOpen(false);
  };

  const handleDetailDialogOpen = async () => {
      setDetailDialogOpen(true);
      
    };

const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
};

function sleep (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}


    useEffect(() => {
      
      async function asyncGetMintForDetail() {
        await axios.get(`https://daospot.herokuapp.com/mints/getMint/${giveaway.mintID}`)
        .then(async(response) => {
        setMint(response.data);
        })
        }


      for (let i = 0; i < giveaway.entries.length; i++) {  
        if (giveaway.entries[i].includes(wallet)) {
          //console.log(wallet);
          setAlreadyVoted(true); 
        }
      }



      asyncGetMintForDetail();


    }, []);

    const renderGiveawayActive = () => {

      return (
        <div>
           <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
            <CardActionArea onClick={handleDetailDialogOpen}>
            <CardMedia sx={{ borderRadius: 5 }}component="img" height="260" image={giveaway.selectedFile} alt="Giveaway" />
            <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{giveaway.name}</Typography>
                <Typography variant="h5" color="white" sx={{fontWeight: 400}} >{giveaway.numSpots} Spots</Typography>
                <Typography variant="h6" color="white" sx={{fontWeight: 200}} >{numEntered-1} Entered</Typography>
            </CardContent>
            </CardActionArea>
            <CardContent>
              <div className="links">
                  <div className="votes-block">
                    <img className="discord-inline-logo" src={discordLogo} alt="Discord" width="12" height="12"></img>
                    <Link href={giveaway.discord} target="_blank">&nbsp;Discord</Link>
                  </div>
                  <div className="votes-block">
                    <img className="twitter-inline-logo" src={twitterLogo} alt="Twitter" width="12" height="12"></img>
                    <Link href={giveaway.twitter} target="_blank">&nbsp;Twitter</Link>
                  </div>
                </div>
                <div><Countdown winTime={winTime} timeInHours={giveaway.timeInHours} startTime={giveaway.createdAt} /></div>
                <ThemeProvider theme={theme}>
                <div className="chip-block">
                  {!currentUser.twitterApprovedGiveaways.includes(giveaway._id) ? <Chip icon={<DoNotDisturbAltIcon />} color="twitter" variant="outlined" label="Not Following" />
                  : (
                    <Chip icon={<CheckIcon />} color="twitter" variant="contained" label="Following" />
                  )}
                  {!currentUser.discordApprovedGiveaways.includes(giveaway.guildID) ? <Chip icon={<DoNotDisturbAltIcon />} color="discord" variant="outlined" label="Not In Discord" /> 
                  : (<Chip icon={<CheckIcon />} color="discord" variant="contained" label="Joined" />)}
                </div>
                <br></br>
                </ThemeProvider>
                { !alreadyVoted ? <Button variant="contained" color="success" onClick={handleDialogOpen}>Enter Raffle</Button> : (<></>)}
                { alreadyVoted ? <Button variant="contained" color="success">Already Entered</Button> : (<></>)}
                
            </CardContent>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                fullWidth
                maxWidth='xl'
            >
                <GiveawayDialog giveaway={giveaway} setDialogOpen={setDialogOpen} wallet={wallet} setAlreadyVoted={setAlreadyVoted} />
            </Dialog>
            <Dialog
                open={detailDialogOpen}
                onClose={handleDetailDialogClose}
                fullWidth
                maxWidth='lg'
            >
                <DetailContent mint={mint} walletAddress={currentUser.discordID} />
            </Dialog>
        </Card>
        </div>



      );


    }

    const renderGiveawayFinished = () => {


      return (
        <div>
            <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
              <CardActionArea onClick={console.log}>
              <CardMedia sx={{ borderRadius: 5 }}component="img" height="260" image={giveaway.selectedFile} alt="Giveaway" />
              <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{giveaway.name}</Typography>
                <Typography variant="h5" color="white" sx={{fontWeight: 400}} >{giveaway.numSpots} Spots</Typography>
                <Typography variant="h6" color="white" sx={{fontWeight: 200}} >{giveaway.entries.length} Entered</Typography>
                <Button variant="contained" color="secondary" onClick={handleWinnerDialogOpen}>View Winners</Button>

              </CardContent>
              </CardActionArea>
              <Dialog
                open={winnerDialogOpen}
                onClose={handleWinnerDialogClose}
                fullWidth
                maxWidth='lg'
              >
                <WinnersDialog giveaway={giveaway} setDialogOpen={setWinnerDialogOpen} wallet={wallet} />
              </Dialog>
        </Card>

        </div>
      );
    }


    
    
    return (

      <div>

        {nowTime<winTime && renderGiveawayActive()}
        {nowTime>winTime && AdminWallets.includes(currentUser.discordID) && renderGiveawayFinished()}

       </div>

    );
}

export default Giveaway;