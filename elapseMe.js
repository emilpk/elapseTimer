/******** HEADER ***************************

 Author: Emil Krautmann
 EMAIL: emilpk@gmail.com
 Website: http://ecoders.wordpress.com
 
 Thanks and enjoy!
*******************************************/

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

		var resultOut  = (settings.show == "all" || settings.show.match(/days/gi) ) ? elapsedDays + " Day" + ((elapsedDays == 1) ? " ":"s ") :"";
		resultOut += (settings.show == "all" || settings.show.match(/hours/gi) ) ? elapsedHours + " Hour" + ((elapsedHours == 1) ? " ":"s ") :"";
		resultOut += (settings.show == "all" || settings.show.match(/minutes/gi) ) ? elapsedMinutes + " Minute" + ((elapsedMinutes == 1) ? " ":"s ") :"";
		resultOut += (settings.show == "all" || settings.show.match(/seconds/gi) ) ? elapsedSeconds + " Second" + ((elapsedSeconds == 1) ? " ":"s ") :"";

		document.getElementById(settings.targetId).innerHTML = resultOut;

		if(settings.update)
		{
			t = setTimeout(function(){ elapseTimer(settings)},1000);
		}
	});