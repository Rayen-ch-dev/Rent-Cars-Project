export type  User={
    id:string;
    name:string;
    email:string;
    password:string;
    image:string;
    accounts:Account[];
    sessions:Session[];
    role:UserRole;
    bookings:Booking[];
}
export type Account={
    id:string;
    userId:string;
    type:string;
    provider:string;
    providerAccountId:string;
    refresh_token:string;
    access_token:string;
    expires_at:number;
    token_type:string;
    scope:string;
    id_token:string;
    session_state:string;
}
export type Session={
    id:string;
    sessionToken:string;
    userId:string;
    expires:Date;
}   
export type UserRole="ADMIN"|"USER";
export type Booking={
    id:string;
    userId:string;
    carId:string;
    date:Date;  
}