# npProject

- Challenge type:  `Consolidation`
- Duration: `4 weeks`
- Deadline: `16/11/20 9 A.M.`
- Deployment :
	- Heroku
	- MongoDB Atlas

- Team challenge :  `solo`

## Take a look
The project was developed for mobile first. It is recommanded to use the dev tool of your browser to visit the website.   
[npProject](https://exonpproject.herokuapp.com/)

## Objectif
Put into practice everything I learned at BeCode after 4 months and especially Node.js.

## Project
A website to create and participate in different kinds of sport events.

**Features**
- Session system: sign up, sign in, sign out, lost password, different permissions
- Event system: CRUD, possibility to take part and sort the event list
- Members system: follow different members and look at their stats

**Permissions**
- Admin is able to edit or delete every event
- Member is only able to edit or delete his own events
- Guest cannot acces the website without registration

**API**
- Strava API to retrieve member stats for his profile
- Mapbox API to display custom map tiles

## Mock up
![mockup](https://user-images.githubusercontent.com/66431442/96180709-21380400-0f33-11eb-8c01-a3f91ec22ab0.jpg)

## Graphic charter
![Capture](https://user-images.githubusercontent.com/66431442/96180720-2301c780-0f33-11eb-86dc-aa02cb000f84.JPG)

## Database schema
User collection schema

![Capture](https://user-images.githubusercontent.com/66431442/96180885-6ceaad80-0f33-11eb-9d91-b6690fb66c07.JPG)

Event collection schema

![Capture](https://user-images.githubusercontent.com/66431442/98675996-4b76b900-235b-11eb-9cca-cc6e0b8f631a.JPG)

Participant collection schema

![Capture](https://user-images.githubusercontent.com/66431442/98676234-9db7da00-235b-11eb-9d5f-97efeda4f600.JPG)

Following collection schema

![Capture](https://user-images.githubusercontent.com/66431442/98676361-cb9d1e80-235b-11eb-85d7-8c444ea4770d.JPG)

Strava collection schema

![Capture](https://user-images.githubusercontent.com/66431442/98676519-fe471700-235b-11eb-826f-9f4907ab7fc3.JPG)

## Built with

**Backend :** 
- Node.js
- Express

**Frontend :** 
- HTML5
- CSS3
- Javascript
- Materialize
- Leaflet
