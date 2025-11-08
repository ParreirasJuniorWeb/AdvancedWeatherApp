# AdvancedWeatherApp
Um aplicativo de previsão do tempo feito em React e Tailwaind e a OpenWeatherAPI. Nesta aplicação o usuário consegue obter dados meteorológicos de qualquer lugar, consegue obter a previsão do tempo para a semana, converter temperaturas, de celsius para fahrenheit e vice-versa, e consegue fazer a previsão do tempo de sua cidade. 

## Funcionalidades

- Previsão do tempo atual
- Previsão estendida para 7 dias
- Conversão de unidades de temperatura (Celsius/Fahrenheit)
- Busca por localização
- Design responsivo com Tailwind CSS
- Integração com OpenWeatherAPI para dados em tempo real
- Favoritar cidades para acesso rápido
- Notificações de alertas meteorológicos

## Tecnologias Utilizadas

- React.js
- Tailwind CSS
- OpenWeatherAPI
- Lucide React Icons (para ícones)

## Como Usar

1. Obtenha uma chave de API gratuita em [OpenWeatherMap](https://openweathermap.org/api)
2. Clone este repositório
3. Instale as dependências com `npm install`
4. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:
   
   REACT_APP_API_KEY=sua_chave_aqui
5. Inicie o servidor de desenvolvimento com `npm start`
6. Acesse o aplicativo em `http://localhost:3000`

## Estrutura do Projeto

- `src/components/` - Componentes reutilizáveis da interface
- `src/services/` - Serviços para comunicação com a API
- `src/pages/` - Páginas principais da aplicação
- `src/hooks/` - Hooks personalizados
- `src/utils/` - Funções utilitárias
- `src/context/` - Contextos do React para gerenciamento de estado global
- `src/assets/` - Arquivos estáticos como imagens e ícones
- `src/styles/` - Arquivos de estilo globais e temas
- `public/` - Arquivos públicos como o index.html e manifest.json

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
Por favor, siga as diretrizes de contribuição no arquivo CONTRIBUTING.md.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Autor
Desenvolvido por [Seu Nome].
Contato: [seu.email@example.com]
GitHub: [github.com/seu-usuario]
LinkedIn: [linkedin.com/in/seu-usuario]

## Agradecimentos
Agradeço a todos que contribuíram para este projeto, seja através de sugestões, feedbacks ou código.
Especial agradecimento à OpenWeatherMap pela API gratuita e aos desenvolvedores das bibliotecas utilizadas neste projeto.