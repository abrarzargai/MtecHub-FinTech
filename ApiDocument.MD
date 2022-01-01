## API Details

BaseURL: http://localhost:8080
BaseURL: https://fintechapp-mtechub.herokuapp.com/ (Deployed)


## ##################################################################### Admin

## Admin SignUp

    URL: /api/Admin/signup  (Post)
    @Access Public

    -Request :It need
             Email*(String),
             Password*(String)
    -Response : And you get success,message,Record

## Admin Login

    URL: /api/Admin/login  (Post)
    @Access Public

    -Request :It need
             Email*(String),
             Password*(String)
    -Response : And you get success,message,token,Record(whole Record of Admin Account)

## Admin UpdatePassword

    URL: /api/Admin/updatepassword  (Post)
    @Access Public

    -Request :It need
             Email*(String),
             OldPassword*(String),
             NewPassword*(String)
    -Response : And you get success,message

## ##################################################################### Email

## Send Email to a User

    URL: /api/auth/Email (Post)
    @Access Public

    -Request :It need
             Email*(String),
             Code*(Number)
    -Response : And you get success,message

## ##################################################################### Operator

## Signup

URL: api/operator/signup (Post)

-requried={
    "FirstName":"FirstName",
    "LastName":"LastName",
    "DOB":"12/27/2021",
    "City":"City",
    "Email":"abrarzargai@gmail.com",
    "Gender":"male",
    "Password":"operator@gmail.com",
    "PhoneNumber":"0987654321",
    "NationalId":"NationalIdImage",
    "ExpiryDate":"12/27/2021",
    "Image":"Image",
    "AgencyId":"61c99918a2a1e916fc9dbccc"
}

-Response : And you get success,message,Record
## Login

URL: api/operator/login (Post)

-requried= {
"Email":"ali@gmail.com",
"Password":"12345678"
}

-Response : And you get success,message,token,Record
## update

URL: api/operator/update (Post)

-requried= {
"FirstName":"abrar zargai",
"LastName":"khan",
"DOB":"12/12/1999",
"City":"isb",
"Email":"abrara@gmail.com",
"PhoneNumber":"0000000000000000001",
"NationalId":"photo1",
"ExpiryDate":"12/12/1999"
}
-Email is must in update all other values are depend user want to update
-Response : And you get success,message,Record
## update Password

URL: api/operator/updatepassword (Post)

-requried= {
"Email":"abrara@gmail.com",
"OldPassword":"12345678",
"NewPassword":"12345"
}
-Response : And you get success,message
## GetALL Operators
URL: /api/operator/getall (Get)
## GetOne Operator

URL: /api/operator/getone (Post)

-requried= {
	"Id":"61ab3a2fafdff56730bc9d72" (Mongodb ID of a operator You are searching for)
}

-Response : And you get success,message
## ForgetPassword of Operator

URL: /api/operator/ForgetPassword (Post)

-requried= {
	"Email":"abrarzargai@gmail.com"
	
}
---response: it will automatically generate 9 digit new password and the new password will be send to User on the given Email Address.

## ##################################################################### Member

## Signup

URL: api/member/signup (Post)

-requried={
"FirstName":"abrar",
"LastName":"khan",
"DOB":"12/12/1999",
"City":"isb",
"Gender":"male",
"Email":"abrar@gmail.com",
"Password":"12345678",
"PhoneNumber":"000000000000000000",
"NationalId":"photo",
"Image":"profilephoto",
"ExpiryDate":"12/12/1999",
"Agency":"61c99918a2a1e916fc9dbccc",
"Operator":"61c99c8bdc91e42e3c51f215"
}
-Response : And you get success,message,Record

## Login

URL: api/member/login (Post)

-requried= {
"Email":"abrara@gmail.com",
"Password":"12345678"
}

-Response : And you get success,message,token,Record
## update

URL: api/member/update (Post)

