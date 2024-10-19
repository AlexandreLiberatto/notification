
---

# Microsserviço: Notification  
Parte do sistema **CompreFácil**

## **Descrição**

Este serviço consome mensagens da fila **RabbitMQ** publicadas pelo microsserviço **Payment** e envia notificações simuladas. Ele garante que o usuário seja informado sobre o status das transações realizadas.

---

## **Requisitos**

- **Node.js** (v18+)  
- **npm**  
- **Docker** e **Docker Compose**

---

## **Instalação e Execução**

### 1. Clonar o repositório
```bash
git clone https://github.com/AlexandreLiberatto/notification
cd notification
```

### 2. Configurar as variáveis de ambiente
Crie um arquivo `.env` com as seguintes configurações:

```
PORT=3001
RABBITMQ_URL=amqp://localhost
```

### 3. Instalar as dependências
```bash
npm install
```

### 4. Subir os containers necessários
Certifique-se de que o **RabbitMQ** está em execução com o comando:

```bash
docker-compose up -d
```

### 5. Iniciar o serviço
```bash
npm start
```

---

## **Rotas Disponíveis**

### `GET /notificacoes`
Simula o envio de notificações.

---

## **Tecnologias Utilizadas**

- **Node.js**  
- **RabbitMQ**  

---

## **Contato**

- **Nome:** Alexandre Liberato  
- **GitHub:** [Notification](https://github.com/AlexandreLiberatto/notification)  
- **Email:** alexandreliberatto@gmail.com  

---
