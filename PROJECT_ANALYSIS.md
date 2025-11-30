# Helpdesk Backend - Project Structure & Phase 5 Analysis

## 📁 Backend Folder Structure

```
helpdesk-backend-main/
├── server.js                    # Main entry point (Express + Socket.IO)
├── package.json                 # Dependencies & scripts
├── src/
│   ├── config/
│   │   └── db.js               # Sequelize database configuration
│   │
│   ├── models/                 # Sequelize ORM Models
│   │   ├── index.js           # Model initialization & associations
│   │   ├── User.js            # User model (customers, agents)
│   │   ├── AdminUser.js       # Admin user model
│   │   ├── Role.js            # Role model (admin, agent, customer)
│   │   ├── Otp.js             # OTP model for email verification
│   │   │
│   │   ├── phase3/            # Phase 3: Ticketing Models
│   │   │   ├── Ticket.js
│   │   │   ├── TicketCategory.js
│   │   │   ├── TicketMessage.js
│   │   │   └── TicketAttachment.js
│   │   │
│   │   ├── phase4/            # Phase 4: Knowledge Base Models
│   │   │   ├── KBCategory.js
│   │   │   ├── KBArticle.js
│   │   │   └── KBArticleHistory.js
│   │   │
│   │   └── phase5/            # Phase 5: Live Chat Models
│   │       ├── LiveChatSession.js
│   │       └── LiveChatMessage.js
│   │
│   ├── controllers/            # Business Logic Layer
│   │   ├── authController.js  # Authentication (login, OTP, signup)
│   │   │
│   │   ├── phase3/            # Phase 3: Ticket Controllers
│   │   │   ├── ticketController.js
│   │   │   ├── ticketCategoryController.js
│   │   │   ├── ticketMessageController.js
│   │   │   └── ticketAttachmentController.js
│   │   │
│   │   ├── phase4/            # Phase 4: KB Controllers
│   │   │   ├── kbCategoryController.js
│   │   │   ├── kbArticleController.js
│   │   │   └── kbUploadController.js
│   │   │
│   │   └── phase5/            # Phase 5: Live Chat Controllers
│   │       └── liveChatController.js
│   │
│   ├── routes/                 # API Route Definitions
│   │   ├── authRoutes.js
│   │   ├── phase3/
│   │   │   ├── ticketRoutes.js
│   │   │   └── ticketCategoryRoutes.js
│   │   ├── phase4/
│   │   │   ├── kbCategoryRoutes.js
│   │   │   ├── kbArticleRoutes.js
│   │   │   └── kbUploadRoutes.js
│   │   └── phase5/
│   │       └── liveChatRoutes.js
│   │
│   ├── middleware/             # Express Middleware
│   │   ├── authMiddleware.js  # JWT token verification
│   │   ├── roleMiddleware.js  # Role-based access control
│   │   ├── ticketUpload.js    # File upload for tickets
│   │   └── kbUpload.js        # File upload for KB articles
│   │
│   ├── socket/                 # Socket.IO Real-time Handlers
│   │   └── chatSocket.js      # Live chat socket events
│   │
│   ├── utils/                  # Utility Functions
│   │   ├── emailService.js    # Nodemailer email service
│   │   └── tokenGenerator.js  # JWT token generation
│   │
│   └── seeders/                # Database Seeders
│       └── roleSeeder.js      # Initial role data
│
└── uploads/                    # File Upload Storage
    └── kb/                     # Knowledge base uploads
```

---

## 🔄 Project Flow & Architecture

### **1. Request Flow (REST API)**

```
Client Request
    ↓
Express Server (server.js)
    ↓
Route Handler (routes/*)
    ↓
Middleware Chain:
    - authMiddleware (JWT verification)
    - roleMiddleware (RBAC check)
    ↓
Controller (controllers/*)
    ↓
Model Layer (models/* via Sequelize)
    ↓
MySQL Database
    ↓
Response to Client
```

### **2. Real-time Flow (Socket.IO)**

```
Client Socket Connection
    ↓
Socket.IO Server (server.js)
    ↓
JWT Authentication Middleware (socket/chatSocket.js)
    ↓
Socket Event Handlers:
    - chat:start
    - chat:join
    - chat:accept
    - chat:send_message
    - chat:typing
    - chat:seen
    - chat:end
    ↓
Database Operations (via Models)
    ↓
Emit Events to Room/All Clients
```

### **3. Database Architecture**

- **Sequelize ORM** with MySQL
- **No Foreign Key Constraints** (constraints: false) - flexible for development
- **Relationships defined** in `models/index.js`:
  - User ↔ Role (Many-to-One)
  - User ↔ Tickets (One-to-Many)
  - Ticket ↔ TicketMessage (One-to-Many)
  - TicketMessage ↔ TicketAttachment (One-to-Many)
  - KBCategory ↔ KBArticle (One-to-Many)
  - KBArticle ↔ KBArticleHistory (One-to-Many)
  - User ↔ LiveChatSession (One-to-Many)
  - LiveChatSession ↔ LiveChatMessage (One-to-Many)
  - KBArticle ↔ LiveChatMessage (One-to-Many)

