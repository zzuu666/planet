module.exports = {
    overrides: [
        {
            test: './applications/*',
            presets: ['react-app']
        },
        {
            test: './packages/*',
            presets: ['@babel/env', '@babel/react', '@babel/typescript']
        }
    ]
}
