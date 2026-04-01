# ⚡ 4Do-App

Aplicativo React Native para gestão de tarefas baseado na **Matriz de Eisenhower** — o sistema de priorização favorito de presidentes e CEOs.

---

## 📐 A Matriz de Eisenhower

|                    | **Urgente**             | **Não Urgente**      |
| ------------------ | ----------------------- | -------------------- |
| **Importante**     | 🔥 Q1 — **Fazer Agora** | 🎯 Q2 — **Agendar**  |
| **Não Importante** | 🤝 Q3 — **Delegar**     | 🗑️ Q4 — **Eliminar** |

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go no celular (iOS ou Android)

### Instalação

```bash
cd EisenhowerApp
npm install
npx expo start
```

Escaneie o QR code com o **Expo Go** (Android) ou a câmera (iOS).

---

## 📱 Funcionalidades

### Gestão de Tarefas

- ✅ Criar, editar e excluir tarefas
- ✅ Marcar como concluída com um toque
- ✅ Classificar em um dos 4 quadrantes
- ✅ Adicionar descrição, data de vencimento e tags
- ✅ Filtrar por ativas / concluídas / todas

### Armazenamento Local

- ✅ **AsyncStorage** — dados salvos no dispositivo
- ✅ Persistência total entre sessões
- ✅ Nenhum servidor externo necessário

### Backup Semanal

- ✅ Sugestão automática a cada 7 dias
- ✅ Exportar para arquivo `.json` (compartilhável via WhatsApp, e-mail, etc.)
- ✅ Importar backup de qualquer dispositivo
- ✅ Verificação de data do último backup

---

## 🗂️ Estrutura do Projeto

```
EisenhowerApp/
├── App.tsx                        # Componente raiz, navegação por tabs
├── src/
│   ├── types/index.ts             # TypeScript interfaces
│   ├── constants/index.ts         # Configuração dos quadrantes
│   ├── hooks/
│   │   └── useStorage.ts          # Hook de persistência e backup
│   ├── components/
│   │   ├── QuadrantPanel.tsx      # Painel de cada quadrante
│   │   ├── TaskCard.tsx           # Card individual de tarefa
│   │   ├── TaskModal.tsx          # Modal de criação/edição
│   │   └── BackupBanner.tsx       # Banner de sugestão de backup
│   └── screens/
│       └── SettingsScreen.tsx     # Tela de configurações e backup
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🛠️ Stack Técnica

| Tecnologia              | Uso                          |
| ----------------------- | ---------------------------- |
| React Native + Expo     | Framework mobile             |
| NativeWind 4 (Tailwind) | Estilização                  |
| AsyncStorage            | Armazenamento local          |
| expo-file-system        | Leitura/escrita de arquivos  |
| expo-sharing            | Compartilhar backup          |
| expo-document-picker    | Selecionar arquivo de backup |
| date-fns                | Formatação de datas          |
| TypeScript              | Tipagem estática             |

---

## 💾 Formato do Backup

```json
{
  "version": "1.0.0",
  "createdAt": "2025-07-15T14:30:00.000Z",
  "taskCount": 12,
  "tasks": [
    {
      "id": "uuid-aqui",
      "title": "Apresentação trimestral",
      "description": "Preparar slides com métricas de Q2",
      "quadrant": "Q1",
      "completed": false,
      "createdAt": "2025-07-14T10:00:00.000Z",
      "dueDate": "2025-07-16T00:00:00.000Z",
      "tags": ["trabalho", "apresentação"]
    }
  ]
}
```

---

## 📖 Boas Práticas Implementadas

- **Separação de responsabilidades** — hooks, componentes e telas isolados
- **TypeScript estrito** — tipagem em toda a codebase
- **useCallback** — evita re-renders desnecessários
- **Confirmações de ações destrutivas** — delete e clear pedem confirmação
- **Estado de loading** — feedback visual ao iniciar
- **Acessibilidade** — `hitSlop` em botões pequenos para fácil toque

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.
