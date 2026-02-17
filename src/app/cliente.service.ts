import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() {}

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {

    const clientes = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }

    const normalizar = (texto: string) =>
    texto
      .toLowerCase()
      //Essa parte separa os acentos das letras.
      .normalize("NFD")
      //Regex
      //Remova todos os caracteres de acento Unicode.
      .replace(/[\u0300-\u036f]/g, "");

    const busca = normalizar(nomeBusca);

    return clientes.filter(cliente =>
    cliente.nome && normalizar(cliente.nome).includes(busca)
    );
  }

  buscarClientePorId(id: string) : Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  private obterStorage() : Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
