interface UserLogin {

    id: number;
    nomeu: string;
    usuario: string;
    senha: string;
    token?: string | null
}

export default UserLogin;