import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { Brasilapi } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule, MatFormField,
    MatLabel,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective
], providers: [
  provideNgxMask()
],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private service: ClienteService,
    private brasilApiService: Brasilapi,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any) => {
      const params = query['params']
      const id = params['id']
      if(id){
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    })

    this.carregarUFs();
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: (listaEstados) =>
        (this.estados = listaEstados.sort((a, b) =>
          a.sigla.localeCompare(b.sigla)
        )),
      error: (erro) => console.log('ocorreu um erro: ', erro),
    });
  }

  salvar(){
    if(!this.atualizando){
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Salvo com sucesso!');
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Atualizado com sucesso!');
    }
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "Ok");
  }
}
