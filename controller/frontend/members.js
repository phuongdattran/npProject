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

