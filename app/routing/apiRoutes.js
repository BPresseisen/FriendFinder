// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on 
// ===============================================================================

var surveyData = require("../data/findYour1");
var newUserScores = [];
var newUserScoreArr=[];
var userScoreArr=[];
var usersArr=[];
var newUserTotal;
var userTotal;
var questionDiff=[];
var tiedUsersArr=[];
var matchObj={};

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the file)
  // ---------------------------------------------------------------------------

  app.get("/api/users", function(req, res) {
    res.json(surveyData);
    // console.log("hello world" + res.json(surveyData))
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out the survey request... this data is then sent to the server...
  // ---------------------------------------------------------------------------

  app.post("/api/users", function(req, res) {

    // Empty out the arrays of data
    // surveyData.length = 0;

    // console.log(req.body)

    newUserScores = req.body.scores
    
    // console.log(newUserScores);
    for(let i = 0; i<newUserScores.length; i++){
        newUserScoreArr.push(parseInt(newUserScores[i]));
    }

    console.log("The newUserScoreArr is: " + newUserScoreArr);

    newUserTotal = newUserScoreArr.reduce(function(accumulator,score){
            return accumulator + score
    
    },0);

    console.log("The new user total is: " + newUserTotal);

    // console.log(surveyData);

    console.log("the survey data length is: " + surveyData.length);

    // console.log(surveyData[1].scores[2])

    for(let i=0; i<surveyData.length; i++){
        
        // for(let j = 0; i<surveyData[i].scores.length; j++){
        //     userScoreArr.push(parseInt(surveyData[i].scores[j]));
        // }

        // userScoreArr.push(surveyData[i].scores.forEach(parseInt(e1)));

        userScoreArr=[];
        questionDiff=[];

        userScoreArr.push(parseInt(surveyData[i].scores[0]));
        userScoreArr.push(parseInt(surveyData[i].scores[1]));
        userScoreArr.push(parseInt(surveyData[i].scores[2]));
        userScoreArr.push(parseInt(surveyData[i].scores[3]));
        userScoreArr.push(parseInt(surveyData[i].scores[4]));
        userScoreArr.push(parseInt(surveyData[i].scores[5]));
        userScoreArr.push(parseInt(surveyData[i].scores[6]));
        userScoreArr.push(parseInt(surveyData[i].scores[7]));
        userScoreArr.push(parseInt(surveyData[i].scores[8]));
        userScoreArr.push(parseInt(surveyData[i].scores[9]));

        // console.log("The userScoreArr is: " + userScoreArr);

        userTotal = userScoreArr.reduce(function(accumulator,score){

            return accumulator + score

        },0)

        // console.log("The userTotal is:" + userTotal);

        var totalDiff = Math.abs(newUserTotal-userTotal);

        // console.log("The totalDiff is: " + totalDiff);

        // function compare(newUserScoreArr,userScoreArr){

        //     const questionDiff=[];

        //     newUserScoreArr.forEach((e1)=>userScoreArr.forEach((e2)=>
        //             {questionDiff.push(Math.abs(e1-e2))}
        //     ));       
        // }

        // compare();

        // for(let j=0; i<newUserScoreArr;j++){

        //     questionDiff.push(Math.abs(newUserScoreArr[j]-userScoreArr[j]));

        // }

        questionDiff.push(Math.abs(newUserScoreArr[0]-userScoreArr[0]));
        questionDiff.push(Math.abs(newUserScoreArr[1]-userScoreArr[1]));
        questionDiff.push(Math.abs(newUserScoreArr[2]-userScoreArr[2]));
        questionDiff.push(Math.abs(newUserScoreArr[3]-userScoreArr[3]));
        questionDiff.push(Math.abs(newUserScoreArr[4]-userScoreArr[4]));
        questionDiff.push(Math.abs(newUserScoreArr[5]-userScoreArr[5]));
        questionDiff.push(Math.abs(newUserScoreArr[6]-userScoreArr[6]));
        questionDiff.push(Math.abs(newUserScoreArr[7]-userScoreArr[7]));
        questionDiff.push(Math.abs(newUserScoreArr[8]-userScoreArr[8]));
        questionDiff.push(Math.abs(newUserScoreArr[9]-userScoreArr[9]));

        // console.log(questionDiff);

        var usersObj = {
            name: surveyData[i].name,
            photo: surveyData[i].photo,
            totalScore: userTotal,
            total_diff: totalDiff,
            questionDiff: questionDiff
        }

        usersArr.push(usersObj);
    }

    // console.log(usersArr)

    //SORT ON total_diff (SEE NOTE BELOW IN PSEUDOCODE lone 116)
    usersArr.sort(function(a,b){

        return a.total_diff-b.total_diff

    })

     // Once the usersArr is fully populated, sort ASCENDING on total_diff and which ever usersObj in the usersArr has
    // the lowest total_diff is the MATCH...
    console.log(usersArr);

    // BEFORE MAKING THIS MATCH APPEAR IN THE MODAL...
    // MAKE SURE THE total_diff for the NEXT usersObj in the usersArr IS NOT EQUAL...
    //
    // IF IT IS CHECK THE NEXT ONE AND SO ON AND SO FORTH until there is certainty as to how many usersObj share 
    // the equivalent total_diff value., i.e., are in a tie for lowest total_diff
    //
    // FOR ALL OF THE usersObj that are tied, compare each of the indexed position values of the questionDiff 
    // starting with the questionDiff[0] for each tied usersObj...
    //
    // FOR EXAMPLE, if two(2) users are tied for lowest toal_diff and the questionDiff[0] is lower for the second of
    // the two tied usersObj, then that second user is the MATCH...if it's lower for the first userObj, then they are
    // the match. If they're equivalent, move to questionDiff[1] and repeat until there is a MATCH...
    // 
    // If there are no differenes in their scores at all, make the MATCH on the lower-ranked position usersObj in the
    // usersArr. FOR EXAMPLE, if there is a tie between usersArr[0] and users[1], the usersArr[0] is the MATCH
    //
    //
    // code to step through the questionDiff array on the "tied" users
    //
    //
    /////

    console.log("the users Array length is: " + usersArr.length);
    
    for(let i =0; usersArr.length; i++){

        var tiedUsersArr = usersArr.map(x => x.totalDiff===i)
        
        if(tiedUsersArr.length>=2){
            
            return tiedUsersArr
        }
    }

    console.log("the tied users array is: " + tiedUsersArr)

    // EVALUATE questionDiff arrays when there are objects in tiedUsersArr
    // there's more than 1 user with the lowest Diff possible so leave the for...loop to evaluate the 
    // differences of each quesiton in their respective questionDiff arrays
    if (tiedUsersArr.length >=2){



    }else{

        matchObj=usersArr[0];

    }
    
    // res.json({ ok: true });

    res.json({ matchObj });

  });
};
