declare enum EGender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class UserEntity {
    id: string;
    name: string;
    age: number;
    gender: EGender;
    problems: boolean;
}
export {};
