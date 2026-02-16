import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Cliente } from './cliente';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule, MatFormField,
    MatLabel,
    MatInputModule,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  cliente: Cliente = Cliente.newCliente();

  salvar(){
    console.log("Dados Cliente: ", this.cliente);
  }
}
