echo "wait db server"
dockerize -wait tcp://db:3306 -timeout 3s

echo "start node server"
yarn dev