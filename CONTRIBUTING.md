# Contributing to ACH Digital Workbench

Thank you for your interest in contributing to the ACH Digital Workbench! This document provides guidelines and information for contributors.

## Project Structure

```
ach/
├── src/
│   ├── js/           # JavaScript files
│   │   ├── app.js    # Main application logic
│   │   ├── dropdown.js # Dropdown functionality
│   │   └── logic.js  # Pure business logic
│   ├── css/          # Stylesheets
│   │   └── style.css # Custom styles
│   ├── tests/        # Test files
│   │   └── app.test.js
│   ├── media/        # Images and assets
│   └── index.html    # Main HTML file
├── .github/          # GitHub configuration
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adam-Goss/ach.git
   cd ach
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Run tests:**
   ```bash
   npm test
   npm run test:watch  # Watch mode
   ```

## Code Style Guidelines

- Use **ES6+** features where appropriate
- Follow **functional programming** principles when possible
- Write **descriptive variable and function names**
- Add **JSDoc comments** for complex functions
- Keep functions **small and focused**
- Use **early returns** to reduce nesting

## Testing

- Write tests for new features in `src/tests/`
- Follow the existing test patterns
- Ensure all tests pass before submitting PRs
- Use descriptive test names

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the code style guidelines
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Commit your changes with descriptive commit messages
7. Push to your fork and submit a pull request

## Commit Message Format

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(matrix): add keyboard navigation support`
- `fix(projects): resolve project deletion bug`
- `docs(readme): update installation instructions`

## Issues and Bug Reports

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## Questions or Need Help?

Feel free to open an issue for questions or discussions about the project.

Thank you for contributing to ACH Digital Workbench! 