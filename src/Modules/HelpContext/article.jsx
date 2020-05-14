import React, { useEffect, useState } from 'react';
import { GetArticles } from '../../REST/helpcontext';
import { useParams } from 'react-router-dom';

export default function ArticleView() {
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        GetArticles(topic).then(resp => {
            if (Array.isArray(resp.data)) setArticles(resp.data)
        })
    }, [topic])

    return <ul>
        {articles.map((e, i) => {
            return <li key={i}>
                <h6>
                    <a href={`#help/${topic}/${e.id}`}>{e.title}</a>
                </h6>
            </li>
        })
        }
    </ul>
}