
# I.R.I.S. Club Website  
**Innovation, Research and Intelligence Support**

## Overview  
The official website for **I.R.I.S.**, a college club dedicated to fostering innovation, research and collaboration. Built with modern web technologies, this platform serves as a hub for event information, member engagement and intelligent interactions through an AI-powered chatbot.

## ✨ Features  
- **AI-Powered Chatbot**: Intelligent Q&A system using TensorFlow.js and Universal Sentence Encoder  
- **Event Management**: Comprehensive event listings with registration and payment processing  
- **Modern UI/UX**: Responsive design with Tailwind CSS and Framer Motion animations  
- **Secure Authentication**: User management with Supabase Auth  
- **Real-time Updates**: Dynamic content loading and state management  
- **Email Notifications**: Automated email system for registrations and updates

## 🛠️ Tech Stack  
- **Frontend**: 
  - Next.js 15 with React 19
  - Tailwind CSS + Framer Motion
  - React Bootstrap components
  - Redux for state management

- **Backend**:
  - Next.js API Routes
  - Python-based AI services
  - Supabase for database and authentication

- **AI/ML**:
  - TensorFlow.js
  - Universal Sentence Encoder
  - Custom embedding models

- **Infrastructure**:
  - **Frontend Hosting**: Vercel
  - **Backend Hosting**: Render
  - **Database**: Supabase
  - **CI/CD**: GitHub Actions with automated deployments
  - **Environment Management**: Multi-environment configuration (development, production)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Python 3.8+
- Supabase account
- Razorpay account (for payments)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kushagra-a-singh/I.R.I.S-Prod-Website.git
   cd I.R.I.S-Prod-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the Next.js development server and Python backend services.

## 🤖 AI Chatbot Setup
The AI chatbot requires Python dependencies. Set it up with:

```bash
pip install -r requirements.txt  
```

## 🚀 Deployment
- **Frontend**: Hosted on Vercel with automatic deployments from the `main` branch
- **Backend**: Deployed on Render for reliable server-side operations
- **Database**: Managed by Supabase

### Deployment Process
1. Push your changes to the `main` branch
2. Vercel will automatically deploy frontend changes
3. Backend updates are automatically deployed from the main branch via Render's GitHub integration
4. Monitor deployments in the respective dashboards (Vercel & Render)

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Added some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📫 Contact
For any questions or feedback, please open an issue on GitHub.
