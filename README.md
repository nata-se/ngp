
## This is a solution for NGP Van Coding Problem.

Please, create a file named 'credentials.json' with your API credentials. The file has the following format:

```json
{
    "username": "apiuser",
    "password": "XXXXXXX-XXXX-XXXX-XXXX-XXXXXXX"
}
```

The file is excluded by .gitignore so it is not checked in.


To run the solution code, please, run `node ngpvan.js ` in terminal (assuming you have node.js) 

Email report result is saved to EmailReport.csv.

Note that I couldn't meet the last requirement (Finally, you should include the name of the variant associated with that email that has the highest percentage-based performance on Opens.) 

 Variant object returned from API appears to be changed and contains no information on variant percentage-based performance on Opens. It has suspitious  "emailMessageId": 0 and variant ID, but no performance data.
 


