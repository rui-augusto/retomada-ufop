import { useUser } from "../context/user";

export const Home = () => {

    const { user } = useUser();
    console.log(user);

    return (
        <div>
            <h1>Você foi autorizado.</h1>
        </div>
    );
}