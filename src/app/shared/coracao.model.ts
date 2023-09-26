export class Coracao {
    constructor(
        public cheio: boolean,
        public urlCoracaoCheio: string = '/assets/cheio.jpeg',
        public urlCoracaoVazio: string = '/assets/vazio.jpeg'
    ){}

    public exibeCoracao(): string {
        if (this.cheio){
            return this.urlCoracaoCheio
        }else{
            return this.urlCoracaoVazio
        }
    }
}