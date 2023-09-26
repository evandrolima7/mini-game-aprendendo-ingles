import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase: ';
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.rodadaFrase = this.frases[this.rodada];
  }

  ngOnInit() {}

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {
      // Trocar pergunta da rodada
      this.rodada++;

      // Progresso
      this.progresso = (this.rodada / this.frases.length) * 100;

      if (this.rodada === this.frases.length) {
        this.encerrarJogo.emit('Vitoria');
      }

      // Atualiza o objeto rodadaFrase
      this.rodadaFrase = this.frases[this.rodada];

      // Limpar a resposta do usuário
      this.resposta = '';
    } else {
      // Diminuir a variável tentativas
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('Derrota');
      }
    }
  }
}
