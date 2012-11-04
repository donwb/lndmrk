function setDevelopmentConfig(){
    // These are just examples, insert you info here
    DatabaseConfig.port = 27617;
    DatabaseConfig.host = 'dbh61.mongolab.com';
    DatabaseConfig.name = 'lndmrk';
    DatabaseConfig.user = 'lndmrk';
    DatabaseConfig.pass = 'passw0rd';

    EnvConfig.port = 3000;
};

function setProductionConfig(){
    // These are just examples, insert you info here
    DatabaseConfig.port = 27617;
    DatabaseConfig.host = 'dbh61.mongolab.com';
    DatabaseConfig.name = 'lndmrk';
    DatabaseConfig.user = 'lndmrk';
    DatabaseConfig.pass = 'passw0rd';

    EnvConfig.port = 80;
}

var DatabaseConfig = {
    port        : Number,
    host        : String,
    name        : String,
    user        : String,
    pass        : String
};

var EnvConfig = {
    port        : Number
};

module.exports.DatabaseConfig = DatabaseConfig;
module.exports.EnvConfig = EnvConfig;
module.exports.setDevelopmentConfig = setDevelopmentConfig;
module.exports.setProductionConfig = setProductionConfig;