import React from 'react';
import { connect } from 'react-redux';

class ProgressBar extends React.Component {
    render() {
        const valueBarStyle = {
            width: this.props.progress + '%'
        };
        return (
            <div>
                <div className="progressBar__border">
                    <div className="progressBar__value" style={valueBarStyle}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    progress: state.progress
});

export default connect(mapStateToProps)(ProgressBar);