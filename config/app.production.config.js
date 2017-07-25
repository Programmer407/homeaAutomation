export default {
    name: 'production',
    mysql: {
        username: 'root',
        password: 'Y=-w::9:c+.S',
        multiStatement: false,
        dbName: 'fo',
        host: 'sensu.cwdxsdmyidcf.us-east-1.rds.amazonaws.com',
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
        serveDummyStatusData: true
    }
}
