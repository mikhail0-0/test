export declare class UsersService {
    private readonly userRepository;
    private readonly problemsCoundSemaphore;
    getProblemsCount(): Promise<number>;
    falseProblems(): Promise<void>;
}
