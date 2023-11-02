export interface users{
    _id: string;
    first_name: string ;
    last_name: string ;
    profile_picture: string ;
    email: string ;
    password: string ;
    salt: string;
    student: any[];
    courses_enrolled: any[];
    courses_created: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    
}