import React from 'react';
import './styles.scss';

const Loading = (props) => (<section className={`loading ${!props.visible && 'loading--hidden'}`}><progress className="loading__progress progress is-small is-link" max="100"></progress></section>);
 
export default Loading;