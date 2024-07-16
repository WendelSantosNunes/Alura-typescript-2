export abstract class View<T> {
    protected elemento: HTMLElement; // protected -> todas as propriedade que herda podera acessa essa variável
    private escapar = false;

    constructor(seletor: string, escapar?: boolean){
        const elemento = document.querySelector(seletor);
        
        if(elemento){
            this.elemento = elemento as HTMLElement;
        }else{
            throw Error(`Seletor ${seletor} não existe no DOM`);
        }
        
        if(escapar){
            this.escapar = escapar;
        }
    }

    // O abstract obrigar as classe implementar esse método
    protected abstract template(model: T): string;

    public update(model: T): void {
        let template = this.template(model);
        if(this.escapar){
            template = template.replace(/<script>[\s\S]*?<script>/, '')
        }
        this.elemento.innerHTML = template;
    }
}