module.exports = {
    apps: [{
        name: 'Decorator Api',
        script: 'dist/main.js',
        watch: false,
        instance_var: 'INSTANCE_ID',
        env_staging: {
            'PORT': 3001,
            'NODE_ENV': 'staging'
        }
    }]
}