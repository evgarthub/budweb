import React from 'react';
import {updateRequestStatus} from '../../utils/fetchAPI';

export class StatusOptionsRenderer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentOption: props.value,
        }
    }

    isPopup = () => true;
    getValue = () => this.state.currentOption;
    onChange = (id) => {        
        updateRequestStatus(this.props.data.id, id);
        this.setState({ currentOption: id }, () => this.props.stopEditing(false));
    };

    render() {
        return (
            <div className='statuses'>
                {this.props.statuses.map(status => <TagRender key={status.id} onChange={this.onChange} {...status} />)}
            </div>
        );
    }
}

export const StatusRenderer = (props) => {
    const { statuses, value: id } = props;

    if (statuses) {
        const { color, label } = statuses[id - 1];
        return (<span className={`tag ${color}`}>{label}</span>);
    }

    return null;
};

const TagRender = ({ color, label, id, onChange }) => {
    const handleClick = () => onChange(id);

    return (<span onClick={handleClick} className={`statuses__tag tag ${color}`}>{label}</span>);
};
