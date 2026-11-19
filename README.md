# EmbarcaAí

Painel web para a **Secretaria Municipal de Saúde** reduzir faltas em consultas com especialistas e aproveitar melhor os lugares nas vans da prefeitura.

Projeto da **Global Solution 2026/2 · FIAP** (tema **CitizenTech**), disciplina de Front-End Design Engineering. Turma 1TDSPW.

## Objetivo

Muita gente marca consulta com especialista e falta sem avisar: a vaga fica vazia e quem espera na fila continua esperando. Em cidades pequenas, a van da prefeitura leva os pacientes ao hospital da cidade maior, muitas vezes com lugares sobrando.

O paciente recebe um lembrete no WhatsApp um dia antes e responde "vou" ou "não vou". Se vai, garante o lugar na van; se não vai, a vaga vai para o próximo da fila. Este front-end é o **painel da recepção da secretaria**: lista as consultas, permite registrar, confirmar e cancelar, e mostra a necessidade de transporte.

ODS relacionados: **3** (saúde e bem-estar), **10** (redução das desigualdades) e **11** (cidades e comunidades sustentáveis).

## Tecnologias

- React 19 + Vite + TypeScript (SPA)
- Tailwind CSS v4
- React Router
- Fetch API para as chamadas HTTP (sem Axios)
- API REST em Java (Spring Boot), desenvolvida na disciplina de Domain Driven Design

## Estrutura de pastas

```
src/
├─ components/   componentes reutilizáveis (Navbar, Footer, Button, Card, FormField, FotoIntegrante, Loading, ErrorMessage, EmptyState...)
├─ pages/        uma página por rota
├─ services/     api.ts (fetch genérico), endpoints.ts (caminhos da API), mapeamento.ts, consultas.ts, pacientes.ts, unidades.ts
├─ types/        interfaces TypeScript
├─ hooks/        useFetch
├─ utils/        validação e formatação
└─ data/         dados dos integrantes

public/          logo, favicon e fotos dos integrantes (membros/)
```

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/sobre` | Sobre |
| `/integrantes` e `/integrantes/:id` | Integrantes e detalhe |
| `/faq` | Perguntas frequentes |
| `/contato` | Contato (formulário com validação local, sem chamar a API) |
| `/consultas` | Lista de consultas, com filtro por status |
| `/consultas/nova` | Formulário de nova consulta |
| `/consultas/:id` | Detalhe, lembretes, reservas na van, confirmar e cancelar |

## Como executar

Requisitos: Node.js 18+.

```bash
npm install
cp .env.example .env   # preencha VITE_API_URL
npm run dev
```

Para gerar a versão de produção: `npm run build`.

### Variável de ambiente

| Variável | Descrição |
| --- | --- |
| `VITE_API_URL` | URL base da API Java, sem barra no final. Valor de produção: `https://embarcaai-api.onrender.com`. Sem a variável, o front usa `http://localhost:8080`. Os caminhos ficam em `src/services/endpoints.ts`. |

A API roda no plano gratuito do Render: a primeira chamada depois de um tempo parada pode levar cerca de 1 minuto.

## Links

- GitHub: https://github.com/PedroDaniel7/embarcaai-frontend
- Vercel: https://embarcaai-frontend.vercel.app
- API Java (Render): https://embarcaai-api.onrender.com
- Vídeo no YouTube: TODO (link do vídeo de até 3 minutos)

## Integrantes

| Nome | RM | Papel | GitHub | LinkedIn | E-mail |
| --- | --- | --- | --- | --- | --- |
| Arthur de Souza Lopes | 573023 | Engenharia de Software (parte) | [arthurlopes2007](https://github.com/arthurlopes2007) | [perfil](https://www.linkedin.com/in/arthur-souza-lopes-037112346/) | arthurdesouzalopes635@gmail.com |
| Eduardo Oliveira Conde | 573163 | Chatbot | [eduardo-oliveira-conde](https://github.com/eduardo-oliveira-conde) | [perfil](https://www.linkedin.com/in/eduardo-conde-663213348/) | edu.conde021@gmail.com |
| Lucas Bossi Cruz | 572876 | Python | [bsscrz](https://github.com/bsscrz) | [perfil](https://www.linkedin.com/in/lucas-bossi-1a54443a3/) | lucabossicruz@gmail.com |
| Pedro Daniel Melo de Moraes | 569786 | Engenharia de Software, Banco de dados, Front-end, revisão e coordenação | [PedroDaniel7](https://github.com/PedroDaniel7) | [perfil](https://www.linkedin.com/in/pedrodanielmoraes/) | pedrodaniel.mmoraes@gmail.com |
| Rick Nascimento da Costa | 571828 | Java (API) | [rcostaa-dev](https://github.com/rcostaa-dev) | [perfil](https://www.linkedin.com/in/rick-nascimento-b063733b6/) | rickgodinhotk7@gmail.com |

## Uso de IA

- **Ferramenta:** Claude (Anthropic), via Claude Code e via chat.
- **Onde foi usado neste projeto:** geração e revisão do código do front-end (React, TypeScript e Tailwind), integração com a API Java, depuração (incluindo um bug do ModelMapper na API, encontrado em teste de integração), auditoria das entregas segundo a rubrica, planejamento e revisão de textos e documentos.
- **Como foi validado:** o código foi lido, executado e testado pela equipe contra a API real. Erros da IA foram corrigidos pela equipe; por exemplo, ela chegou a assumir um endpoint de contato que a API não tem e uma contagem de commits que não batia com a rubrica.

O registro completo de uso de IA de todas as disciplinas está no documento de Software Engineering and Business Model.

## Contato

Use a página `/contato` da aplicação ou abra uma issue no repositório do GitHub.
