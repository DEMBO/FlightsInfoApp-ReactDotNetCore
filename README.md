# FlightsInfoApp-ReactDotNetCore

## Task
It is necessary to develop website to manage flights information. 

## Specification
1. The project should consist of two parts: React website and .NET Core backed api;
2. The website should have a possibility to add new flight information as well as passengers to the flights;
3. The website should show all the flights and passengers related to each flight.

###Flight info
1. Flight number (digits only);
2. Destination.

###Passenger info
1. First Name;
2. Last Name;
3. Id;
4. Flight Class (Economy, Business, First);
5. Ticket Price;
6. Number Of Bags: cannot be more than 1 for Economy and 2 for others;
7. Total Wieght: cannot be more than 30 for First class and 20 for others;
8. Flight Number: there can only be 20 passengers per flight for First Class, 30 for Business and 150 for Economy.