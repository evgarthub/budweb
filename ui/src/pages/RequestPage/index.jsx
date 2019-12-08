import React from 'react';
import { getRequestById, getCommentsByRequestId, postComment, getStatuses, updateRequestStatus, updateRequestSpeed, updateRequestQuality } from '../../utils/fetchAPI';
import { Spinner, Rate } from '../../components';
import './styles.scss';
import { Phone, Mail, User, MessageSquare, ChevronDown } from 'react-feather';
import { AuthContext } from '../../context/authContext';
import { EmptyPlace } from '../../components/EmptyPlace';
import { Button } from '../../components/Button';

export const RequestPage = (props) => {
    const requestId = props.match.params.id;
    const [request, setRequest] = React.useState();
    const [newComment, setNewComment] = React.useState();
    const [isInvalid, setIsInvalid] = React.useState(true);
    const { user } = React.useContext(AuthContext);

    React.useEffect(() => {
        getRequestById(requestId).then(({data}) => {
            setRequest(data.data.request);
        })
    }, []);

    const handleChange = (e) => {
        setNewComment(e.target.value);

        if (e.target.value.length < 5) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    }

    const handleAddComment = () => {
        setIsInvalid(true);
        postComment(newComment, requestId, user.id).then(({data}) => {
            setNewComment('');

            getRequestById(requestId).then(({data}) => {
                setRequest(data.data.request);
            })
        });
    };

    const handleStatusUpdate = (statusId) => {
        updateRequestStatus(requestId, statusId).then(({ data }) => {
            setRequest(data.data.updateRequest.request);
        });
    };

    const handleSpeed = (amount) => {
        if (user.role.id != 5) {
            updateRequestSpeed(requestId, amount).then(({ data }) => {
                setRequest(data.data.updateRequest.request);
            });
        }
    };

    const handleQuality = (amount) => {
        if (user.role.id != 5) {
            updateRequestQuality(requestId, amount).then(({ data }) => {
                setRequest(data.data.updateRequest.request);
            });
        }
    };
    
    if (request) {
        return (
            <section className="request-page">
                <div className="request-page__container">
                    <div className="box">
                        <header className="request-page__header">
                            <div className="request-page__header" className="tag is-dark is-medium">Заявка #{request.id}</div>
                            {user.role.id == 5 
                                ? <StatusesDropdown className="request-page__status" status={request.status} onChange={handleStatusUpdate} />
                                :<div className={`tag is-medium ${request.status.color} request-page__status`}>{request.status.label}</div>}
                            

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
                        {
                            request.status.id === '6' && (
                                <section className="request-page__rates">
                                    <div className="request-page__title is-size-5">Оцiнiть виконання заявки</div>
                                    <nav className="level is-mobile">
                                        
                                        <div className="level-item has-text-centered">
                                            <Rate value={request.speed} title="Швидкість" onChange={user.role.id != 5 ? handleSpeed : null} />
                                        </div>
                                        <div className="level-item has-text-centered">
                                            <Rate value={request.quality} title="Якість" onChange={user.role.id != 5 ? handleQuality : null} />
                                        </div>
                                    </nav>
                                </section>
                            )
                        }
                    </div>
                    <section className="request-page__comments">
                        <div className="request-page__comments-title is-size-5">Коментарі</div>
                        {request.comments && request.comments.map(com => {
                            return (
                                <div key={com.id} className={`box comment ${com.user.id != user.id && 'has-background-white-ter'} request-page__comment`}>
                                    <div className="request-page__comment-header">
                                        <strong>{com.user.username}</strong>
                                        <small className="has-text-grey-light">{new Date(com.created_at).toLocaleString()}</small>
                                    </div>
                                    <p>
                                        {com.text}
                                    </p>
                                </div>
                            );
                        })}
                        {!request.comments.length && <EmptyPlace title="Коментарі відсутні" />}
                        <div>
                            <textarea className="textarea" onChange={handleChange} value={newComment} />
                            <br />
                            <Button color='blue' onClick={handleAddComment} disabled={isInvalid} iconBefore={<MessageSquare />}>Додати коментар</Button>
                        </div>
                        
                    </section>
                </div>
            </section>
        );

    }

    return <Spinner />;
};

const StatusesDropdown = ({ status, className, onChange }) => {
    const [options, setOptions] = React.useState([]);
    const [isOpened, setOpened] = React.useState(false);

    React.useEffect(() => {
        getStatuses().then(({ data }) => {
            setOptions(data.data.statuses);
        });
    }, []);


    const handleClick = () => setOpened(!isOpened);
    const handleChoise = (id) => {
        setOpened(false);
        onChange(id);
    };

    return (
        <div className={`${className} dropdown is-right ${isOpened && 'is-active'}`}>
            <div className="dropdown-trigger" onClick={handleClick}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu0">
                    <span>{status.label}</span>
                    <span className="icon is-small">
                        <ChevronDown />
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu0" role="menu">
                <div className="dropdown-content">
                    {options && options.map(status => {
                        const handleClick = () => handleChoise(status.id);

                        return (
                            <div key={status.id} className="dropdown-item" onClick={handleClick}>
                                {status.label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}