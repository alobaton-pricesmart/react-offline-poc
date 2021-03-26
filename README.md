# react-offline-poc

Provides a mechanism using React.Context to check if an application has network connection and internet access.

## How to start?

```bash
$ npm start
```

## How to use?

Wrap your application component with the ConnectionProvider.

```bash
ReactDOM.render(
  <React.StrictMode>
    <ConnectionProvider options={{ heartbeatUrl: 'httpbin.org/get' }}>
        <App />
    </ConnectionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Use the consumer whenever you need.

```bash
 <ConnectionContext.Consumer>
    {context => (
        <p>{context.hasNetworkConnection && context.hasInternetAccess ? 'You are online :)' : 'You are offline :('}</p>
    )}
</ConnectionContext.Consumer>
```

## ContextProvider options

| option            | value                           | description                        |
|-------------------|---------------------------------|------------------------------------|
| enableHeartbeat   | true                            | Enable heartbeat check             |
| heartbeatUrl      | 'http://internethealthtest.org' | Heartbeat url                      |
| heartbeatInterval | 30000                           | Heartbeat interval in milliseconds |
| requestMethod     | 'head'                          | Heartbeat request method           |
