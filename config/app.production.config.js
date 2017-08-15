export default {
    name: 'production',
    mysql: {
        username: 'root',
        password: 'root',
        multiStatement: false,
        dbName: 'cryptax',
        host: 'localhost',
        enableLogging: false
    },
    influx: {
        // TODO remove url property, use host instead
        url: 'http://localhost:8086/sensu',
        host: 'http://localhost:8086/sensu'
    },
    grafana: {
        host: '172.16.2.103:4000'
    },
    app: {
        host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        // host: 'localhost',
        serveDummyStatusData: true
    }
}