---

## ✅ Completed Features (Phases 1-5)

### **Phase 1: Foundation & Setup** ✅
- ✅ Express.js server setup
- ✅ MySQL database with Sequelize ORM
- ✅ Environment configuration
- ✅ CORS & middleware setup
- ✅ File upload handling

### **Phase 2: Authentication & Role Management** ✅
- ✅ JWT-based authentication
- ✅ OTP email verification for registration
- ✅ Login for Admin, Agent, Customer
- ✅ Role-based access control (RBAC) middleware
- ✅ User profile management
- ✅ Password hashing with bcryptjs

### **Phase 3: Ticketing Core** ✅
- ✅ Ticket CRUD operations
- ✅ Ticket categories management
- ✅ Ticket messages with @mentions
- ✅ Ticket attachments
- ✅ Ticket status workflow (open, pending, in_progress, resolved, closed, reopened)
- ✅ Priority levels (low, medium, high, urgent)
- ✅ SLA tracking fields (sla_due_at, is_overdue)
- ✅ Internal notes support

### **Phase 4: Knowledge Base** ✅
- ✅ KB category CRUD
- ✅ KB article CRUD
- ✅ Article versioning/history
- ✅ Article approval workflow
- ✅ File upload for KB articles
- ✅ Public/Private article visibility
- ✅ Article helpfulness rating (model ready)

### **Phase 5: Live Chat System** ⚠️ **PARTIALLY COMPLETE**

#### ✅ **Completed:**
1. **Socket.io Server Setup**
   - ✅ HTTP server with Socket.IO integration
   - ✅ JWT authentication for socket connections
   - ✅ Room-based messaging (session-based rooms)

2. **Basic Chat Functionality**
   - ✅ Start chat session (customer)
   - ✅ Join session room
   - ✅ Agent accept session
   - ✅ Send/receive messages (real-time)
   - ✅ Typing indicators
   - ✅ Read receipts (seen status)
   - ✅ End chat session

3. **Chat-to-Ticket Conversion**
   - ✅ Convert chat session to ticket
   - ✅ Link chat history to ticket
   - ✅ Preserve conversation transcript

4. **KB Article Sharing**
   - ✅ Share KB articles in chat (kb_article_id in messages)
   - ✅ Message type: "kb_article"

5. **REST API Endpoints**
   - ✅ `POST /api/live-chat/start` - Start session
   - ✅ `GET /api/live-chat/my-sessions` - Customer sessions
   - ✅ `GET /api/live-chat/agent/sessions` - Agent sessions
   - ✅ `GET /api/live-chat/admin/all-sessions` - All sessions
   - ✅ `GET /api/live-chat/:id/messages` - Get messages
   - ✅ `POST /api/live-chat/:id/convert-to-ticket` - Convert to ticket

---

## ❌ Missing/Incomplete Features (Phase 5)

### **1. Chat Routing & Queue System** ❌
**Status:** Not Implemented

**Required Features:**
- ❌ **Skills-based routing** - Route chats based on agent skills/tags
- ❌ **Workload balancing** - Distribute chats based on agent's current chat count
- ❌ **Availability management** - Track agent online/offline/busy status
- ❌ **Queue management** - Queue pending chats when no agents available
- ❌ **Auto-assignment logic** - Automatically assign chats to available agents

**Implementation Ideas:**
```javascript
// New Model: AgentAvailability
- agent_id
- status: 'online' | 'offline' | 'busy' | 'away'
- current_chat_count
- max_concurrent_chats
- skills: JSON array
- last_seen_at

// New Service: ChatRouter
- findAvailableAgent(session)
- calculateWorkload(agent_id)
- routeBySkills(session, required_skills)
- addToQueue(session_id)
```

### **2. Canned Responses System** ❌
**Status:** Not Implemented

**Required Features:**
- ❌ **Canned response CRUD** - Create, read, update, delete templates
- ❌ **Category organization** - Group responses by category
- ❌ **Shortcut keys** - Quick access via shortcuts (e.g., `/greeting`)
- ❌ **Variable substitution** - Support placeholders like {{customer_name}}
- ❌ **Agent personal responses** - Allow agents to create personal templates
- ❌ **Team shared responses** - Share templates across team

**Implementation Ideas:**
```javascript
// New Model: CannedResponse
- id
- title
- content (TEXT)
- category
- shortcut_key (optional)
- is_shared (boolean)
- created_by (agent_id)
- variables: JSON (e.g., ["customer_name", "ticket_id"])

// New Routes:
- GET /api/canned-responses
- POST /api/canned-responses
- PUT /api/canned-responses/:id
- DELETE /api/canned-responses/:id
- POST /api/canned-responses/:id/use (track usage)

// Socket Event:
- chat:use_canned_response (session_id, response_id, variables)
```

### **3. File Sharing in Chat** ⚠️
**Status:** Partially Implemented

