## API Details

BaseURL: http://localhost:8080

## ##################################################################### Admin

## Admin SignUp

    URL: /api/Admin/signup  (Post)
    @Access Public

    -Request :It need
             Email*(String),
             Password*(String)
    -Response : And you get success,message,Record(whole Record of Admin Account)

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
"FirstName":"abrar",
"LastName":"khan",
"DOB":"12/12/1999",
"City":"isb",
"Gender":"male",
"Email":"abrara@gmail.com",
"Password":"12345678",
"PhoneNumber":"000000000000000000",
"NationalId":"photo",
"Image":"profilephoto",
"ExpiryDate":"12/12/1999",
"Agency":"61a9ddcb0fbc7c0634f970ac"
}

## Login

URL: api/operator/login (Post)

-requried= {
"Email":"ali@gmail.com",
"Password":"12345678"
}

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

## update Password

URL: api/operator/updatepassword (Post)

-requried= {
"Email":"abrara@gmail.com",
"OldPassword":"12345678",
"NewPassword":"12345"
}

## GetALL Operators
URL: /api/operator/getall (Get)
## GetOne Operator

URL: /api/operator/getone (Post)

-requried= {
	"Id":"61ab3a2fafdff56730bc9d72" (Mongodb ID of a operator You are searching for)
}
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
"Email":"abrarmember@gmail.com",
"Password":"12345678",
"PhoneNumber":"000000000000000000",
"Role":"customer",
"NationalId":"photo",
"Image":"profilephoto",
"ExpiryDate":"12/12/1999",
"Agency":"61a9ddcb0fbc7c0634f970ac",
"Operator":"61a9e0f55dbdae46c022e0fc"
}

## Login

URL: api/member/login (Post)

-requried= {
"Email":"abrara@gmail.com",
"Password":"12345678"
}

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

## update Password

URL: api/member/updatepassword (Post)

-requried= {
"Email":"abrarmember@gmail.com",
"OldPassword":"12345",
"NewPassword":"12345678"
}

## GetAll members

URL: /api/member/getall (Get)

## GetOne members

URL: /api/member/GetOne (Post)
-requried= {
"Email":"abrarmember@gmail.com"
}
## Forget Operator

URL: /api/member/ForgetPassword (Post)

-requried= {
	"Email":"abrarzargai@gmail.com"
	
}
---response: it will automatically generate 9 digit new password and the new password will be send to User on the given Email Address.
## ##################################################################### Products

## Add

URL: /Api/product/Add (Post)

-requried={
"Code":"12342",
"Label":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
"Duration":"monthly",
"Status":"disabled",
"Agency":"61ab3547a132245658cdc560"
}

## Update

URL: /Api/product/update (Post)
(You can update everything in product)
-requried={
"Product":"61ab09eb07f62f4792285d103a", (MongoDB Id)
 "Label": "Product1098123123123",
"Duration":"monthly",
"Status":"disabled",
"Code": 101001
}

## Delete

URL: /Api/product/delete (Post)

-requried={
"Product":"61ab3cc9f16906163cf80354",(Mongodb ID of product)
"Agency":"61ab3547a132245658cdc560", (Mongodb ID of agency in which product is listed)

}

## GETAllProducts

URL: /Api/product/GetAll (GET)


## GetSpecific Product

URL: /api/product/GetOne (Post)

-requried={
    "Id":"61ab461079b0606704df8481" (mongoDB iD of product that you are searching for)
}

## ##################################################################### CashRegisterAgency

## Add New Cash Register For Agency

URL: /Api/CashRegisterAgency/Add (Post)

-requried={
"Code":"12345",
"Label":"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
"Status":"enabled",
"Customer":"61a9f6282b2ced58d8880d00", (mongodb id of member)
"Product":["61a9c840ebd5774c8c5ea138","61a9c849ebd5774c8c5ea139"],(array of mongodb id of products)
"Operator":"61a9e0f55dbdae46c022e0fc",(mongodb id of operator)
"Agency":"61a9ddcb0fbc7c0634f970ac",(mongodb id of agency)
"TransactionType":"debit",
"Currency":"eur",
"CollectionDate":"12-08-2021",
"StartDate":"12-04-2021",
"Amount":21.19
}

## Update Cash Register For Agency

URL: /Api/CashRegisterAgency/update (Post)

-requried={
"CashRegisterAgency":"61ab0f503c28f45af486f3f3",(mongodb id of a cash agency you want to update)
"CollectionDate":"12-10-2021",
"StartDate":"12-04-2021",
"Amount":24.24
}

## Delete a Cash Register For Agency

URL: /Api/CashRegisterAgency/delete (Post)

-requried={
"CashRegisterAgency":"61ab0f503c28f45af486f3f3",(mongodb id of a cash agency you want to delete)

}

## Get ALL data of Cash Register For Agency

URL: /Api/CashRegisterAgency/getall (Get)

## ##################################################################### CashRegisterMember

## Add New Cash Register For Member

URL: /Api/CashRegisterMember/Add (Post)

-requried={
"Code":"12345",
"Label":"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
"Status":"enabled",
"Customer":"61a9f6282b2ced58d8880d00", (mongodb id of member)
"Product":["61a9c840ebd5774c8c5ea138","61a9c849ebd5774c8c5ea139"],(array of mongodb id of products)
"Operator":"61a9e0f55dbdae46c022e0fc",(mongodb id of operator)
"Agency":"61a9ddcb0fbc7c0634f970ac",(mongodb id of agency)
"TransactionType":"debit",
"Currency":"eur",
"CollectionDate":"12-08-2021",
"StartDate":"12-04-2021",
"Amount":21.19
}

