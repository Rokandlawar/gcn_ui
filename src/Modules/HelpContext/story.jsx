import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetStories } from '../../REST/helpcontext';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
    }
}));

export default function StoryView() {
    const { topic, article, story } = useParams();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        GetStories(article).then(resp => {
            if (Array.isArray(resp.data)) setStories(resp.data)
        })
    }, [article])

    if (story)
        return <StoryDetail />
    return <ul>
        {stories.map((e, i) => {
            return <li key={i}>
                <h6>
                    <a href={`#help/${topic}/${article}/${e.id}`}>{e.title}</a>
                </h6>
            </li>
        })
        }
    </ul>
}

function StoryDetail() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const frameView = useRef(null);
    const { story } = useParams();
    
    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            {story && <iframe onLoad={() => setLoading(false)} id='template-editor' src={`${process.env.REACT_APP_API_URL}/Story/Message/HTML/${story}`} ref={frameView}
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                width="100%"
                height="100%"
                title='Message Viewer'
                scrolling="auto">
            </iframe>}
        </React.Fragment>
    );
}
