# LocalSlice🍕: Your Slice of AI, Right on Your Desktop

## Description

LocalSlice🍕 is designed as a user-focused LLM interface that requires zero technical background. Unlike many AI projects that are either too complex, lack features, or rely on third-party APIs, LocalSlice🍕 focuses on running everything locally on your machine, making it as intuitive as possible.

### Why Choose LocalSlice🍕?

- **Personalized AI**: Get a customized 'slice' of AI that's tailored to meet your individual needs.
- **User-Friendly**: Designed with the everyday user in mind, not just tech experts.
- **Local Processing**: Every feature runs on your own machine, ensuring your data remains private and secure.
- **Optional Third-Party Integration**: While the primary focus is on locally run language models, you have the flexibility to integrate with third-party model providers if you choose.

### Our Vision

Our aim is not to fragment the user experience by creating multiple chat bots or specialized interfaces for different tasks. Instead, we want to centralize the best and most useful features currently scattered across various GitHub repositories, websites, and other platforms. Our goal is to bring all these functionalities together in a unified, single interface that is not only simple but also intuitive to use. By doing so, we aspire to simplify the user experience while offering a comprehensive suite of features.

In a nutshell, LocalSlice🍕 prioritizes local processing and user privacy, making AI accessible and safe for everyone.


## Table of Contents

- [Description](#description)
  - [Why Choose LocalSlice🍕?](#why-choose-localslice)
  - [Our Vision](#our-vision)
- [Key Features](#key-features)
  - [Intuitive User Experience](#intuitive-user-experience)
  - [Hassle-Free Installation](#hassle-free-installation)
  - [Local Operations](#local-operations)
  - [Open Source](#open-source)
- [Values](#values)
- [Roadmap](#roadmap)
  - [🟢 Short-Term Goals](#-short-term-goals)
  - [🟡 Mid-Term Goals](#-mid-term-goals)
  - [🔵 Long-Term Goals](#-long-term-goals)
- [Development](#development)
  - [Installation and Setup](#installation-and-setup)

## Key Features

### Intuitive User Experience
- Designed with a focus on user-friendliness.
- Balances simplicity and functionality to avoid making tasks too abstract or too complex.
- Features walk-through guides and tooltips to help users understand how to use the software.

### Hassle-Free Installation
- Installation is simple and requires no coding skills or complicated configurations.
  
### Local Operations
- Everything runs on your machine, ensuring your data stays with you.
- We don't secretly send your data to third-party servers.
- Third party connects are manually approved by you, when and where you want to use them.

### Open Source
- The code is open for community contributions.
- We welcome bug reports, feature requests, and code contributions.

## Values

- **User Empowerment**: Control your own data and computing resources.
- **Accessibility**: AI technology for everyone, not just the tech-savvy.
- **Privacy**: Your data stays on your machine, ensuring privacy and security.
- **Community**: A focus on communal improvement and extension of the application.

## Roadmap Checklist

This checklist outlines the key features and goals we plan to achieve for LocalSlice🍕. 

## Roadmap

Our roadmap outlines the key features and improvements we aim to achieve, to make LocalSlice🍕 increasingly powerful, user-friendly, and privacy-focused.

### 🟢 Short-Term Goals
- [ ] **Electron Releases for Windows, Mac, Linux**: Standalone desktop apps for multiple OS.
- [ ] **Easy Desktop Installer**: Simplified installation via `.exe`, `.dmg`, or `.deb` files.
- [ ] **Full WebApp Implementation**: Deployable web server for self-hosting capabilities.

### 🟡 Mid-Term Goals
- [ ] **Voice Command Integration**: Add voice controls for hands-free operation.
- [ ] **Customizable UI Themes**: Personalize the app's appearance.
- [ ] **Integrate Third-Party Model Hosting Services**: Option to integrate with services like OpenAI.
- [ ] **Auto Profile Adaptation**: Adapt to your needs through interactive questions.

### 🔵 Long-Term Goals
- [ ] **Research Assistant**: Search the web and provide up-to-date, relevant information.
- [ ] **Vectorized Chat History**: Queryable database for past interactions.
- [ ] **Command Line Help**: Assist with command line tasks at the system level.
- [ ] **Vectorize Folders**: Understand the contents of folders for advanced search and analysis.
- [ ] **Model Management System**: Manage various open-source models locally.

This roadmap will continue to evolve based on community feedback and ongoing development.

## Development

To set up a development environment for LocalSlice🍕, you'll need to know the basics of React, Material UI, Electron, and FastAPI.

### Installation and Setup

The application can be containerized using `Development.Dockerfile`. To test Electron functionality, run `npm run start-electron` while the FastAPI backend is running in a Docker container. Make sure port 8000 is mapped to your host machine.

