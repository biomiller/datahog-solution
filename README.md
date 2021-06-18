# datahog-solution

Solution submission to the Wonderbill datahog task as outlined here: https://bitbucket.org/wonderbill/datahog/src/master/

To deploy the solution:
    - Install the necessary dependencies using `npm install`
    - Run the datahog server using `docker-compose up -d`
    - Run the solution server using `npm run start` (this will both build and deploy)

The solution server will deploy at `http://localhost:3001`

To retreive data from the solution send a POST request to `http://localhost:3001/getData` with json payload, for example:
```
{
    "provider":"gas",
    "callbackUrl":"/result"
}
```

The provider data will be retrieved from the datahog-server and made available at the specified callback url e.g. `http://localhost:3001/result`

## Tests

Happy path integration tests can be run using `npm run test`

## Improvements TO-DO
    - Sad path integration tests
    - Ability to accept multiple providers at once
    - Unit tests for makeRequest function
    - Improve integration tests as data has not sometimes been sent to the callbackUrl endpoint when the tests are invoked resulting in false negative test failures
    - Make callbackUrl a point of failure
