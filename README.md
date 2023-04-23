# An example ReactJS-App, to compare gasoline to oil prices of the stock exchange (v.0.1.1).

## Needed tools:

MySQL Database - Use gasolinevsoilprices.sql for datatable import of structur,
Change the backend for current connection datas of your Database and Server.

## Included tools:

backend - Connection to your Database Server (Port: 8800).
corsproxy - For API Calls (Port: 8080).
frontend - Visualization of information (Port: 3000).
DBresults.xlsx - An example for use this Data inside Microsoft-Excel {data-connection should be updated with your
configuration}.

# Additional Information:

You need edit in the root App-Folder following files
\.env
With following entries:
REACT_APP_TANKKOENIG_API_KEY={Your API-Key from Tank Koenig}
REACT_APP_LATITUTE={Your Position - Latitute as decimal with . }
REACT_APP_LONGITUTE={Your Position - Longitute as decimal with . }

Remark:
The position are needed, because the most PC browsers block the locations from standard configuration.
On a Phone App is this in normal case not needed.

You need to create in the backend Folder following File/Folder:
\backend\data\database\
\backend\data\logs\

You need edit in the backend Folder following File:
\backend\index.js with following entries:
const db = mysql.createConnection({
host: "hostname or IP-address",
user: "username",
password: "userpassword",
database: "dbname",
});

# The Idea behind is:

An clear view of the history of gasoline price vs oil price.
So that you can see how the two prices behave in relation gasoline prices vs oil prices.
The Natural GAS Price are "nice to have" !

## License:

MIT
