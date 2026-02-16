import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule, MatFormField,
    MatLabel,
    MatInputModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

}
