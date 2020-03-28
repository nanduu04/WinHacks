import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography as MuiTypography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const variants = {
  
  h6: 'This is to add google maps with hotspots'
 
};

const Typography = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        {Object.keys(variants).map((key, i) => (
          <Fragment key={i}>
            <Grid
              item
              sm={3}
              xs={12}
            >
              <MuiTypography variant="caption">{key}</MuiTypography>
            </Grid>
            <Grid
              item
              sm={9}
              xs={12}
            >
              <MuiTypography variant={key}>{variants[key]}</MuiTypography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default Typography;
