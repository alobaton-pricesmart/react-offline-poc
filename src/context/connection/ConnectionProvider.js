import { Component } from 'react';
import ConnectionContext from './ConnectionContext';
import ConnectionService from './ConnectionService';

class ConnectionProvider extends Component {

    state = {
        hasNetworkConnection: navigator.onLine,
        hasInternetAccess: false
    };

    defaultOptions = {
        enableHeartbeat: true,
        heartbeatUrl: 'http://tests.free.beeceptor.com',
        heartbeatInterval: 30000,
        heartbeatRetryInterval: 1000,
        requestMethod: 'head'
    };

    axiosRequestConfig = {
        baseURL: this.defaultOptions.heartbeatUrl,
        method: this.defaultOptions.requestMethod,
        headers: {
            'Content-Type': 'application/json',
            Pragma: 'no-cache'
        }
    };

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
        if (!this.defaultOptions.enableHeartbeat) {
            return;
        }

        ConnectionService.checkInternetState(this.axiosRequestConfig).then((internetState) => {
            this.setState({ hasInternetAccess: internetState });
        });

        const that = this;
        setInterval(() => {
            ConnectionService.checkInternetState(this.axiosRequestConfig).then((internetState) => {
                that.setState({ hasInternetAccess: internetState });
            });
        }, this.defaultOptions.heartbeatInterval);
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