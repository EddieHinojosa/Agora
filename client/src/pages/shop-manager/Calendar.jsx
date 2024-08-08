const Calendar = () => {
    return (
        <div></div>

        //-----------------eddie calendar stuff in process-----------------
// // Import the googleapis library
// import { google } from 'googleapis';
// const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT);

// // Google OAuth2 callback------need to fix the routing (Eddie)---------------
// app.get('/', (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: "https://www.googleapis.com/auth/calendar.readonly"
//     });
//     res.redirect(url);
// });

// app.get('/redirect', (req, res) => {
//     const code = req.query.code;
//     oauth2Client.getToken(code, (err, tokens) => {
//         if (err){
//             console.error('Error retrieving access token', err);
//             res.send('Error');  
//             return;
//         }
//         oauth2Client.setCredentials(tokens);
//         res.send('Successfully logged in');
//     });
// });


// app.get('/calendar', (req, res) => {
//     const calendar = google.calendar({version: 'v3', auth: oauth2Client});
//     calendar.calendarList.list({}, (err,response)=> {
//         if(err){
//             console.error('Error fetching calendar list', err);
//             res.end('Error');
//             return;
//         }
//         const calendars = response.data.items;
//         res.json(calendars);
//     });
// })

// app.get('events',(req,res)=> {
//     const calendarId = req.query.calendar??'primary';
//     const calendar = google.calendar({version: 'v3', auth: oauth2Client});
//     calendar.events.list({
//         calendarId,
//         timeMin: (new Date()).toISOString(),
//         maxResults: 10,
//         singleEvents: true,
//         orderBy: 'startTime'
//     },(err, response)=> {
//         if(err){
//             console.error('calendar event list fetch error');
//             res.end('Error');
//             return;
//         }
//         const events = response.data.items;
//         res.json(events);
//     });
// });

// // --------------------need to fix the routing (Eddie)-----------------------


    )
}

export default Calendar