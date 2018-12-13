import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Stars from '@material-ui/icons/Stars';
import AddCircle from '@material-ui/icons/AddCircle';
import ControlPoint from '@material-ui/icons/ControlPoint';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

import { mapDispatchToProps, mapStateToProps } from './redux/react';
import { connect } from 'react-redux';

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
    minWidth: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class GitRepoViewForm extends React.Component {
  onShowComment = () => {
    this.props.onComment(true)
  }

  onHideComment = () => {
    this.props.onComment(false)
  }

  onShowDelete = () => {
    this.props.onDelete(true)
  }

  onHideDelete = () => {
    this.props.onDelete(false)
  }

  render() {
    console.log(this.props.login.username);
    const { classes } = this.props;

    const gitrepo = { 
      gid: 1, 
      full_name: "cookeem/kubeadm-ha", 
      description: "Kubernetes high availiability deploy based on kubeadm (English/中文 for v1.11.x/v1.9.x/v1.7.x/v1.6.x)", 
      language: "JupyterNotebook", 
      stargazers_count: 5000, 
      reviews_count: 1000, 
      forks_count: 2000, 
      watchers_count: 11,
      open_issues_count: 10,
      html_url: "https://github.com/cookeem/kubeadm-ha",
      created_at: "2018-10-26 12:00:00",
      updated_at: "2018-11-26 12:00:00",
      pushed_at: "2018-12-26 12:00:00",
    };
  
    const reviews = [
      { rid: 1, username: "cookeem", content: "this is a comment", created_at: "2012-12-12 10:10:10", },
      { rid: 2, username: "haijian", content: "this is a comment", created_at: "2012-12-12 10:10:10", },
      { rid: 3, username: "faith", content: "this is a comment", created_at: "2012-12-12 10:10:10", },
    ];

    return (
      <div className={classes.root}>
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
                <Chip
                  label={"watchers "+gitrepo.watchers_count}
                  className={classes.chip}
                  color="default"
                />
                <Chip
                  label={"issues "+gitrepo.open_issues_count}
                  className={classes.chip}
                  color="default"
                />
  
                <Typography className={classes.pos} color="textSecondary">
                  {gitrepo.description}
                </Typography>
                <Typography component="p">
                  <a href="#">{gitrepo.html_url}</a>
                </Typography>
  
  
                <Chip
                  label={"created at: "+gitrepo.created_at}
                  className={classes.chip}
                  color="default"
                />
                <Chip
                  label={"updated at: "+gitrepo.updated_at}
                  className={classes.chip}
                  color="default"
                />
                <Chip
                  label={"pushed at: "+gitrepo.pushed_at}
                  className={classes.chip}
                  color="default"
                />
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="secondary" className={classes.pos} onClick={this.onShowComment}>
                  <AddCircle />
                  Comments
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>  
        {reviews.map((review, _) => (
          <Grid key={review.rid} container spacing={8} alignItems="flex-end" justify="flex-start">
            <Grid item xs={12}>
              <Card className={classes.card} style={{backgroundColor: grey[100]}}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {review.username}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {review.content}
                  </Typography>
                  <Typography component="p">
                    {review.created_at}
                    <Button size="small" variant="contained" style={{marginLeft: 20, backgroundColor: red[500], color: "#FFF"}} onClick={this.onShowDelete}>Delete</Button>
                    <Button size="small" variant="contained" style={{marginLeft: 20, backgroundColor: red[500], color: "#FFF"}} onClick={this.onShowDelete}>Error</Button>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>  
        ))}
      </div>
    );
  }
}

GitRepoViewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const GitRepoViewFormConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GitRepoViewForm));

function GitRepoViewPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center" style={{height: 60}}>
        <Grid item xs={10}>
          <GitRepoViewFormConnect />
        </Grid>
      </Grid>
    </div>
  );
}
  
GitRepoViewPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const GitRepoViewPageStyle = withStyles(styles)(GitRepoViewPage);

export class GitRepoViewView extends React.Component {
  render() {
    return (
      <GitRepoViewPageStyle />
    )
  };
}
        

