import React, {useEffect, useState} from 'react'
import {APIClient} from "../../../services/api/apiClient";
import githubClient from "../../../services/gihub/githubClient";
import {Grid, Tab, Tabs} from "@material-ui/core";
import {GitHubRepoWithStyles} from "../../GitHubRepo/ui/GitHubRepo";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import {SearchBarWithStylesAndOktaAuth} from "../../SearchBar/ui/SearchBar";
import {withOktaAuth} from "@okta/okta-react";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
const Home = (props) => {
  const {authState} = props;
  const [value, setValue] = useState(0);
  const [repos, setRepos] = useState([]);
  const [kudos, setKudos] = useState([]);
  const [apiClient, setApiClient] = useState(null);


  useEffect(() => {
    const accessToken = authState.accessToken.accessToken;
    if (accessToken) {
      console.log({accessToken});
      setApiClient(new APIClient(accessToken));

      if (apiClient != null) {
        apiClient.getKudos()
            .then((data) => setKudos(data));
      }
    }
  }, []);

  const handleTabChange = (event, value) => {
     setValue(value);
  }

  const handleTabChangeIndex = index => {
    setValue(index);
  };
  const resetRepos = (repos) => setRepos(repos);

  const isKudo = (repo) => kudos.find(kudoRepo => kudoRepo.id === repo.id);

  const updateState = (repo) => {
    if (isKudo(repo)) {
      setKudos(prevKudos => kudos.filter(kudoRepo => kudoRepo.id !== repo.id ));
    } else {
      setKudos(prevKudos => [repo, ...prevKudos]);
    }
  };

  const  updateBackend = (repo) => {
    if (isKudo(repo)) {
      apiClient.deleteKudo(repo);
    } else {
      apiClient.createKudo(repo);
    }
    updateState(repo);
  }

  const onKudo = (repo) => {
      updateBackend(repo);
  }

  const onSearch = (event) => {
    const target = event.target;
    if (!target.value || target.length < 3) {
      return;
    }
    if (event.which !== 13) {
      return
    }

    githubClient(target.value)
      .then((response) => {
        target.blur();
        setValue(1);
        resetRepos(response.items);
      });
  }

  const renderRepos = (repos) => {
    if (!repos) {
      return [];
    }

    return repos.map((repo) => {
      return (
        <Grid item xs={12} md={3} key={repo.id}>
          <GitHubRepoWithStyles onKudo={onKudo} isKudo={isKudo(repo)} repo={repo} />
        </Grid>
      );
    })
  }

  return (
      <div className={styles.root}>
        <SearchBarWithStylesAndOktaAuth onSearch={onSearch} />
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Kudos" />
          <Tab label="Search" />
        </Tabs>

        <SwipeableViews
          axis={'x-reverse'}
          index={value}
          onChangeIndex={handleTabChangeIndex}
        >
          <Grid container spacing={10} style={{padding: '20px 0'}}>
            { renderRepos(kudos) }
          </Grid>
          <Grid container spacing={10} style={{padding: '20px 0'}}>
            { renderRepos(repos) }
          </Grid>
        </SwipeableViews>
      </div>
    );
};

export const HomeWithOktaAndStyles = withStyles(styles)(withOktaAuth(Home));

