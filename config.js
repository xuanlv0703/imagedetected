module.exports = {
    'secret': 'a003_image_processing_team',
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
        },
        {
            url: 'upload',
            file: 'upload'
        },
        {
            url: 'images',
            file: 'images'
        },
        {
            url: 'detect',
            file: 'detect'
        },
        {
            url: 'album',
            file: 'album'
        }

    ],
    "database": {
        connectionLimit: 100,
        host: '172.16.0.68',
        user: 'dev',
        password: 'dev123',
        database: 'a003_image_processing',
        debug: false
    }
};
