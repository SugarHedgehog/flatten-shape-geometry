const path = require('path'); // Подключаем встроенный модуль 'path' для работы с путями файлов
const webpack = require('webpack'); // Подключаем 'webpack' для использования его функционала
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './index.js', // Указываем точку входа для приложения
    output: {
        filename: 'bundle.js', // Имя выходного файла после сборки
        path: path.resolve(__dirname, 'dist'), // Путь к директории, куда будет помещен собранный файл
        library: 'flattenShapeGeometry', // Имя экспортируемой библиотеки
        libraryTarget: 'var', // Тип экспорта библиотеки (в данном случае как переменная)
        globalObject: 'this' // Для поддержки браузеров и Node.js
    },
    mode: 'development', // Устанавливаем режим сборки в 'development' для удобства отладки
    resolve: {
        fallback: {
            "assert": false, // Отключаем использование модуля 'assert'
            "process": require.resolve("process/browser") // Указываем замену для модуля 'process' в браузере
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser', // Автоматически подключаем модуль 'process' для использования в коде
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // Отключаем автоматическое открытие браузера
            generateStatsFile: true, // Генерируем файл stats.json
            statsFilename: 'stats.json'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // Применяем правило ко всем .js файлам
                exclude: /node_modules/, // Исключаем папку node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [//автоматическое добавление необходимых полифиллов
                            ['@babel/preset-env', {
                                useBuiltIns: 'entry', // Используем полифиллы на основе импортов
                                corejs: 3 // Указываем версию core-js
                            }]
                        ]
                    }
                }
            }
        ]
    },

};