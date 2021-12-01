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


## ##################################################################### Agency ## 


## Add New Agency
    URL: /api/Agency/Add  (Post)
    @Access Public
    @Authorized to admin only

    -Request :It need
             Label*(String),
             Role*(String)
    -Response : And you get success,message,Record(whole Record of Agency Account)


## ##################################################################### Cash Register ##


 ## Add New Cash Register
    URL: /api/CashRegister/Add  (Post)
    @Access Public

    -Request :It need
             AccountNo*(String), 
             Status*(String) ['enabled', 'disabled'],
             Currency*(String) ['eur', 'xof'],
             Duration*(String) ['month', 'bimonthly', 'quarter', 'semester', 'annual'],
             Digits*(Number),
             Balance(Number)
    -Response : And you get success,message,Record(whole Record of Cash Register Account)

## Cash Register Status Update
    URL: /api/CashRegister/UpdateStatus  (Post)
    @Access Public
    @Authorized to admin only

    -Request :It need AccountNo*(String), Status*(String),Role*(String)
    -Response : And you get success,message

