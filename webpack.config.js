const path = require('path'); // Подключаем встроенный модуль 'path' для работы с путями файлов
const webpack = require('webpack'); // Подключаем 'webpack' для использования его функционала

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
    ],
};