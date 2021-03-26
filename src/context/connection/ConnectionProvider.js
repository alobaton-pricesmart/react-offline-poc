import { Component } from 'react';
import ConnectionContext from './ConnectionContext';
import ConnectionService from './ConnectionService';

const DEFAULT_OPTIONS = {
    enableHeartbeat: true,
    heartbeatProtocol: 'http',
    heartbeatUrl: 'internethealthtest.org',
    heartbeatInterval: 30000,
    requestMethod: 'head'
};

class ConnectionProvider extends Component {

    state = {
        hasNetworkConnection: navigator.onLine,
        hasInternetAccess: false
    };

    options = DEFAULT_OPTIONS;

    constructor(props) {
        super(props);

        // Add custom configuration if needed...
        this.options = {
            ...this.options,
            ...this.props.options
        };
    }

    componentDidMount() {
        const handleOnline = () => {
            this.setState({ hasNetworkConnection: false });
        };
        window.addEventListener('online', handleOnline);

        const handleOffline = () => {
            this.setState({ hasNetworkConnection: true });
        };
        window.addEventListener('offline', handleOffline);

        this.checkInternetState();

        return (
            window.removeEventListener('online', handleOnline),
            window.removeEventListener('offline', handleOffline)
        );
    }

    checkInternetState() {
        if (!this.options.enableHeartbeat) {
            return;
        }

        const axiosRequestConfig = {
            baseURL: `${this.options.heartbeatProtocol}://${this.options.heartbeatUrl}`,
            method: this.options.requestMethod,
            headers: {
                'Content-Type': 'application/json',
                Pragma: 'no-cache'
            }
        };

        ConnectionService.checkInternetState(axiosRequestConfig).then((internetState) => {
            this.setState({ hasInternetAccess: internetState });
        });

        const that = this;
        setInterval(() => {
            ConnectionService.checkInternetState(axiosRequestConfig).then((internetState) => {
                that.setState({ hasInternetAccess: internetState });
            });
        }, this.options.heartbeatInterval);
    }

    render() {
        return (
            <ConnectionContext.Provider
                value={{
                    hasNetworkConnection: this.state.hasNetworkConnection,
                    hasInternetAccess: this.state.hasInternetAccess
                }}
            >
                {this.props.children}
            </ConnectionContext.Provider>
        );
    }
}

export default ConnectionProvider;