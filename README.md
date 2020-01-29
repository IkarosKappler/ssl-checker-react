# ssl-checker-react
Approach for a tiny app that checks your SSL certificate statuses.

## Adding new certificate/host records to the directory
~~~bash
 cd bin-sh
 ./get-ssl-info.sh <hostname>
~~~
This will add a new json file to the data directory and this can be loaded into the app.
