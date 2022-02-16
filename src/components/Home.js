import { useUser } from "../context/user";

export const Home = () => {

    const { user } = useUser();
    console.log(user);

    const handleInput = () => {
        if (user.role == 'coordenacao'){
            window.location.replace('https://www.google.com/');
        }
        else if(user.role == 'analista'){
            window.location.replace('https://firebase.google.com/docs?authuser=1');
        }
        else if(user.role == 'entrevistador'){
            window.location.replace('https://www.linkedin.com/in/rui-augusto-b638321b7/');
        }
    }
    return (
        <div>
            <h1>Você foi autorizado, {user.name}. [{user.role}]</h1>
            <button onClick = {handleInput}>Link</button>
        </div>
    );
}