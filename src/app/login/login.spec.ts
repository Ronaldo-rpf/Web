import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';

describe('Tela de login', () => {
  let fixture: ComponentFixture<Login>;
  let pagina: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Login] }).compileComponents();
    fixture = TestBed.createComponent(Login);
    pagina = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  async function preencher(id: string, valor: string): Promise<void> {
    const campo = pagina.querySelector<HTMLInputElement>(`#${id}`)!;
    campo.value = valor;
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
  }

  async function clicar(texto: string): Promise<void> {
    const botao = Array.from(pagina.querySelectorAll('button'))
      .find((elemento) => elemento.textContent?.includes(texto))!;
    botao.click();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('transfere os dados do HTML ao TypeScript e imprime ambos ao clicar em Entrar', async () => {
    await preencher('email', 'aluno@exemplo.com');
    await preencher('senha', 'senha-ficticia-123');

    expect(fixture.componentInstance.email).toBe('aluno@exemplo.com');
    expect(fixture.componentInstance.senha).toBe('senha-ficticia-123');

    await clicar('Entrar');

    expect(console.log).toHaveBeenCalledExactlyOnceWith('Dados do login:', {
      email: 'aluno@exemplo.com', senha: 'senha-ficticia-123',
    });
    expect(pagina.querySelector('[role="status"]')?.textContent).toContain('Dados recebidos');
  });

  it.each([
    ['', ''],
    ['email-invalido', 'senha-ficticia'],
    ['aluno@exemplo.com', ''],
  ])('bloqueia dados inválidos: e-mail "%s", senha "%s"', async (email, senha) => {
    await preencher('email', email);
    await preencher('senha', senha);
    await clicar('Entrar');

    expect(console.log).not.toHaveBeenCalled();
    expect(pagina.querySelector('[aria-invalid="true"]')).not.toBeNull();
    expect(pagina.querySelector('.erro')).not.toBeNull();
  });

  it('mostra e oculta a senha sem enviar o formulário', async () => {
    await preencher('senha', 'senha-ficticia');
    const campo = pagina.querySelector<HTMLInputElement>('#senha')!;
    const botao = pagina.querySelector<HTMLButtonElement>('[aria-controls="senha"]')!;

    expect(campo.type).toBe('password');
    botao.click();
    await fixture.whenStable();
    expect(campo.type).toBe('text');
    expect(botao.getAttribute('aria-label')).toBe('Ocultar senha');
    botao.click();
    await fixture.whenStable();
    expect(campo.type).toBe('password');
    expect(campo.value).toBe('senha-ficticia');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('abre recuperação, valida o e-mail e permite voltar ao login', async () => {
    await clicar('Esqueci a senha');
    await clicar('Recuperar senha');
    expect(console.log).not.toHaveBeenCalled();
    await preencher('email-recuperacao', 'aluno@exemplo.com');
    await clicar('Recuperar senha');

    expect(console.log).toHaveBeenCalledExactlyOnceWith('Recuperação de senha:', {
      email: 'aluno@exemplo.com',
    });
    expect(pagina.textContent).toContain('Esta demonstração não envia e-mails.');
    expect(pagina.querySelector<HTMLInputElement>('#email-recuperacao')?.value).toBe('');
    await clicar('Voltar ao login');
    expect(pagina.querySelector('#senha')).not.toBeNull();
    expect(pagina.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
  });

  it('valida o cadastro e a confirmação de senha antes de receber os dados', async () => {
    await clicar('Criar conta');
    await clicar('Criar conta');
    expect(console.log).not.toHaveBeenCalled();

    await preencher('nome', '   ');
    await preencher('email-cadastro', 'aluno@exemplo.com');
    await preencher('senha-cadastro', '123');
    await preencher('confirmar-senha', '123');
    await clicar('Criar conta');
    expect(console.log).not.toHaveBeenCalled();
    expect(pagina.textContent).toContain('pelo menos 6 caracteres');
    expect(pagina.textContent).toContain('Informe seu nome');

    await preencher('nome', ' Aluno Teste ');
    await preencher('senha-cadastro', 'senha-ficticia');
    await preencher('confirmar-senha', 'senha-diferente');
    await clicar('Criar conta');
    expect(console.log).not.toHaveBeenCalled();
    expect(pagina.textContent).toContain('As senhas precisam ser iguais');

    await preencher('confirmar-senha', 'senha-ficticia');
    await clicar('Criar conta');
    expect(console.log).toHaveBeenCalledExactlyOnceWith('Dados do cadastro:', {
      nome: 'Aluno Teste', email: 'aluno@exemplo.com',
    });
    expect(pagina.textContent).toContain('Esta demonstração não salva uma conta.');
    expect(pagina.querySelector<HTMLInputElement>('#senha-cadastro')?.value).toBe('');
  });

  it('limpa a senha e o estado de visibilidade ao trocar de tela', async () => {
    await preencher('senha', 'senha-ficticia');
    pagina.querySelector<HTMLButtonElement>('[aria-controls="senha"]')!.click();
    await fixture.whenStable();
    await clicar('Criar conta');
    await clicar('Voltar ao login');
    const senha = pagina.querySelector<HTMLInputElement>('#senha')!;
    expect(senha.value).toBe('');
    expect(senha.type).toBe('password');
  });
});
