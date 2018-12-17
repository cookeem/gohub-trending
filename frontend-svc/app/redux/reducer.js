import { combineReducers } from 'redux';

export const stateInitUI = {
  showSideBar: false,
  showComment: false,
  showDelete: false,
  showLoading: false,
};

export const ui = (state = stateInitUI, action) => {
  switch (action.type) {
    case 'SHOW_SIDEBAR':
      return Object.assign({}, state, {
        showSideBar: action.showSideBar,
      });
    case 'SHOW_COMMENT':
      return Object.assign({}, state, {
        showComment: action.showComment,
      });
    case 'SHOW_DELETE':
      return Object.assign({}, state, {
        showDelete: action.showDelete,
      });
    case 'SHOW_LOADING':
      return Object.assign({}, state, {
        showLoading: action.showLoading,
      });
    default:
      return state;
  }
}

export const stateInitLogin = {
  uid: 0,
  username: "",
  userToken: "",
};

export const login = (state = stateInitLogin, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        uid: action.uid,
        username: action.username,
        userToken: action.userToken,
      });
    default:
      return state;
  }
}

export const stateInitMsg = {
  error: 0,
  msg: "",
};

export const msg = (state = stateInitMsg, action) => {
  switch (action.type) {
    case 'MSG':
      return Object.assign({}, state, {
        error: action.error,
        msg: action.msg,
      });
    default:
      return state;
  }
}

export const stateInitGitRepos = {
  gitrepos: [],
};

export const gitrepos = (state = stateInitGitRepos, action) => {
  switch (action.type) {
    case 'GIT_REPOS':
      return Object.assign({}, state, {
        gitrepos: action.gitrepos,
      });
    default:
      return state;
  }
}

export const stateInitLanguages = {
  languages: [],
};

export const languages = (state = stateInitLanguages, action) => {
  switch (action.type) {
    case 'LANGUAGES':
      return Object.assign({}, state, {
        languages: action.languages,
      });
    default:
      return state;
  }
}

export const stateInitGitRepo = {
  gitrepo: {},
};

export const gitrepo = (state = stateInitGitRepo, action) => {
  switch (action.type) {
    case 'GIT_REPO':
      return Object.assign({}, state, {
        gitrepo: action.gitrepo,
      });
    default:
      return state;
  }
}

export const stateInitReviews = {
  reviews: [],
};

export const reviews = (state = stateInitReviews, action) => {
  switch (action.type) {
    case 'REVIEWS':
      return Object.assign({}, state, {
        reviews: action.reviews,
      });
    default:
      return state;
  }
}

export const reducerRoot = combineReducers({
  ui, login, msg, gitrepos, languages, gitrepo, reviews
});

