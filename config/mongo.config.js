
const config = {
    default: {
        url: 'mongodb://mongo.prv:27017/Notes',
        host: 'mongo.prv',
        port: 27017,
        database: 'Notes',
        user: 'root',
        username: '',
        password: '',
        useNewParser: true,

    },
    local: {
        url: 'mongodb://mongo.prv:27017/Notes',
        host: 'mongo.prv',
        port: 27017,
        database: 'Notes',
        user: 'root',
        username: '',
        password: '',
        useNewParser: true,
    },
    connString: 'mongodb://mongo.prv:27017/Notes',
    
};


module.exports = config;
