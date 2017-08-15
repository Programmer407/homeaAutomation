export default {
    name: 'development',
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
        url: 'http://54.245.163.213:8086/sensu',
        // this is staging server URL
        host: 'http://54.245.163.213:8086/sensu'
    },
    grafana: {
        host: '54.245.163.213:4000'
    },
    app: {
        // host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        host: 'localhost',
        serveDummyStatusData: true
    }
}
