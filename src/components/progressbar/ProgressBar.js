import React from 'react';

class ProgressBar extends React.Component {
    render() {
        return (
            <div>
                <div className="progressBar__border">
                    <div className="progressBar__value"></div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;