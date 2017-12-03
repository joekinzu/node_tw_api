// global vars
var Twitter = require('twitter');
var page = 25;
var limit = 10;
var offset = 0;
var tw={};
// auth data for twitter api
var client = new Twitter({
 consumer_key: 'KMnQ0DrjhUousVBDaH8WuzJ6q',
 consumer_secret: 'fg9cC90G8gqdA9GyY4GPttrANyJBy8JI1XxdzA5UAGZgXME6tX',
 access_token_key: '2450273389-dn9lXWZ1hcsd7qFGlg2iSqsnSVUDbTDQ5QhrLOD',
 access_token_secret: 'U2bXYixYsgNwD5SteyrANVP3VTwarIppiEK07KItSgvyC'
});
//paging
var getPage =  (offset, limit, parentResolve) => {
    // get tweets using search api
    client.get("search/tweets.json?q=keddr&count="+page, (error, tweets, response) => {
        let j=0;
        for(var i=0;i<10;i++){
            j=i+offset;
            if(j<page){
            console.log('  ==  '+j+' tweet  ==  ');
            console.log(tweets.statuses[j].text);}
        }
    });
    console.log('___________________________');
    console.log("PAGE NUMBER - " + offset/10);
    console.log('___________________________');
    return new Promise( (pageResolve, pageReject) => {
        setTimeout( () => {
            offset += limit;
            if (offset < page) 
                {return getPage(offset, limit, pageResolve)}
                pageResolve();
        }, 3000);
    }).then(() => {
        console.log("end page - " + offset);
        parentResolve();    
    })
}
    
Run =  () => {
    new Promise( (RunResolve, RunReject) => {
        return new Promise( (startResolve, startReject) => {
            return getPage(offset, limit, startResolve).then( () => {
                RunResolve()
            })
        })
    }).then( () => {
        console.log("done")
    });
};
// start promise    
Run();    
  