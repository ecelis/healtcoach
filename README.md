# Web Health Coach

I started this project to dust off my JavaScript skills and learn [Sequelize](https://sequelize.org/) and 💅🏾[styled-components](https://styled-components.com/) in the process. Also as a showoff to potential employers while I was in the hunt for a new job.

The RESTful API for Web Health Coach is [nutricion-energetica](https://github.com/ecelis/nutricion-energetica).

## Develop

### Docker
```
docker build -t whcfront \
    --build-arg REACT_APP_APIURL=http://localhost:3000 .
```
```
docker run -p 8080:80 --link whcapi whcfront
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
