const jwt = require('jsonwebtoken');

exports.membersPage = async (req, res, next) => {
    try {
        const token = req.cookies["token"];
        let url = `http://localhost:3000/api/user/`;
      
        myInit = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();
          
        res.render('members/members.ejs', {page: "Members", arrow:"hidden", userInfo});

      } catch {
        res.status(401).json({ error: "Unauthenticated Request" });
      }
};

exports.memberProfilePage = async (req, res, next) => {
  try {
      
    const token = req.cookies["token"];
    const userId = req.params.id;
    let url = `http://localhost:3000/api/user/${userId}`;

    let myInit = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let userInfo = await fetch(url, myInit);
    userInfo = await userInfo.json();

/////////////////retrieve token from db///////////////////////
    let urlGetStravaConnectionData = `http://localhost:3000/api/strava/${userId}`;

    myInitStravaConnectionData = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let stravaConnectionData = await fetch(urlGetStravaConnectionData, myInitStravaConnectionData);
    stravaConnectionData = await stravaConnectionData.json();

    let userInfoStrava;

    if (stravaConnectionData==null) {
        userInfoStrava = {
            recent_ride_totals: {
                count: 'none',
                moving_time: 'none',
                distance: 'none',
                elevation_gain: 'none',
            }
        }
    } else {

//////////////////retrieve data from strava/////////////////////////////////
        let secSinceEpoch = new Date()/1000;
        let stravaAccessToken = stravaConnectionData.access_token;
        if ((stravaConnectionData.expires_at)-(60*60) <= secSinceEpoch) {
        console.log("token expired")
        const myInitTokenRefresh = {
            method: "POST",
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
        
            body: JSON.stringify({
            client_id: '55086',
            client_secret: '73c4b2c531139e982d531e7bcf31539551f0b406',
            grant_type: 'refresh_token',
            refresh_token: stravaConnectionData.refresh_token
            })
        };
        let updatedData = await fetch(urlStrava, myInitTokenRefresh);
        updatedData = await updatedData.json();

        const urlSaveInDbUpdate = `http://localhost:3000/api/strava/${userId}`;
        const myInitUpdatedTokenSave = {
            method: "PUT",
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
        
            body: JSON.stringify({
            userId: userId,
            access_token: updatedData.access_token,
            refresh_token: updatedData.refresh_token,
            expires_at: updatedData.expires_at,
            expires_in: updatedData.expires_in
            })
        };
        await fetch(urlSaveInDbUpdate, myInitUpdatedTokenSave);
        stravaAccessToken = updatedData.access_token;
        }
    
        let urlStravaGetAthleteInfo = `https://www.strava.com/api/v3/athletes/${stravaConnectionData.athleteId}/stats`;
        let myInitStrava = {
            headers: {
            Authorization: "Bearer " + stravaAccessToken,
            },
        };
        userInfoStrava = await fetch(urlStravaGetAthleteInfo, myInitStrava);
        userInfoStrava = await userInfoStrava.json();
    }
    res.render('members/memberProfile.ejs', {page: "Profile", arrow:"", userInfo, userInfoStrava});
  } catch {
    res.status(401).render('noaccess.ejs', {page: "Profile", arrow:""});
  }

};