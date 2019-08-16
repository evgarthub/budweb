import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = (props) => {
    const [location] = useState(props.location.pathname);

    useEffect(() => {
        if (location !== props.location.pathname) {
            window.scrollTo(0, 0);
        }
    })

    return props.children;
}

export default withRouter(ScrollToTop);