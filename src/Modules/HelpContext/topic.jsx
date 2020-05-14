import React from 'react';

export default function TopicView({ topics = [] }) {
    return <ul>
        {topics.map((e, i) => {
            return <li key={i}>
                <h6>
                    <a href={`#help/${e.id}`}>{e.title}</a>
                </h6>
            </li>
        })
        }
    </ul>
}