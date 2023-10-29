const path = require('path'); // подключаем path к конфигу вебпак, т.к. вебпак не понимает относительных путей
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин для работы с html файлами
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //  плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // плагин, объединяющие все css файлы в один

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
    // указали первое место, куда заглянет webpack, — файл index.js в папке src
    entry: { main: './src/index.js' },
    // указали в какой файл будет собираться весь js и дали ему имя
    output: {
        // переписали точку выхода, используя утилиту path
        //path: './dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
            publicPath: ''
    },
    mode: 'development', // добавили режим разработчика
    // настройки для локального сервера
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },    
    // настройки для Babel
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },

            // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },

            // правило для сборки файлов с расширением less
            {
            test: /\.less$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },

            // // правило для сборки css файлов в один
            // {
            // // применять это правило только к CSS-файлам
            // test: /\.css$/,
            // // при обработке этих файлов нужно использовать
            // // MiniCssExtractPlugin.loader и css-loader
            // use: [MiniCssExtractPlugin.loader, {
            //     loader: 'css-loader'
            // }]
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // настраивать его не потребуется, достаточно просто вызвать
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ],
}

