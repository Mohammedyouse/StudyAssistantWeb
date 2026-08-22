# 📚 StudyAssistant

> 🚀 An AI-powered study companion to boost productivity, manage tasks, and enhance learning efficiency.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](#)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/Mohammedyouse/studyAssitant)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## ✨ Features

* 🤖 **AI Study Assistant** – Get instant help with your study materials
* ⏱️ **Smart Study Timer** – Use Pomodoro technique for better focus
* 📊 **Progress Analytics** – Track and visualize your productivity
* 📝 **Task Management** – Organize assignments and deadlines
* 📚 **Subject Tracking** – Monitor performance across subjects
* 🎯 **Study Goals** – Set and achieve learning targets

---

## 🚀 Tech Stack

* **Frontend**: React 18 + TypeScript
* **Styling**: Tailwind CSS
* **Backend & Auth**: Supabase
* **AI Integration**: Google Gemini API
* **Build Tool**: Vite
* **Other Tools**:

  * PDF.js (PDF processing)
  * Mammoth (Word files)
  * Web Speech API (Voice input)

---

## 🛠️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Mohammedyouse/studyAssitant.git
cd studyAssitant
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Run the project

```bash
npm run dev
```

👉 Open: http://localhost:5173

---

## 📁 Project Structure

```
studyAssitant/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── utils/
│   └── types.ts
├── .env
├── package.json
```

---

## 🎨 Customization

* Modify styles via `tailwind.config.js`
* Adjust timers in:

  * `PomodoroTimer.tsx`
  * `StudyTimer.tsx`

---

## 🤝 Contributing

Contributions are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
```

---

## 🐛 Bug Reports

If you find a bug:

* Describe the issue
* Provide steps to reproduce
* Add screenshots if possible

---

## ⚠️ Disclaimer

This project is based on an open-source project and has been modified and improved.

---

## 👨‍💻 Developer

**Maintained & Modified by:**
👉 Mohammedyouse
🔗 https://github.com/Mohammedyouse

---

Made with ❤️ for students
