## To Run for development without docker

1. Navigate to folder react and execute "npm run start"
    1.1 Open up localhost:3000
2. Navigate to folder express and execute "npm run dev"

## to Run for development with docker
1. Navigate to root
2. Execute "docker-compose up -d"
React App => localhost:3000 (live refresh on any file changes made within the react folder)
Express Backend => localhost:3001

### To Build for production

1. Navigate to root
2. Execute "docker-compose --build --no-cache"
3. Execute "docker-compose down"
4. Execute "docker-compose up -d"
Note => If you want to see the latest changes made on the build, you must execute docker-compose --build --no-cache