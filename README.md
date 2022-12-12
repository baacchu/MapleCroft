# Maplecroft Frontend Development Test

## Quick Start

```
npm install
ng build
ng serve
```

## Implementation
All the 5 requirements have been satisfied/implemented. 
1.Issue Fix - Done.
Having look at the issue for France, Norway and other countries not displaying the data, it appears to be data issue rather then a coding error.
Again, there is a difference between France & Norway data.
For France,  
	    Issue : ISO_A2 has value -99 for which no corresponding exists in [data.json]
	    Fix   : I have changed the value of properties ISO_A2='FR' in [ne_110m_admin_0_countries.json] for France, which has corresponding data in [data.json]	

For Norway,
	    Issue : (i) ISO_A2 has value -99 for which no corresponding exists in [data.json]	
			(ii) [data.json] has value no value which could be be mapped to Norway.
	    Fix   : Made an assumption that within [data.json], "NO" represents Norway.(In ideal situation, would like to go back to business and confirm the details)
			Next, changed the value of properties ISO_A2='NO' in [ne_110m_admin_0_countries.json] for Norway, so that it has corresponding data in [data.json]

Other countries :
	    Issue : Within [data.json], score field(property) is missing in [data.json]
	    Fix : As of now, made the change in code to display the message "Country Name : Missing Data".
		    Now, the check for entitled boolean overrides this message with 'No data available for ${countryName}'						

2. Separate service implementation - Done.
3. Hide entitled =false - Done. Example russia
4. Test Cases - Done
5. Suggestions - Done.


What could be improved?
1.Move the [globe] as more generic component, which could accept different dataset as input.So that, if needed it could be 
  be used at more than one place without duplicating the code. Also, this will move all globe related functionalities in separate class/component instead of app.component.
2.Added validation and appropriate message to display the globe . On some countries, when data is not found it was throwing error.(visible in browser console)
3.On hover display message near the respective country rather than at the right hand corner.
4.Moved the global function getScoreColour() to helper service. 
5.Believe there is not need of Ramda library just to check is null, unless if it is needed for something else more obvious.

