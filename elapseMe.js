/* HEADER

 Author: Emil Krautmann
 EMAIL: emilpk@gmail.com
 Copyright 2010

 Description:
 This is a countup script from a specific date.  It shows the days, hours, minutes and seconds that have elapsed since the provided start date.

 To use, simply add this script to the head section of your web page.
 
 E.g.
 
 <script type="text/javascript" src="elapseMe.js"></script>

 Next, in the head section and after the above definition, you use this function as follows: 	

<script type="text/script">	
 window.onload = function()
 {
	elapseMe({ 
		   year: 2010, 
		   month: 5,
		   day: 21,
		   targetId:"elapsedTime"
		 });			
 }
 </script>

 As you can see, we can pass in some optional settings.  The above defines the starting date from which the time elapses as well as the id of the html element that will display the elapsed time.

 Here is the complete list of options available:

 year - four digit year. Default is the current year for the time right now.
 month - must be between 0 and 11 (0 being January and 11 being December). Default is the current month for right now.
 day - the day of the month from 1 - 31. Default is the current day for right now.
 hr - the hour of the day from 0 - 23. Default is the current hour for right now. 
 min - the minute of the hour from 0 - 59. Default is the current minutes for right now.
 sec - the seconds of the minute from 0 - 59. Default is the current seconds for right now.
 targetId - the id of html element to display elapsed time. Default is "elapsedTime".
 update - set to false if you do not want the elapsed time to tick over each second. Default is true.
 show - use this to define a list of values you want shown in the resulting elapsed time output. The default for this is "all" and will shows the days, hours, minutes and seconds elapsed.

	To only show specific elapsed values, set this to a list of the values you want shown.  

	Eg show : "days" - will only show the days elapsed. 
	Eg show : "hours,minutes" - will only show the hours and minutes elapsed

	The available show values are "days,hours,minutes,seconds,all". 	

 Some example calls:

 1. elapseMe(); //this shows the elapsed time from right now and places the output in an html element with id of "elapsedTime".
 2. elapseMe({year: 2010, month: 5,day: 21,targetId:"elapsedTime1"}); //this shows the elapsed time from the 21st May 2010 and the output goes into element with id "elapsedTime1".
 3. elapseMe({year: 2006, month: 5,day: 21,targetId:"elapsedTime2", update : false, show: "days" }); //this is similiar to 2 above but this time we do not want the seconds ticking over and we only want to see the days elapsed.

 REMEMBER, to display the elapsed time, you need to create an element in the body of the page with the id you entered.  E.g. for 1 above, you could have <div id="elapsedTime"></div> defined in the body section of your webpage.


 Tip: This script can also be used for count downs. Just set the starting date details to a future date (eg the upcoming new years day).	

 That's it!
 
 You may use this script as long as this header remains intact.

 Thanks and enjoy!
*/


var elapseMe = 	(function elapseTimer(settings)
	{
		var d = new Date();
		var defaults = {year: d.getFullYear(), month: d.getMonth(), day: d.getDate(), hr:d.getHours(), min: d.getMinutes(), sec: d.getSeconds(), targetId: "elapsedTime", update : true, show : "all"};
			
		if(typeof settings == "undefined") { settings = {}; }

		/*if some settings are omitted, reset those to the default ones.*/
		for(var i in defaults) { settings[i] = (typeof settings[i] == "undefined") ? defaults[i] : settings[i]; }


		var startDate = new Date();

		startDate.setYear(settings.year);
		startDate.setMonth(settings.month);
		startDate.setDate(settings.day);
		startDate.setHours(settings.hr);
		startDate.setMinutes(settings.min);
		startDate.setSeconds(settings.sec);
		var rightNow = new Date();

		/* Get elapsed time. */
		var elapsedTime = rightNow.getTime() - startDate.getTime();

		/* Get 1 day in milliseconds, ie 1000*60*60*24 */
		var one_day =  86400000;
		var elapsedDays = Math.floor( elapsedTime / one_day );

		/* Milliseconds still unaccounted for - less than a day's worth. */
		var milliSecondsRemaining = elapsedTime % one_day;

		/* Get 1 hour in milliseconds, ie 1000*60*60 */
		var one_hour = 3600000;
		var elapsedHours = Math.floor(milliSecondsRemaining / one_hour );

		/* Milliseconds still unaccounted for - less than an hour's worth. */
		milliSecondsRemaining = milliSecondsRemaining % one_hour;

		/* Get 1 minute in milliseconds, ie 1000*60 */
		var one_minute = 60000;
		var elapsedMinutes = Math.floor(milliSecondsRemaining / one_minute );

		/* Milliseconds still unaccounted for - less than a minute's worth. */
		milliSecondsRemaining = milliSecondsRemaining % one_minute;

		/* Get 1 second in milliseconds */
		var one_second = 1000;
		var elapsedSeconds = Math.round(milliSecondsRemaining / one_second);

		resultOut  = (settings.show == "all" || settings.show.match(/days/gi) ) ? elapsedDays + " Day" + ((elapsedDays == 1) ? " ":"s ") :"";
		resultOut += (settings.show == "all" || settings.show.match(/hours/gi) ) ? elapsedHours + " Hour" + ((elapsedHours == 1) ? " ":"s ") :"";
		resultOut += (settings.show == "all" || settings.show.match(/minutes/gi) ) ? elapsedMinutes + " Minute" + ((elapsedMinutes == 1) ? " ":"s ") :"";
		resultOut += (settings.show == "all" || settings.show.match(/seconds/gi) ) ? elapsedSeconds + " Second" + ((elapsedSeconds == 1) ? " ":"s ") :"";

		document.getElementById(settings.targetId).innerHTML = resultOut;

		if(settings.update)
		{
			t = setTimeout(function(){ elapseTimer(settings)},1000);
		}
	});