-requried= {
"FirstName":"abrar",
"LastName":"khan",
"DOB":"12/12/1999",
"City":"isb",
"Email":"abrarmembe1r@gmail.com",
"PhoneNumber":"0000000000000000001213",
"NationalId":"photo",
"ExpiryDate":"12/12/1999"
}
-Email is must in update all other values are depend user want to update
-Response : And you get success,message,Record
## update Password

URL: api/member/updatepassword (Post)

-requried= {
"Email":"abrarmember@gmail.com",
"OldPassword":"12345",
"NewPassword":"12345678"
}
-Response : And you get success,message

## GetAll members

URL: /api/member/getall (Get)

-Response : And you get success,message,Record
## GetOne members

URL: /api/member/GetOne (Post)
-requried= {
"Email":"abrarmember@gmail.com"
}
-Response : And you get success,message,Record
## Forget Password

URL: /api/member/ForgetPassword (Post)

-requried= {
	"Email":"abrarzargai@gmail.com"
	
}
---response: it will automatically generate 9 digit new password and the new password will be send to User on the given Email Address.
-Response : And you get success,message,Record
## ##################################################################### Products

## Add

URL: /Api/product/Add (Post)

-requried={
"Code":"12345",
"Label":"xxxxxxxxxxxxxxRRRxxxxxxxxxxxxxx",
"Duration":"monthly",
"Status":"enabled",
"Agency":"61c99918a2a1e916fc9dbccc",
"Operator":"61c99c8bdc91e42e3c51f215",
"Price":23.32
}

-Response : And you get success,message,Record
## Update

URL: /Api/product/update (Post)

-requried={
"ProductId":"61cab3bfcbf5312e846d478f",
 "Label": "Product1098123123123",
"Duration":"monthly",
"Status":"disabled",
"Code": 101001
}
-ProductId is must all other values are depend user want to update
-Response : And you get success,message
## Delete

URL: /Api/product/delete (Post)

-requried={
"ProductId":"61ab3cc9f16906163cf80354",(Mongodb ID of product)
"AgencyId":"61ab3547a132245658cdc560", (Mongodb ID of agency in which product is listed)

}
-Response : And you get success,message
## GETAllProducts

URL: /Api/product/GetAll (GET)
-Response : And you get success,message,Record

## GetSpecific Product

URL: /api/product/GetOne (Post)

-requried={
    "ProductId":"61ab461079b0606704df8481" (mongoDB iD of product that you are searching for)
}

-Response : And you get success,message,Record

## ##################################################################### Agency

## Add

URL: /api/agency/add (Post)

-requried={
"Code":123123,
"Label":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"  
}

-Response : And you get success,message,Record
## GetALL data of Agency

URL: /api/agency/getall (Get)
-Response : And you get success,message,Record
## GetSpecific Agency

URL: /api/agency/getone (Post)

-requried={
    "Id":"61ab461079b0606704df8481" (mongoDB iD of agency that you are searching for)
}

-Response : And you get success,message,Record
## Update Agency

URL: /api/agency/update (Post)

-requried={
    "Id":"61ab461079b0606704df8481" (mongoDB iD of agency that you want to update)
    "Code":100101,
    "Label":"sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd",  
}

-Response : And you get success,message,Record

## ##################################################################### Subscription
## Add Subscription

URL: /Api/Subscription/Add (Post)

-requried={

"Code":"0102",
  "Name":"Item-1",
  "Amount":20.34,
  "Duration":"monthly",
  "Status":"open",
  "StartDate":"12/28/2021",
  "EndDate":"12/230/2021",
  "Product":"61cab3bfcbf5312e846d478f",
  "Member":"61caae7e350f301008dbdb42",
  "Operator":"61c99c8bdc91e42e3c51f215",
  "Agency":"61c99918a2a1e916fc9dbccc"
}
-Response : And you get success,message,Record

## Update Subscription

URL: /Api/Subscription/update (Post)

