# I.R.I.S. Club Website  
**Innovation, Research and Intelligence Support**

## Overview  
The official website for **I.R.I.S.**, a college club dedicated to fostering innovation, research and collaboration. Built with modern web technologies, this platform serves as a hub for event information, member engagement and intelligent interactions through an AI-powered chatbot.

## ✨ Features  
- **AI-Powered Chatbot**: Intelligent Q&A system using TensorFlow.js, Universal Sentence Encoder, LangChain, HuggingFace embeddings and Groq LLM
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
  - **Live Backend**: Python/Flask with LangChain deployed on Render
  - **Testing Backend**: Python/Flask with LangChain deployed on AWS App Runner (see [AWS Deployment Branch](https://github.com/kushagra-a-singh/I.R.I.S-Prod-Website/tree/aws-deployment))
  - Supabase for database and authentication

- **AI/ML**:
  - LangChain for RAG (Retrieval-Augmented Generation)
  - HuggingFace embeddings for semantic search
  - Groq LLM for text generation
  - FAISS for vector similarity search

- **Infrastructure**:
  - **Frontend Hosting**: Vercel
  - **Live Backend**: Render (Python/Flask)
  - **Testing Backend**: AWS App Runner (Python/Flask)
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
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Next.js development server. The backend is deployed separately on Render.

## 🤖 AI Chatbot Setup
The AI chatbot requires Python dependencies. Set it up with:

```bash
pip install -r requirements.txt  
```

## 🚀 Deployment
- **Frontend**: Hosted on Vercel with automatic deployments from the `main` branch
- **Live Backend**: Deployed on Render for reliable server-side operations
- **Database**: Managed by Supabase

### Deployment Process
1. Push your changes to the `main` branch
2. Vercel will automatically deploy frontend changes
3. Backend updates are automatically deployed from the main branch via Render's GitHub integration
4. Monitor deployments in the respective dashboards (Vercel & Render)

## 🔧 AWS Deployment Branch

We maintain a separate branch for AWS deployment testing and experimentation:

### Branch: `aws-deployment`
- **Purpose**: Testing and learning AWS services
- **Backend**: Python/Flask deployed on AWS App Runner
- **Container Registry**: Amazon ECR
- **Documentation**: Comprehensive AWS deployment guide

### Why AWS Branch?
- **Learning**: Hands-on experience with AWS services
- **Testing**: Alternative deployment strategy
- **Scalability**: Future-proofing for potential migration
- **Cost Comparison**: Understanding different hosting costs

### Access AWS Deployment Guide
For detailed AWS deployment instructions, check out the `aws-deployment` branch:
```bash
git checkout aws-deployment
```
Or view the [AWS Deployment Guide](https://github.com/kushagra-a-singh/I.R.I.S-Prod-Website/blob/aws-deployment/AWS_APP_RUNNER_README.md) in this branch.

**Note**: The main branch continues to use Render for the live backend. The AWS implementation is for testing and learning purposes.

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
