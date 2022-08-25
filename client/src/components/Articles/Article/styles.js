import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(3),
  },
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        justifyContent: 'center',
      },
      button: {
        textTransform: 'none',
      },
        mediaMain: {
          height: 0,
          paddingTop: '35%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          backgroundBlendMode: 'darken',
        },
        media: {
          height: 0,
          paddingTop: '45%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          backgroundBlendMode: 'darken',
        },
        border: {
          border: 'solid',
        },
        fullHeightCard: {
          height: '100%',
        },
        card: {
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '30px',
          height: '100%',
          position: 'relative',
        },
        smallCard: {
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '20px',
          height: '100%',
          position: 'relative',
        },
        overlay: {
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
        },
        overlay2: {
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white',
        },
        grid: {
          display: 'flex',
        },
        details: {
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px',
        },
        title: {
          padding: '0 16px',
        },
        cardActions: {
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        },
}));