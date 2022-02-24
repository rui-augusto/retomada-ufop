import { useUser } from "../context/user";

export const Home = () => {

    const { user } = useUser();
    console.log(user);

    const handleInput = () => {
        
    }
    return (
        <div>
            <h1>Você foi autorizado, {user.name}. [{user.role}]</h1>
            <button onClick = {handleInput}>Link</button>
        </div>
    );
}