import React, { useEffect, useState } from 'react';
import { PostCard, Spinner } from '../';
import { getBlogs } from '../../utils/fetchAPI';
import { label } from '../../variables/labels';
import "./styles.scss";

const PostList = (props) => {
    const [sorted, setSorted] = useState(props.sort || 'DESC');
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBlogs(sorted, props.limit)
            .then(({data}) => {
                setData([ ...data, ]);
                setLoading(false);
            });
    }, [sorted, props.limit]);

    const list = props.limit ? data.slice(0, props.limit) : data;

    if (isLoading) return <Spinner />

    return (
        <section className="post-list">
            {!props.limit && (
                <div className="tags has-addons" >
                    <span className={`post-list__tag tag ${sorted === "ASC" && "is-dark"}`} onClick={() => setSorted('ASC')}>{label.list.oldest}</span>
                    <span className={`post-list__tag tag ${sorted === "DESC" && "is-dark"}`} onClick={() => setSorted('DESC')}>{label.list.latest}</span>
                </div>
            )}

            <section className='grid'>
                {list.map(blog => <PostCard key={blog.id} {...blog} />)}
            </section>
        </section>
    );
}

export default PostList;
