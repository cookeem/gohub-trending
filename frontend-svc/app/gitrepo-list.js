import React, { Fragment } from 'react';
import Cookies from 'universal-cookie';
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

import { mapDispatchToProps, mapStateToProps } from './redux/react';
import { connect } from 'react-redux';
import { serviceQuery } from './components/functions';
import { LoadingView } from './components/loading';

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

class GitRepoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.listGitRepos();
  }

  state = {
    language: "",
    page: 1,
    showLoadMore: true,
  };

  listGitRepos = () => {
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('language', this.state.language);
    bodyFormData.append('page', this.state.page);
    const axiosConfig = {
      url: 'http://localhost:3000/gitrepos/',
      method: 'put',
      data: bodyFormData,
      headers: {'x-user-token': userToken, },
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      timeout: 5000,
    };
    const axiosSuccess = (obj, response) => {
      if (response.data.gitrepos.length == 0) {
        this.setState({showLoadMore: false});
      }
      obj.onGitRepos(response.data.gitrepos);
      obj.onLanguages(response.data.languages);
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess);
  };

  loadMore = () => {
    const page = this.state.page + 1;
    this.setState({page: page});
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('language', this.state.language);
    bodyFormData.append('page', page);
    const axiosConfig = {
      url: 'http://localhost:3000/gitrepos/',
      method: 'put',
      data: bodyFormData,
      headers: {'x-user-token': userToken, },
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      timeout: 5000,
    };
    const axiosSuccess = (obj, response) => {
      if (response.data.gitrepos.length == 0) {
        this.setState({showLoadMore: false});
      }
      var gitreposOld = obj.gitrepos;
      var gitrepos = gitreposOld.gitrepos.concat(response.data.gitrepos);
      console.log("###", gitrepos);
      obj.onGitRepos(gitrepos);
      obj.onLanguages(response.data.languages);
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess);
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Fragment>
            <Grid container spacing={8} alignItems="flex-end" justify="flex-start">
              <Grid item xs={12}>
                {this.props.languages.languages.map((language, _) => (
                  <Fragment key={language.language}>
                    { (language.color == 'secondary') ? (
                      <Chip label={language.language + " (" + language.repos_count + ")"} className={classes.chip} color={language.color} style={{color: '#FFF'}}/>
                    ) : (
                      <Chip label={language.language + " (" + language.repos_count + ")"} className={classes.chip} color={language.color}/>
                    ) }
                  </Fragment>
                ))}
              </Grid>
            </Grid>
            {this.props.gitrepos.gitrepos.map((gitrepo, _) => (
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
                        <a href={gitrepo.html_url}>{gitrepo.html_url}</a>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained" color="primary" className={classes.pos}>Comments</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            ))}
            {
              (this.props.ui.showLoading) ? (
                <LoadingView />
              ) : (
                (this.state.showLoadMore) ? (
                  <Grid container spacing={8}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                      <Chip label="... load more ..." className={classes.chip} onClick={this.loadMore}/>
                    </Grid>
                  </Grid>
                ) : (
                  null
                )
              ) 
            }
          </Fragment>
        </div>
      </Fragment>
    )
  }
}

GitRepoListForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const GitRepoListFormConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withStyles(styles)(GitRepoListForm)));

function GitRepoListPage(props) {
    const { classes } = props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center" style={{height: 60}}>
          <Grid item xs={10}>
            <GitRepoListFormConnect />
          </Grid>
        </Grid>
      </div>
    );
  }

  GitRepoListPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const GitRepoListPageStyle = withStyles(styles)(GitRepoListPage);

  export const GitRepoList = () => {
    return (
      <GitRepoListPageStyle />
    )
  };


