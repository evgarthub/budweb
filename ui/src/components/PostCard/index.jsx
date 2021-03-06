import React from 'react';
import { Title, Button } from 'bloomer';
import { Link } from "react-router-dom";
import './styles.scss';
import { label } from '../../variables/labels';
import api from "../../variables/api";

const PostCard = (props) => {

    const { created_at, id, title, categories, intro } = props;
    let crDate = new Date(created_at);

    return (
        <div key={id} className='tile-blog grid__tile'>
            <div className='tile-blog__tags'>
                {categories.map(cat => <span className={`tile-blog__tag tag is-light ${cat.color}`} key={cat.id}>{cat.name}</span>)}
            </div>
            <Title isSize={5} tag='h3'>{title}</Title>
            <p>{intro}</p>
            <footer className='tile-blog__footer'>
                <span className='tile-blog__pubdate has-text-grey-light is-size-7'>{crDate.toLocaleDateString()}</span>
                <Link to={`${api.news}/${id}`}><Button isColor='link' isOutlined>{label.list.readButton}</Button></Link>
            </footer>
        </div>
    );
}

export default PostCard;
