export default {
    name: 'staging',
    mysql: {
        username: 'root',
        password: 'root',
        multiStatement: false,
        dbName: 'fo',
        host: 'localhost',
        enableLogging: false
    },
    influx: {
        // TODO remove url
        url: 'http://localhost:8086/sensu',
        host: 'http://localhost:8086/sensu'
    },
    grafana: {
        host: '54.245.163.213:4000'
    },
    app: {
        host: '54.245.163.213',
        serveDummyStatusData: false
    }
}