## Update Cash Register For Member

URL: /Api/CashRegisterMember/update (Post)

-requried={
"CashRegisterMember":"61ab1b40d99aab6f987ae6f3",(mongodb id of a cash register you want to updated)
"Amount":50.21,
"VerifiedByAdmin":true,
"CancelByAdmin":false,
"CommentByAdmin":""

}

## Delete a Cash Register For Member

URL: /Api/CashRegisterMember/delete (Post)

-requried={
"CashRegisterMember":"61ab1dd8af07c75508db0d16",(mongodb id of a cash register you want to delete)

}

## Get ALL data of Cash Register For Member

URL: /Api/CashRegisterMember/getall (Get)

## ##################################################################### Agency

## Add

URL: /api/agency/add (Post)

-requried={
"Code":123123,
"Label":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"  
}

## GetALL data of Agency

URL: /api/agency/getall (Get)

## GetSpecific Agency

URL: /api/agency/getone (Post)

-requried={
    "Id":"61ab461079b0606704df8481" (mongoDB iD of agency that you are searching for)
}

## Update Agency

URL: /api/agency/update (Post)

-requried={
    "Id":"61ab461079b0606704df8481" (mongoDB iD of agency that you want to update)
    "Code":100101,
    "Label":"sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd",  
}


## ##################################################################### Subscription
## Add Subscription

URL: /Api/Subscription/Add (Post)

-requried={

   "Currency": "eur",
   "OperatorId": "61adc69c31ecbc41b02ac60a",
   "productId":"61b23e9ac336ae0016a153dd",
   "AgencyId": "61ade217361e1700163ca206",
   "MemberId":"61addde3ae3c2c1f14542953",
   "Amount": 20,
   "Duration":"monthly",
   "Status": "open",
   "StartDate":"2021-12-12"
}


## Update Subscription

URL: /Api/Subscription/update (Post)

-requried={
   "Id":"61af3086231e4c33a41845db",(mongodb Id Of a subscription)
   "Status":"approved",
   "Duration":"yearly",
   "Price":240
  
}




















## Subscription GetAllByMember 
URL: /Api/Subscription/GetAllByAgency (Post)

-requried={
    "MemberId":"61ade217361e1700163ca206" (mongodb ID of member)
}
## Subscription GetAllByAgency
URL: /Api/Subscription/GetAllByAgency (Post)

-requried={
    "AgencyId":"61ade217361e1700163ca206" (mongodb ID of agency)
}

## Subscription GetOne 

URL: /Api/Subscription/GetOne (Post)

-requried=
{
    "Id":"61af3086231e4c33a41845db" (mongodb ID of subscription)
}

## ##################################################################### Collection ##

## Add

URL: /Api/Collection/Add (Post)

-requried=
{
    "Code":100001,
    "Customer":"61ab3b2f3dfe7a4644bbac29",
    "CollectionDate":"2021-12-12",
    "Product":"61af1244d348e600160c1554",
    "Agency":"61af7ac2dcfd6b001613d991",
    "Operator":"61ab3a2fafdff56730bc9d72",
    "StartingDate":"2021/12/08"
}















































## Update

URL: /Api/Collection/Add (Post)

-requried=
{   "Id":"61b06bdf63373101c090587f",(mongodb ID of collection account)
    "Code":100001,
    "CollectionDate":"2021-12-12",
    "Status":"pending\closed\working any status"
}















































## GetALL

URL: /Api/Collection/getall (Get)

## GetOne Collection Account

URL: /Api/Collection/getone (Post)

required ={
    "Id":"61b06bdf63373101c090587f"(Id of collection )
}

## GetAll Collection Accounts for specific Agency

URL: /Api/Collection/GetByAgency (Post)

required ={
    "AgencyId":"61af7ac2dcfd6b001613d991"
}

## GetAll Collection Accounts for specific Member

URL: /Api/Collection/GetByMember (Post)

required = {
    "MemberId":"61ab3b2f3dfe7a4644bbac29"
}

## GetAll Collection Accounts for specific Product

URL: /Api/Collection/GetByProduct (Post)

required = {
    "ProductId":"61af1244d348e600160c1554"
}

## GetAll Collection Accounts for specific Operator

URL: /Api/Collection/GetByOperator (Post)

required = {
    "OperatorId":"61ab3a2fafdff56730bc9d72"
}

## GetAll Collection By Date Range

URL: /Api/Collection/GetByDateRange (Post)

required = {
   
    "StartDate":"2021-12-10",
    "EndDate":"2021-12-15"
}
## SettleCollectionAccount / Make a Transaction

URL: /Api/Collection/SettleCollectionAccount (Post)

required = {  
    "MemberId":"61ab3b2f3dfe7a4644bbac29",
    "ProductId":"61af1244d348e600160c1554",
    "CollectionId":"61b06bdf63373101c090587f"
}
## SettleCollectionAccount / Make a Transaction

URL: /Api/Collection/SettleCollectionAccount (Post)

required = {  
    "MemberId":"61ab3b2f3dfe7a4644bbac29",
    "ProductId":"61af1244d348e600160c1554",
    "CollectionId":"61b06bdf63373101c090587f"
}
## CancelTransaction by Admin

URL: /Api/Collection/CancelTransaction (Post)

required = {
    
    "MemberId":"61ab3b2f3dfe7a4644bbac29",
    "ProductId":"61af1244d348e600160c1554",
    "CollectionId":"61b06bdf63373101c090587f",
    "Comment": "Invalid Transaction.Payment already charged"
}













































