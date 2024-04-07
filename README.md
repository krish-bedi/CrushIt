
<p align="center">
    <h1 align="center">CRUSHIT</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/krish-bedi/CrushIt?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/krish-bedi/CrushIt?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/krish-bedi/CrushIt?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=flat&logo=Bootstrap&logoColor=white" alt="Bootstrap">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<br>
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links
=
> - [📂 Repository Structure](#-repository-structure)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running CrushIt](#-running-CrushIt)
>   - [🧪 Tests](#-tests)
> - [📄 License](#-license)



## 📂 Repository Structure

```sh
└── CrushIt/
    ├── README.md
    ├── backend
    │   ├── config
    │   │   ├── db.js
    │   │   └── server.js
    │   ├── controllers
    │   │   └── userController.js
    │   ├── middleware
    │   │   ├── authMiddleware.js
    │   │   └── errorMiddleware.js
    │   ├── models
    │   │   └── userModel.js
    │   ├── routes
    │   │   └── userRoutes.js
    │   ├── server.js
    │   └── utils
    │       ├── generateToken.js
    │       ├── sendResetMail.js
    │       └── sendVerificationEmail.js
    ├── exfile.txt
    ├── frontend
    │   ├── .eslintrc.cjs
    │   ├── .gitignore
    │   ├── README.md
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   └── vite.svg
    │   ├── src
    │   │   ├── App.jsx
    │   │   ├── assets
    │   │   │   ├── clock.svg
    │   │   │   ├── eye.svg
    │   │   │   ├── iconEmail.svg
    │   │   │   ├── lock.svg
    │   │   │   ├── logout.svg
    │   │   │   ├── mainLogo.svg
    │   │   │   ├── profile.svg
    │   │   │   └── react.svg
    │   │   ├── components
    │   │   │   ├── FormContainer.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── Hero.jsx
    │   │   │   ├── Loader.jsx
    │   │   │   └── PrivateRoute.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   ├── screens
    │   │   │   ├── HomeScreen.jsx
    │   │   │   ├── LoginScreen.jsx
    │   │   │   ├── ProfileScreen.jsx
    │   │   │   └── RegisterScreen.jsx
    │   │   ├── slices
    │   │   │   ├── apiSlice.js
    │   │   │   ├── authSlice.js
    │   │   │   └── userApiSlice.js
    │   │   ├── store.js
    │   │   └── style
    │   │       └── styles.css
    │   └── vite.config.js
    ├── package-lock.json
    └── package.json
```

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

### ⚙️ Installation

1. Clone the CrushIt repository:

```sh
git clone https://github.com/krish-bedi/CrushIt
```

2. Change to the project directory:

```sh
cd CrushIt
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running CrushIt

Use the following command to run CrushIt:

```sh
node app.js
```

### 🧪 Tests

To execute tests, run:

```sh
npm test
```

---

## 📄 License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/#) License.
---

[**Return**](#-quick-links)

---
