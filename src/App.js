import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  wrappedText: {
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineHeight: "1.334em" /* fallback */,
    maxHeight: "4.002em" /* fallback */,
    "-webkit-line-clamp": 3 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
}));

const hasContentWrapped = () => {
  const element = document.getElementById("wrapText");
  if (element)
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  return false;
};

const wrapTextLong =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const wrapTextShort =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the";

function App() {
  const classes = useStyles();

  const [isWrapped, setIsWrapped] = useState(false);
  const [wrapText, setWrapText] = useState("");
  const [useTextInput, setUseTextInput] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const toggleWrapText = () => {
    setWrapText(
      wrapText === (wrapTextLong || "") ? wrapTextShort : wrapTextLong
    );
  };

  useEffect(() => {
    setIsWrapped(hasContentWrapped());
  }, [wrapText]);

  useEffect(() => {
    setWrapText("");
  }, [useTextInput]);

  const onFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleChange = (files) => {
    setFiles(files);
  };

  return (
    <Container fixed>
      <Box component="span" m={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.alert("Hello World!")}
        >
          Hello World
        </Button>
      </Box>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            disabled={useTextInput}
            onClick={toggleWrapText}
            id="btnToggleWrapText"
          >
            Toggle Wrap Text
          </Button>
          <Tooltip title={isWrapped ? wrapText : ""}>
            <Typography
              variant="h5"
              color="primary"
              id="wrapText"
              className={classes.wrappedText}
            >
              {wrapText}
            </Typography>
          </Tooltip>
          <p id="summary">
            Has Overlapped: {isWrapped ? "Yes" : "No"}, Length:{" "}
            {wrapText.length}
          </p>
          <Divider light />
          <TextField
            id="standard-multiline-flexible"
            label="Enter Text"
            multiline
            rowsMax="10"
            disabled={!useTextInput}
            value={useTextInput ? wrapText : null}
            onChange={(e) => setWrapText(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={useTextInput}
                onChange={(e) => setUseTextInput(e.target.checked)}
                name="Use Text Input"
              />
            }
            label="Use Text Input"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="primary">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </Typography>
        </Grid>
      </Grid>
      <Divider light />
      <Grid item xs={6}>
        {" "}
        <Typography variant="h4" color="primary">
          File Upload Size Test
        </Typography>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={onFileChange} />
        </Button>
        <p>File Name: {uploadedFile?.name}</p>
        <p>File Size in kB: {uploadedFile?.size / 1000}</p>
        {uploadedFile?.size > 1000000 && (
          <Alert severity="error">File size exceeds 1 MB!</Alert>
        )}
      </Grid>
      <Grid item xs={6}>
        {" "}
        <Typography variant="h4" color="primary">
          Dropzone Size Test
        </Typography>
        <DropzoneArea onChange={handleChange} />
      </Grid>
    </Container>
  );
}

export default App;
