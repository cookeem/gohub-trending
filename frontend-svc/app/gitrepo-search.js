import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Stars from '@material-ui/icons/Stars';
import AddCircle from '@material-ui/icons/AddCircle';
import Search from '@material-ui/icons/Search';
import ControlPoint from '@material-ui/icons/ControlPoint';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit * 2,
  },
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function GitRepoSearchForm(props) {
  const { classes } = props;

  const gitrepos = [
    { gid: 1, full_name: "cookeem/kubeadm-ha", description: "Kubernetes high availiability deploy based on kubeadm (English/中文 for v1.11.x/v1.9.x/v1.7.x/v1.6.x)", language: "JupyterNotebook", stargazers_count: 5000, reviews_count: 1000, forks_count: 2000, },
    { gid: 2, full_name: "cookeem/gohub-trending", description: "Kubernetes high availiability deploy based on kubeadm (English/中文 for v1.11.x/v1.9.x/v1.7.x/v1.6.x)", language: "JupyterNotebook", stargazers_count: 5000, reviews_count: 1000, forks_count: 2000, },
    { gid: 3, full_name: "cookeem/CookIM", description: "Kubernetes high availiability deploy based on kubeadm (English/中文 for v1.11.x/v1.9.x/v1.7.x/v1.6.x)", language: "JupyterNotebook", stargazers_count: 5000, reviews_count: 1000, forks_count: 2000, },
    { gid: 4, full_name: "cookeem/kubernetes-zookeeper-cluster", description: "Kubernetes high availiability deploy based on kubeadm (English/中文 for v1.11.x/v1.9.x/v1.7.x/v1.6.x)", language: "JupyterNotebook", stargazers_count: 5000, reviews_count: 1000, forks_count: 2000, },
  ];
  return (
    <div className={classes.root}>
      <Grid container spacing={16} style={{paddingBottom: 24}}>
        <Grid item xs={8}>
          <TextField id="username" label="Search" style={{width: "90%"}}/>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary">
            <Search/>
          </Button>
        </Grid>
      </Grid>


      {gitrepos.map((gitrepo, _) => (
        <Grid key={gitrepo.gid} container spacing={8} alignItems="flex-end" justify="flex-start">
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {gitrepo.full_name}
                </Typography>
                <Chip label={gitrepo.language} className={classes.chip} color="primary"/>
                <Chip
                  icon={<Stars />}
                  label={"stars "+gitrepo.stargazers_count}
                  className={classes.chip}
                  color="secondary"
                  style={{color: "#FFF"}}
                />
                <Chip
                  icon={<AddCircle />}
                  label={"comments "+gitrepo.reviews_count}
                  className={classes.chip}
                  color="default"
                />
                <Chip
                  icon={<ControlPoint />}
                  label={"forks "+gitrepo.forks_count}
                  className={classes.chip}
                  color="default"
                />

                <Typography className={classes.pos} color="textSecondary">
                  {gitrepo.description}
                </Typography>
                <Typography component="p">
                  <a href="#">https://github/{gitrepo.full_name}</a>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary" className={classes.pos}>Comments</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>  
      ))}
    </div>
  );
}

GitRepoSearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const GitRepoSearchFormStyle = withStyles(styles)(GitRepoSearchForm);

function GitRepoSearchPage(props) {
    const { classes } = props;
  
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center" style={{height: 60}}>
          <Grid item xs={10}>
            <GitRepoSearchFormStyle />
          </Grid>
        </Grid>
      </div>
    );
  }
  
  GitRepoSearchPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const GitRepoSearchPageStyle = withStyles(styles)(GitRepoSearchPage);
  
  export const GitRepoSearch = () => {
    return (
      <GitRepoSearchPageStyle />
    )
  };
          
  
