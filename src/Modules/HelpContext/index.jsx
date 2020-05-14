import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom';
import { GetTopics } from '../../REST/helpcontext';
import { authenticationService } from '../../components/authorization';
import { useParams } from 'react-router-dom';
import { TopicEditor, ArticleEditor, StoryEditor } from './editor';
import TopicView from './topic';
import ArticleView from './article';
import StoryView from './story';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function ClippedDrawer() {
    const [topics, setTopics] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        GetTopics().then(resp => {
            if (Array.isArray(resp.data))
                setTopics(resp.data)
        })
    }, [refresh])

    const { topic } = useParams();
    const doRefresh = () => {
        setRefresh(!refresh)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar color='secondary' position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Help
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItemLink href={`#help`}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'All Topics'} />
                        </ListItemLink>
                        <Divider />
                        {topics.map((e, i) => {
                            return <React.Fragment key={i}>
                                <ListItemLink selected={String(e.id) === String(topic)} href={`#help/${e.id}`}>
                                    <ListItemText primary={e.title} />
                                </ListItemLink>
                                <Divider />
                            </React.Fragment>
                        })}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <div className='row'>
                    <div className='col-6'>
                        <Route exact path='/help' render={() => <div>{authenticationService.isAdmin() && <TopicEditor onClose={doRefresh} />}</div>} />
                        <Route exact path='/help/:topic' render={(props) => <div>{authenticationService.isAdmin() && <ArticleEditor onClose={doRefresh} />}</div>} />
                        <Route exact path='/help/:topic/:article' render={(props) => <div>{authenticationService.isAdmin() && <StoryEditor onClose={doRefresh} />}</div>} />
                    </div>
                    <div className='col-6'>
                        <Button href='#' variant='outlined' className='float-right' startIcon={<ArrowBack />}>Back</Button>
                    </div>
                    <div className='clearfix' />
                </div>
                <hr />
                <Route exact path='/help' render={() => <TopicView topics={topics} />} />
                <Route exact path='/help/:topic' component={ArticleView} />
                <Route exact path='/help/:topic/:article/:story?' component={StoryView} />
            </main>
        </div>
    );
}


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}