const jwt = require('jsonwebtoken');

exports.myProfilePage = async (req, res, next) => {
    try {
        const token = req.cookies["token"];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/${userId}`;
    
        let myInit = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
    
        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();
/////////////Get code & save token in db////////////////
        const urlStrava = "https://www.strava.com/oauth/token";
        if(req.query.code) {
        const myInitToken = {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
      
          body: JSON.stringify({
            client_id: '55086',
            client_secret: '73c4b2c531139e982d531e7bcf31539551f0b406',
            code: req.query.code,
            grant_type: 'authorization_code'
          })
        };
        let data = await fetch(urlStrava, myInitToken);
        data = await data.json();

        const urlSaveInDb = 'http://localhost:3000/api/strava';
        const myInitTokenSave = {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            userId: userId,
            athleteId: data.athlete.id,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: data.expires_at,
            expires_in: data.expires_in
          })
        };

        await fetch(urlSaveInDb, myInitTokenSave);
      }
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
        res.render('myprofile/myprofile.ejs', {page: "My Profile", arrow:"hidden", userInfo, userInfoStrava});
      } catch {
        res.status(401).render('noaccess.ejs', {page: "My Profile", arrow:"hidden"});
      }
};

//http://www.strava.com/oauth/authorize?client_id=55086&response_type=code&redirect_uri=http://localhost:3000/myprofile&approval_prompt=force&scope=read

exports.dcStrava = async (req, res, next) => {
  try {
      const token = req.cookies["token"];
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      const userId = decodedToken.userId;
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
          Authorization: "Bearer " + userInfo.token,
        },
      };
  
      let stravaConnectionData = await fetch(urlGetStravaConnectionData, myInitStravaConnectionData);
      stravaConnectionData = await stravaConnectionData.json();

      let urlDcStrava = `https://www.strava.com/oauth/deauthorize?access_token=${stravaConnectionData.access_token}`;

      const myInitDcStrava = {
        method: "POST",
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        }
      };

      await fetch(urlDcStrava, myInitDcStrava);

      const myInitDcStravaDb = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userInfo.token,
        }
      };

      await fetch(urlGetStravaConnectionData, myInitDcStravaDb);


      res.redirect('/myprofile?dcstrava');
    } catch {
      res.status(401).render('noaccess.ejs', {page: "My Profile", arrow:"hidden"});
    }
};

exports.editMyInfoPage = async (req, res, next) => {
  try {
      const token = req.cookies["token"];
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      const userId = decodedToken.userId;
      let url = `http://localhost:3000/api/user/${userId}`;

      let myInit = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let userInfo = await fetch(url, myInit);
      userInfo = await userInfo.json();
      res.render('myprofile/editmyinfo.ejs', {page: "Edit My Profile", arrow:"", userInfo});
    } catch {
      res.status(401).render('noaccess.ejs', {page: "My Profile", arrow:"hidden"});
    }
};