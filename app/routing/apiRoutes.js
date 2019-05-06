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

    console.log("the survey data length is: " + surveyData.length);

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

    // Once the usersArr is fully populated, sort ASCENDING on total_diff and which ever usersObj in the usersArr has
    // the lowest total_diff is the MATCH...
    usersArr.sort(function(a,b){

        return a.total_diff-b.total_diff

    })

    console.log(usersArr);

    console.log("THE users Array length is: " + usersArr.length);
    
    for (let i = 0; i<40; i++){

        console.log("the tiedUsersArr LENGTH is: " + tiedUsersArr.length);

        if(tiedUsersArr.length>=2){

            return tiedUsersArr;

        }else {

            console.log("the i is: " + i);
            tiedUsersArr = usersArr.map(x => x.total_diff===i)

        }
        
    }
        
    if(tiedUsersArr.length>=2){
            
        console.log("THE TIED USERS ARRAY is: " + tiedUsersArr)


        // EVALUATE questionDiff arrays when there are objects in tiedUsersArr
        for(let i =0; i<tiedUsersArr.length; i++){

            // there's more than 1 user with the lowest Diff possible so leave the for...loop to evaluate the 
            // differences of each quesiton in their respective questionDiff arrays

        }

    // There's only 1 match at the lowest difference
    }else {

        matchObj=usersArr[0];
        console.log("the matchObj is: " + matchObj)

    }
    
    // res.json({ ok: true });

    res.json({ matchObj });

  });
};
