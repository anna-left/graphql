# RSSchool NodeJS GraphQL task

## Installation
```
git clone https://github.com/anna-left/graphql
cd graphql
git checkout develop
npm install
```

## Microservices

Repository with microservices: https://github.com/rolling-scopes-school/node-graphql-service

Please make sure you have the latest version of this repository!

Also make sure your database is running.

## Usage
Start microservices
```
npm run run: all
```
Start backend
```
npm run start:dev
```

Please use the service https://studio.apollographql.com/

You can also use Postman as an additional tool

To get started, you should to register a new user
```
Root > Mutation > registerUser
```
 and log in
```
Root > Mutation > login
```

## Queries
- artist
- artists
- genre
- genres
- track
- tracks
- band
- bands
- album
- albums
- jwt
- user
- favourites (available only for logged in user)

## Mutation

- Artists
  - createArtist
  - deleteArtist
  - updateArtist
- Genres
  - createGenre
  - deleteGenre
  - updateGenre
- Bands
  - createBand
  - deleteBand
  - updateBand
- Tracks
  - createTrack
  - deleteTrack
  - updateTrack
- Albums
  - createAlbum
  - deleteAlbum
  - updateAlbum
- Users
  - login
  - register
- Favourites
  - addTrackToFavourites
  - addBandToFavourites
  - addArtistToFavourites
  - addGenreToFavourites
### Users



## Author

👤 **Anna Rybakova**

- discord: `anna-left#0672`
- telegram: https://t.me/AnnaFavor

If you have any questions please contact me

