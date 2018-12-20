import React from 'react';
import Cookies from 'universal-cookie';
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

class GitRepoSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.listGitRepos(this.state.page, this.state.per_page);
  }

  state = {
    topics: "",
    language: "",
    page: 0,
    per_page: 10,
    isSearchMode: false,
    listLoadMore: true,
    searchLoadMore: true,
  };

  listGitRepos = (page, per_page) => {
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('language', this.state.language);
    bodyFormData.append('page', page + 1);
    bodyFormData.append('per_page', per_page);
    const axiosConfig = {
      url: this.props.ui.uri+'/gitrepos/',
      method: 'put',
      data: bodyFormData,
      headers: {'x-user-token': userToken, },
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      timeout: 5000,
    };
    const axiosSuccess = (obj, response) => {
      if (response.data.gitrepos.length == 0) {
        this.setState({listLoadMore: false});
      }
      this.setState({page: page + 1});
      obj.onGitRepos(response.data.gitrepos);
      // obj.onLanguages(response.data.languages);
    };
    const axiosFail = (obj, response) => {
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
  };

  listMore = () => {
    const page = this.state.page + 1;
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('language', this.state.language);
    bodyFormData.append('page', page);
    bodyFormData.append('per_page', this.state.per_page);
    const axiosConfig = {
      url: this.props.ui.uri+'/gitrepos/',
      method: 'put',
      data: bodyFormData,
      headers: {'x-user-token': userToken, },
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      timeout: 5000,
    };
    const axiosSuccess = (obj, response) => {
      if (response.data.gitrepos.length == 0) {
        this.setState({listLoadMore: false});
      }
      this.setState({page: this.state.page + 1});
      var gitreposOld = obj.gitrepos;
      var gitrepos = gitreposOld.gitrepos.concat(response.data.gitrepos);
      obj.onGitRepos(gitrepos);
      // obj.onLanguages(response.data.languages);
    };
    const axiosFail = (obj, response) => {
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  searchGitRepos = (topics, page, per_page) => {
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('topics', topics);
    bodyFormData.append('page', page + 1);
    bodyFormData.append('per_page', per_page);
    const axiosConfig = {
      url: this.props.ui.uri+'/gitrepos/',
      method: 'post',
      data: bodyFormData,
      headers: {'x-user-token': userToken, },
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      timeout: 10000,
    };
    const axiosSuccess = (obj, response) => {
      if (response.data.gitrepos.length == 0) {
        this.setState({searchLoadMore: false});
      }
      this.setState({page: page + 1});
      obj.onGitRepos(response.data.gitrepos);
      // obj.onLanguages(response.data.languages);
    };
    const axiosFail = (obj, response) => {
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
  };

  searchGitReposTopics = (topics) => {
    const page = 0;
    this.props.onGitRepos([]);
    this.searchGitRepos(topics, page, this.state.per_page);
    this.setState({
      topics: topics,
      isSearchMode: true,
    });
  }

  searchMore = () => {
    const page = this.state.page + 1;
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('topics', this.state.topics);
    bodyFormData.append('page', page);
    bodyFormData.append('per_page', this.state.per_page);
    const axiosConfig = {
      url: this.props.ui.uri+'/gitrepos/',
      method: 'post',
      data: bodyFormData,
      headers: {'x-user-token': userToken, },
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      timeout: 5000,
    };
    const axiosSuccess = (obj, response) => {
      if (response.data.gitrepos.length == 0) {
        this.setState({listLoadMore: false});
      }
      this.setState({page: this.state.page + 1});
      var gitreposOld = obj.gitrepos;
      var gitrepos = gitreposOld.gitrepos.concat(response.data.gitrepos);
      obj.onGitRepos(gitrepos);
      // obj.onLanguages(response.data.languages);
    };
    const axiosFail = (obj, response) => {
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
  };

  loadMore = () => {
    if (this.state.isSearchMode) {
      this.searchMore();
    } else {
      this.listMore();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} style={{paddingBottom: 24}}>
          <Grid item xs={8}>
            <TextField onChange={this.handleChange} id="topics" label="Search" style={{width: "90%"}}/>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={() => this.searchGitReposTopics(this.state.topics)}>
              <Search/>
            </Button>
          </Grid>
        </Grid>

        {this.props.gitrepos.gitrepos.map((gitrepo, _) => (
          <Grid key={gitrepo.gid} container spacing={8} alignItems="flex-end" justify="flex-start">
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                  <a href={"/#/gitrepo-view/"+gitrepo.gid} style={{color: "#000"}}>{gitrepo.full_name}</a>
                  </Typography>
                  { gitrepo.language != "" && (
                    <Chip label={gitrepo.language} className={classes.chip} color="primary"/>
                  )}
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
                  <Button size="small" variant="contained" color="primary" className={classes.pos} href={"/#/gitrepo-view/"+gitrepo.gid}>Comments</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>  
        ))}
        {
          (this.props.ui.showLoading) ? (
            <LoadingView />
          ) : (
            (this.state.listLoadMore) ? (
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
      </div>
    )
  }
}

GitRepoSearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const GitRepoSearchFormConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GitRepoSearchForm));

function GitRepoSearchPage(props) {
    const { classes } = props;
  
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center" style={{height: 60}}>
          <Grid item xs={10}>
            <GitRepoSearchFormConnect />
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
          
  
