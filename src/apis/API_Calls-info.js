/*
For Tank Koenig API you need an API-KEY !
Your API-KEY should be stored, at the root folder in .env file !

For your location, you can use any map-tool from the internet, for location your home-address
Please change the xxxx and yyyy with your coordinators, if your browser blocked the locations.
Latitude and longitude setup are also in the .env file.

API Key Tankkoenig.de; Tankkoenig Free API Request:
 https://creativecommons.tankerkoenig.de/

Our you can change the source code to static urls:
Tank Koenig API - Gasoline Call:
const BASE_URL = "https://creativecommons.tankerkoenig.de/json/list.php?lat=xxxx&lng=yyyy&rad=4&sort=price&type=diesel&apikey=6edebc65-6d38-c726-f637-e0244f738dab";

Tank Yahoo Finance Oil - API Call:
const stonksUrl = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/BZ=F?modules=price";

Tank Yahoo Finance Natural-Gas - API Call:
const stonksUrl = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/RB=F?modules=price";

Tank Yahoo Finance EURUSD - API Call:
const stonksUrl = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/EURUSD?modules=price";
*/
