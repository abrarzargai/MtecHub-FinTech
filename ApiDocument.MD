## API Details 

 BaseURL: http://localhost:8080

## ##################################################################### Admin ##

##  Admin SignUp
    URL: /api/Admin/signup  (Post)
    @Access Public

    -Request :It need
             Email*(String), 
             Password*(String)
    -Response : And you get success,message,Record(whole Record of Admin Account)
    
 ##  Admin Login
    URL: /api/Admin/login  (Post)
    @Access Public

    -Request :It need
             Email*(String), 
             Password*(String)
    -Response : And you get success,message,token,Record(whole Record of Admin Account)   

 ##  Admin UpdatePassword
    URL: /api/Admin/updatepassword  (Post)
    @Access Public

    -Request :It need
             Email*(String), 
             OldPassword*(String),
             NewPassword*(String)
    -Response : And you get success,message     


## ##################################################################### Email ##


 ## Send Email to a User
    URL: /api/auth/Email (Post)
    @Access Public

    -Request :It need
             Email*(String), 
             Code*(Number) 
    -Response : And you get success,message

## ##################################################################### Operator ##


 ## Signup
   URL: api/operator/signup (Post)

  -requried={
	"FirstName":"abrar",
	"LastName":"khan",
	"DOB":"12/12/1999",
	"City":"isb",
	"Email":"abrara@gmail.com",
	"Password":"12345678",
	"PhoneNumber":"000000000000000000",
	"NationalId":"photo",
	"ExpiryDate":"12/12/1999",
	"Agency":"61a9ddcb0fbc7c0634f970ac"
}


 ## Login
   URL: api/operator/login (Post)

  -requried= {
	"Email":"abrara@gmail.com",
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


## ##################################################################### Member ##


 ## Signup
   URL: api/member/signup (Post)

  -requried={
	"FirstName":"abrar",
	"LastName":"khan",
	"DOB":"12/12/1999",
	"City":"isb",
	"Email":"abrarmember@gmail.com",
	"Password":"12345678",
	"PhoneNumber":"000000000000000000",
	"Role":"customer",
	"NationalId":"photo",
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

## ##################################################################### Products ##


 ## Add
   URL: /Api/product/Add (Post)

  -requried={
    "Code":"12342",
    "Label":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "Duration":"monthly",
    "Status":"disabled"
}

## Update
   URL: /Api/product/update (Post)

  -requried={
     "Product":"61ab09eb07f62f4792285d103a", (MongoDB Id)
    "Duration":"yearly",
    "Status":"enabled"
}

## GETAllProducts
   URL: /Api/product/GetAll (GET)


## ##################################################################### CashRegisterAgency ##


## Add New Cash Register For Agency
URL: /Api/CashRegisterAgency/Add (Post)

  -requried={
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

  

## ##################################################################### CashRegisterMember ##


## Add New Cash Register For Member
URL: /Api/CashRegisterMember/Add (Post)

  -requried={
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

## ##################################################################### Agency ##


 ## Add
   URL: /api/agency/add (Post)

  -requried={
    "Code":123123,
    "Label":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"  
}
