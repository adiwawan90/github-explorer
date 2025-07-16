# GitHub User Search App

A modern and lightweight React + TypeScript application to search GitHub users and explore their repositories using the GitHub REST API.

## 🚀 Features

- 🔍 Search GitHub users (up to 5 results)
- 📂 View repositories of any selected user
- 🌀 Loading states for better UX
- ❌ Error handling for failed requests
- 🧪 Unit & Integration testing using Testing Library & MSW
- 💅 Clean UI with Tailwind CSS
- 🌐 Public GitHub API integration

## 📸 Screenshot

![Screenshot](./screenshot.png) <!-- Replace with actual screenshot if available -->

## 🧱 Tech Stack

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Testing Library](https://testing-library.com/)

## 🔧 Installation

```bash
# Clone the repository
https://github.com/your-username/github-user-search.git

cd github-user-search

# Install dependencies
npm install

# Start development server
npm start
```

## 🧪 Running Tests

```bash
npm test
```

> Uses `jest`, `@testing-library/react`, and `msw` to mock API calls.

## 🧬 Folder Structure

```
src/
├── App.tsx
├── components/
│   ├── Accordion.tsx
│   ├── RepoCard.tsx
│   ├── SearchForm.tsx
│   └── UserAccordion.tsx
├── hooks/
│   ├── useGetUserRepos.ts
│   └── useGetUsers.tsx
├── services/
│   └── githubAPI.ts
├── types/
│   └── index.ts
├── index.tsx
├── index.css
```

## 🌐 GitHub API Endpoints

- Search users: `GET https://api.github.com/search/users?q=USERNAME&per_page=5`
- Get repos: `GET https://api.github.com/users/USERNAME/repos`

## 📄 License

[MIT](./LICENSE)

## 📬 Contact

Feel free to reach out via [GitHub](https://github.com/adiwawan90) or [adi.wawan90@gmail.com](adi.wawan90@gmail.com)

---

> Built with ♥ using React, TypeScript, and GitHub API.
