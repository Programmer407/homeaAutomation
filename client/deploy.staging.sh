echo "Initiating client build ..."

echo "1/1) Building client scripts ..."
set NODE_ENV=production && set CONFIG=staging && webpack --config webpack.production.config.js --progress

echo "Client building complete."
