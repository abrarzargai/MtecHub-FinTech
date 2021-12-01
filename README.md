# Node.js, Express and MongoDB Project Structure 
This is a basic project structure to help you to start building your own RESTful web APIs (for Android, IOS, or JavaScript frameworks) using Express framework and MongoDB with a good structure practices based on clean MVC Architecture.

-------------------------------Project FinTech----------------------------------------
# Node.js, Express and MongoDB Project Structure 
This is a basic project structure to help you to start building your own RESTful web APIs (for Android, IOS, or JavaScript frameworks) using Express framework and MongoDB with a good structure practices based on clean MVC Architecture.

-----------------------------------------------------------------------
## Admin --x--
-email (string)
-password (string)

## Agency --x--
-CashRegister ['debit','credit] (Enum)
-Products [] (Array of mongoseID) refo product--------------
-Operator (MongodbID-ref to Operator-single)--------------
-Label (string) 5 digits numbers+20 digits string {/[0-9]{5}-[a-zA-Z][0-9]{20}/}
-

## CashRegister --x--
-AccountNo (string)  20 alpha {/[a-zA-Z][0-9]{20}/}
-Digits 3digits
-Duration  ['month','bimonthly','quarter','semester','annual'] (Enum)
-status		['enabled','disabled'] (Enum)
-Balance (Number) default (0.00)
-Currency ['eur','xof']

## Operator
-Name (string)
-members [] (Array of mongoseID)-refto Member------------

## Member
-firstname (string)
-lastname (string)
-dob (Date)
-city (string)
-email (string)
-phone (string)
-sex ['male,'female'] (enum)
-pass (string) default-1234
-role ['customer','collector']
-NationalId (string) image-url
-expiry date (Date)
-subscriptions [] (Array of mongoseID-ref to product)------------------
-transaction [] (Array of mongoseID-ref to transaction)------------------
-CashRegister (MongoId- ref to Cash Register)---------------

## products
-Name (string)
## transaction
-Amount (Numbers)
-Label (string)  20 alpha {/[a-zA-Z]{20}/}
-Time (MongodbTimeStemp)
-Operation Type ['debit'.'credit']
-status ["verified","pending","rejected"] (enum) can deal by admin
-comments (string) admin can leave comment why it got canceled/rejected
-----------------------------------------------------------------------
## ******* Apis ********
## Admin
-Admin can create multiple Agencies --x--
-Admin will mange each agency 
-admin can create cash register --x--
-can modify cash register only updated label status --x--
-can view any transaction
-if admin think that transaction is invalid it can be canceled
## operator
-can edit member info
-can subscribe to the product of member

## Member
-can see listed if subscribe products
-member cash register will be created upon subscription

-
-

