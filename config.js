module.exports = {
    'secret': 'rutledge_team',
    'host': '0.0.0.0',
    'port': 9013,
    "routes": [       
        {
            url: 'user',
            file: 'user'
        },
        {
            url: 'menu',
            file: 'menu'
        }
    ],
    "database": {
        connectionLimit: 100,
        host: '172.16.0.68',
        user: 'dev',
        password: 'dev123',
        database: 'people_device_iot',
        debug: false
    }
};