-requried={
 "SubscriptionId":"0102",
  "Code":"0102",
  "Name":"Item-1",
  "Amount":20.34,
  "Duration":"monthly",
  "Status":"open",
  "StartDate":"12/28/2021",
  "EndDate":"12/230/2021"
}
-SubscriptionId is must all other data depends on user wants to update
-Response : And you get success,message
## Subscription GetAllByMember 
URL: /Api/Subscription/GetAllByAgency (Post)

-requried={
    "MemberId":"61ade217361e1700163ca206" (mongodb ID of member)
}
-Response : And you get success,message,Record
## Subscription GetAllByAgency
URL: /Api/Subscription/GetAllByAgency (Post)

-requried={
    "AgencyId":"61ade217361e1700163ca206" (mongodb ID of agency)
}
-Response : And you get success,message,Record
## Subscription GetAllByOperator
URL: /Api/Subscription/GetAllByOperator (Post)

{
  "OperatorId":"61c99c8bdc91e42e3c51f215" (Mongodb id of operator)

}
-Response : And you get success,message,Record
## Subscription GetOne 

URL: /Api/Subscription/GetOne (Post)

-requried=
{
    "SubscriptionId":"61af3086231e4c33a41845db" (mongodb ID of subscription)
}
-Response : And you get success,message,Record
## ##################################################################### Collection ##

## Add Collection Account

URL: /Api/Collection/Add (Post)

-requried=
{
"Amount":100.19,
"Customer":"61caae7e350f301008dbdb42",
"CollectionDate":"10/28/2021",
"Subscription":"61cab8c1bdfa7307281fba6c",
"Agency":"61c99918a2a1e916fc9dbccc",
"Operator":"61c99c8bdc91e42e3c51f215",
"Product":"61cab3bfcbf5312e846d478f"
}
-Response : And you get success,message,Record

## GetAllCollectionByAgency / if user want to check the all collection accounts under specific agency

URL: /api/Collection/GetByAgency (Post)

-requried=
{
"AgencyId":"61c99918a2a1e916fc9dbccc"
}
-Response : And you get success,message,Record
## GetAllCollectionByMember / if user want to check the all collection accounts under specific member

URL: /api/Collection/GetByMember (Post)

-requried=
{
"MemberId":"61c99918a2a1e916fc9dbccc"
}
-Response : And you get success,message,Record
## GetAllCollectionByProduct / if user want to check the all collection accounts under specific Product

URL: /api/Collection/GetByProduct (Post)

-requried=
{
"ProductId":"61c99918a2a1e916fc9dbccc"
}
-Response : And you get success,message,Record
## GetAllCollectionByOperator / if user want to check the all collection accounts under specific Operator

URL: /api/Collection/GetByOperator (Post)

-requried=
{
"OperatorId":"61c99918a2a1e916fc9dbccc"
}
-Response : And you get success,message,Record
## GetAllCollectionByDateRange / if user want to check the all collection accounts under specific DateRange

URL: /api/Collection/GetByDateRange (Post)

-requried=
{
"StartDate":"10/01/2021",
"EndDate":"11/01/2022"
}
-Response : And you get success,message,Record

## GetAllCollections Account

URL: /api/Collection/Getall (Get)

-Response : And you get success,message,Record

## GetAllCollections  For Day to Collect From User (User For Manage Collection Page)
    (this api is used in ManageCollection Page to display the record of collection for today)

URL: /api/Subscription/GetQuerry (Post)

-Request:{
  "OperatorId":"61c99c8bdc91e42e3c51f215",(MongoDb ID of Operator)
  "Date":"10/02/2021",(Today's Date)

}
-Response : And you get success,message,Record

## GetAllcollectedAmount ByMember&Subscription (User For Manage CashRegister Page)
    (this api is used when operator want's to see collected amount agains memeber and subscription)

URL: /api/Collection/GetByMemberSubscription (Post)

-Request:{
"OperatorId":"61c99c8bdc91e42e3c51f215",(MongoDb of Operator)
"MemberId":"61caae7e350f301008dbdb42", (MongoDb of Member)
"SubscriptionId":"61cea4c5cb82671f24d10699" (MongoDb of Subscription)

}
-Response : And you get success,message,Record
