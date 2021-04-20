import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, makeStyles, Paper, TextField, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  wrappedText: {
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.334em', /* fallback */
    maxHeight: '4.002em', /* fallback */
    '-webkit-line-clamp': 3, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
  }
}));

const hasContentWrapped = () => {
  const element = document.getElementById('wrapText');
  if (element) return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  return false
};

const wrapTextLong = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const wrapTextShort = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the";

function App() {
  const classes = useStyles();

  const [isWrapped, setIsWrapped] = useState(false);
  const [wrapText, setWrapText] = useState('');

  const toggleWrapText = () => {
    setWrapText(wrapText === (wrapTextLong || '') ? wrapTextShort : wrapTextLong);
  };

  useEffect(() => {
    setIsWrapped(hasContentWrapped());
  }, [wrapText]);

  return (<Container fixed><Box component="span" m={1}><Button variant="contained" color="primary"
                                                               onClick={() => window.alert('Hello World!')}>Hello
    World</Button></Box>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard"/>
      <TextField id="filled-basic" label="Filled" variant="filled"/>
      <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
    </form>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>xs=12</Paper>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary"
                onClick={toggleWrapText} id="btnToggleWrapText">Toggle Wrap Text</Button>
        <Typography variant="h5" color="primary" id="wrapText" className={classes.wrappedText}>
          {wrapText}
        </Typography>
        <p id="summary">Has Overlapped: {isWrapped ? 'Yes' : 'No'}, Length: {wrapText.length}</p>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" color="primary">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look even slightly believable. If you are going
          to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
          text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making
          this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a
          handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
          Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </Typography>
      </Grid>
    </Grid>
  </Container>);
}

export default App;
