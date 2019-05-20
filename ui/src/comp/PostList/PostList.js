import React, { Component } from 'react';
import PostCard from '../../comp/PostCard/PostCard';
import { label } from '../../variables/labels';
import api from "../../variables/api";
import "./PostList.scss";

class PostList extends Component {
    constructor({limit, sort}) {
        super();
        this.state = {
            isLoading: true,
            sorted: sort || 'DESC',
            limit: limit || 0,
            data: []
        }
    }

    componentDidMount() {
        this.fetchData(this.state.sorted);
    }

    fetchData = (sort) => {
        fetch(`${api.url}${api.blogs}?_sort=created_at:${sort}`)
            .then(response => response.json())
            .then(res => {
                this.setState(() => ({
                    sorted: sort,
                    isLoading: false,
                    data: res
                }));
                this.forceUpdate()
            });
    }

    sortAsc = () => {
        this.fetchData('ASC');
    }

    sortDesc = () => {
        this.fetchData('DESC');
    }

    render() {
        const { limit, data, sorted } = this.state;
        const list = limit ? data.slice(0, limit) : data;

        return (
            <section className="post-list">
                {
                    !limit && (
                        <div className="tags has-addons" >
                            <span className={`post-list__tag tag ${sorted === "ASC" && "is-dark"}`} onClick={this.sortAsc}>{label.list.oldest}</span>
                            <span className={`post-list__tag tag ${sorted === "DESC" && "is-dark"}`} onClick={this.sortDesc}>{label.list.latest}</span>
                        </div>
                    )
                }

                <section className='grid'>
                    {list.map(blog => <PostCard key={blog.id} {...blog} />)}
                </section>
            </section>
        );
    }
}

export default PostList;
