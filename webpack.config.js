import path from "path";
import { fileURLToPath } from "url";
import Dotenv from "dotenv-webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/app/index.jsx",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/public"),
        },
        port: 3000,
        open: false
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            },
            {
                test: /\.css?$/,
                exclude: /(node_modules)|\.module\.css?$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.module\.css?$/,
                exclude: /(node_modules)/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        publicPath: "/public/",
        filename: 'bundle.js',
    },
    mode: "production",
    plugins: [
        new Dotenv({
            path: './.env'
        }),
    ],
}