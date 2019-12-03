import React from 'react';
import { getRequestById, getCommentsByRequestId, postComment } from '../../utils/fetchAPI';
import { Spinner } from '../../components';
import './styles.scss';
import { Phone, Mail, User, Inbox } from 'react-feather';
import { AuthContext } from '../../context/authContext';

export const RequestPage = (props) => {
    const requestId = props.match.params.id;
    const [request, setRequest] = React.useState();
    const [comments, setComments] = React.useState();
    const [newComment, setNewComment] = React.useState();
    const { user } = React.useContext(AuthContext);

    React.useEffect(() => {
        getRequestById(requestId).then(({data}) => {
            setRequest(data.data.request);
        })
        getCommentsByRequestId(requestId).then(({data}) => {
            setComments(data.data.comments);
        })
    }, []);

    const handleChange = (e) => {
        setNewComment(e.target.value);
    }

    const handleAddComment = () => {
        
        postComment(newComment, requestId, user.id).then(({data}) => {
            setNewComment('');
        })
    };
    
    if (request) {
        return (
            <section className="request-page">
                <div className="box">
                    <header className="request-page__header">
                        <div className="request-page__header" className="tag is-dark is-medium">Заявка #{request.id}</div>
                        <div className={`tag is-medium ${request.status.color} request-page__status`}>{request.status.label}</div>
                        <div className="request-page__date request-page__date--create has-text-grey-light" title="Дата створення">Дата створення: {new Date(request.created_at).toLocaleDateString()}</div>
                        <div className="request-page__date request-page__date--update has-text-grey-light" title="Оновлено статус">Останнє оновлення: {new Date(request.updated_at).toLocaleDateString()}</div>
                    </header>
                    <nav className="level is-mobile request-page__appartment">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Секцiя</p>
                                    <p className="title">{request.user.appartment.section}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Поверх</p>
                                    <p className="title">{request.user.appartment.floor}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Квартира</p>
                                    <p className="title">{request.user.appartment.number}</p>
                                </div>
                            </div>
                        </nav>
                    <article className="request-page__content content">
                        <div className="request-page__title is-size-5">Опис</div>
                        {request.description}
                    </article>
                    <div className="request-page__info">
                        <div className="request-page__title is-size-5">Контактна iнформацiя</div>
                        <div className="request-page__contacts">
                            <div className="request-page__contact"><User size={16} />{request.user.username}</div>
                            <div className="request-page__contact"><Mail size={16} /> <a href={`mailto:${request.user.email}`}>{request.user.email}</a></div>
                            {request.user.phone && <div className="request-page__contact"><Phone size={16} /> <a href={`tel:${request.user.phone}`}>{request.user.phone}</a></div>}
                        </div>
                    </div>
                </div>
                <section className="request-page__comments">
                    <div className="request-page__comments-title is-size-5">Коментарі</div>
                    {comments.map(com => {
                        console.log({user, com})
                        return (
                        <div key={com.id} className={`box comment ${com.user.id != user.id && 'has-background-white-ter'}`}>
                            {com.user.username}
                            {new Date(com.created_at).toLocaleString()}
                            {com.text}
                        </div>
                    )})}
                    <div>
                        <textarea className="textarea" onChange={handleChange}></textarea>
                        <button className="button" onClick={handleAddComment}>post</button>
                    </div>
                    {!comments.length && <span><Inbox /> Empty</span>}
                </section>
            </section>
        );

    }

    return <Spinner />;
};  