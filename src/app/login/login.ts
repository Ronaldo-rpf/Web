import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

type Tela = 'login' | 'recuperar' | 'cadastro';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  tela: Tela = 'login';
  email = '';
  senha = '';
  emailRecuperacao = '';
  cadastro = { nome: '', email: '', senha: '', confirmarSenha: '' };
  mostrarSenha = false;
  mensagem = '';

  readonly textos = {
    login: {
      titulo: 'Acesse sua conta.',
      descricao: 'Que bom ter você de volta! Entre para continuar.',
    },
    recuperar: {
      titulo: 'Esqueceu a senha?',
      descricao: 'Tudo bem. Informe o e-mail associado à sua conta.',
    },
    cadastro: {
      titulo: 'Vamos começar?',
      descricao: 'Preencha seus dados para criar sua conta.',
    },
  };

  private readonly titulo = viewChild<ElementRef<HTMLHeadingElement>>('titulo');

  entrar(formulario: NgForm): void {
    this.mensagem = '';
    if (!this.validar(formulario)) return;

    const dadosLogin = { email: this.email, senha: this.senha };

    console.log('Dados do login:', dadosLogin);
    this.mensagem = 'Dados recebidos com sucesso!';
  }

  recuperarSenha(formulario: NgForm): void {
    this.mensagem = '';
    if (!this.validar(formulario)) return;

    console.log('Recuperação de senha:', { email: this.emailRecuperacao });
    this.mensagem = 'Solicitação recebida! Esta demonstração não envia e-mails.';
    formulario.resetForm({ emailRecuperacao: '' });
  }

  criarConta(formulario: NgForm): void {
    this.mensagem = '';
    if (!this.validar(formulario) || this.cadastro.nome.trim().length === 0) return;
    if (this.cadastro.senha !== this.cadastro.confirmarSenha) return;

    console.log('Dados do cadastro:', {
      nome: this.cadastro.nome.trim(),
      email: this.cadastro.email,
    });
    formulario.resetForm({ nome: '', emailCadastro: '', senhaCadastro: '', confirmarSenha: '' });
    this.mensagem = 'Cadastro recebido! Esta demonstração não salva uma conta.';
  }

  mudarTela(tela: Tela): void {
    this.tela = tela;
    this.mensagem = '';
    this.mostrarSenha = false;
    this.email = '';
    this.senha = '';
    this.emailRecuperacao = '';
    this.cadastro = { nome: '', email: '', senha: '', confirmarSenha: '' };
    this.titulo()?.nativeElement.focus();
  }

  private validar(formulario: NgForm): boolean {
    formulario.control.markAllAsTouched();
    if (formulario.invalid) {
      return false;
    }
    return true;
  }
}
