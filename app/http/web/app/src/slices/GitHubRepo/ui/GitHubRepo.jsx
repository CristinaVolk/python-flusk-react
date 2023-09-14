import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from "prop-types";

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  }
});

const GitHubRepo = (props) => {
    console.log(props);
    const { classes, isKudo, onKudo, repo } = props;
    const handleClick = (event) =>  {
    onKudo(repo);
  }

   return (
      <Card className={classes.card}>
        <CardHeader
          title={repo.full_name}
        />
        <CardContent>
          <Typography component="p" style={{minHeight: '90px', overflow: 'scroll'}}>
            {repo.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableSpacing>
          <IconButton aria-label="Add to favorites" onClick={handleClick}>
            <FavoriteIcon color={isKudo ? "secondary" : "primary"} />
          </IconButton>
        </CardActions>
      </Card>
    );
}

GitHubRepo.propTypes = {
    classes: PropTypes.object.isRequired,
    isKudo: PropTypes.bool,
    onKudo: PropTypes.func,
    repo: PropTypes.object,
};

export const GitHubRepoWithStyles = withStyles(styles)(GitHubRepo);