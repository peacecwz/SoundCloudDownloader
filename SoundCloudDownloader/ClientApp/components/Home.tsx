import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DownloaderStore from '../store/Downloader';

interface State {
    trackUrl: string;
}

type DownloaderProps =
    DownloaderStore.DownloaderState
    & typeof DownloaderStore.actionCreators
    & RouteComponentProps<{}>;

class DownloaderPage extends React.Component<DownloaderProps, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            trackUrl: ''
        };
    }

    private startToDownload() {
        this.props.downloadMusic(this.state.trackUrl);
    }

    public render() {
        return (
            <div className="main-content-container">
                <input autoFocus type="text" onChange={e => this.setState({
                    trackUrl: e.target.value
                })} />
                <button onClick={this.startToDownload.bind(this)}>Convert</button>
                {this.props.track != null ? (
                    <div>
                        <p><b>Track Name: </b>{this.props.track.title}</p>
                        <p><b>Track Name: </b>{this.props.track.downloadUrl}</p>
                    </div>
                ): null}
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.downloader,
    DownloaderStore.actionCreators
)(DownloaderPage) as typeof DownloaderPage;