**Current State:**
- ✅ `attachment_url` field exists in `LiveChatMessage` model
- ✅ Message type: "file" exists
- ❌ **No file upload handler** for chat attachments
- ❌ **No file validation** (size, type)
- ❌ **No file storage** logic

**Implementation Needed:**
```javascript
// Add to chatSocket.js or new controller:
- Handle file upload via multipart/form-data
- Validate file (size < 10MB, allowed types: images, PDFs, docs)
- Store in uploads/chat/ directory
- Save attachment_url to message
- Emit file message to room
```

### **4. Agent Availability Status** ❌
**Status:** Not Implemented

**Required Features:**
- ❌ **Status tracking** - Online, Offline, Busy, Away
- ❌ **Status updates via Socket.IO** - Real-time status changes
- ❌ **Auto-status** - Set to "away" after inactivity
- ❌ **Status persistence** - Store in database

**Implementation Ideas:**
```javascript
// Add to User model or new AgentStatus model:
- availability_status: ENUM('online', 'offline', 'busy', 'away')
- last_activity_at: DATE

// Socket Events:
- agent:set_status (status)
- agent:status_changed (broadcast to admins/supervisors)

// Auto-status logic:
- Set to 'away' after 15 minutes of inactivity
- Set to 'offline' on disconnect
```

### **5. Multi-Chat Management (Backend Support)** ⚠️
**Status:** Basic Support Exists, Needs Enhancement

**Current State:**
- ✅ Agent can accept multiple sessions
- ✅ Sessions tracked in database
- ❌ **No concurrent chat limit** enforcement
- ❌ **No chat prioritization** logic
- ❌ **No chat transfer** between agents

**Enhancement Needed:**
```javascript
// Add to LiveChatSession model:
- priority: ENUM('low', 'medium', 'high', 'urgent')
- wait_time: INTEGER (seconds in queue)

// New Controller Methods:
- transferChat(session_id, new_agent_id)
- getAgentWorkload(agent_id)
- enforceChatLimit(agent_id)
```

### **6. Chat Widget Preload (Customer Data)** ⚠️
**Status:** Basic Support

**Current State:**
- ✅ `metadata` field in LiveChatSession (JSON)
- ❌ **No structured customer preload** - Name, email, previous tickets
- ❌ **No customer context** - Recent orders, account status

**Enhancement:**
```javascript
// Enhance startSession to include:
- customer_name
- customer_email
- customer_phone
- previous_tickets_count
- account_status
- metadata: { browser, ip, page_url, referrer }
```

### **7. Chatbot Handoff** ❌
**Status:** Not Implemented

**Required Features:**
- ❌ **Bot-to-human handoff** - Transfer from bot to agent
- ❌ **Handoff reason** - Why bot couldn't help
- ❌ **Bot conversation history** - Preserve bot messages

**Implementation Ideas:**
```javascript
// Add to LiveChatSession:
- is_bot_session: BOOLEAN
- bot_handoff_reason: STRING
- bot_messages: JSON (store bot conversation)

// Socket Event:
- chat:bot_handoff (session_id, reason, conversation_history)
```

---

## 📊 Phase 5 Completion Summary

| Feature | Status | Completion % |
|---------|--------|--------------|
| Socket.io Server | ✅ Complete | 100% |
| Basic Messaging | ✅ Complete | 100% |
| Chat-to-Ticket | ✅ Complete | 100% |
| KB Article Share | ✅ Complete | 100% |
| Typing Indicators | ✅ Complete | 100% |
| Read Receipts | ✅ Complete | 100% |
| **Chat Routing/Queue** | ❌ Missing | 0% |
| **Canned Responses** | ❌ Missing | 0% |
| **File Sharing** | ⚠️ Partial | 30% |
| **Agent Availability** | ❌ Missing | 0% |
| **Multi-Chat Management** | ⚠️ Basic | 40% |
| **Chatbot Handoff** | ❌ Missing | 0% |

**Overall Phase 5 Completion: ~60%**

---

## 🎯 Recommended Implementation Priority

### **Priority 1 (Critical):**
1. **File Sharing in Chat** - Complete the attachment functionality
2. **Agent Availability Status** - Essential for routing
3. **Chat Routing & Queue** - Core feature for production

### **Priority 2 (Important):**
4. **Canned Responses** - Major productivity feature
5. **Multi-Chat Management Enhancements** - Better agent experience

### **Priority 3 (Nice to Have):**
6. **Chatbot Handoff** - Advanced feature
7. **Customer Preload Enhancement** - Better context

---

## 🔧 Technical Stack Summary

- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MySQL (via Sequelize ORM 6.37.7)
- **Real-time:** Socket.IO 4.8.1
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **File Upload:** Multer (via custom middleware)
- **Email:** Nodemailer 7.0.11
- **Password Hashing:** bcryptjs 3.0.3

---

## 📝 Notes

- All models use `constraints: false` for flexible development
- Socket.IO uses JWT authentication via handshake.auth.token
- File uploads stored in `uploads/` directory
- Environment variables required: `DB_*`, `JWT_SECRET`, `EMAIL_*`
- Server runs on port 5000 (configurable via PORT env var)

