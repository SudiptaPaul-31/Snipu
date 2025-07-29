# GitHub Templates

This directory contains templates for issues and pull requests to help maintain consistency and provide structure for contributions to the Snipu project.

## 📁 File Structure

```
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md          # Template for bug reports
│   ├── feature_request.md     # Template for feature requests
│   ├── general.md            # Template for general issues
│   └── config.yml            # Issue template configuration
├── workflows/
│   └── update-contributors.yml
├── scripts/
├── PULL_REQUEST_TEMPLATE.md   # Template for pull requests
└── README.md                 # This file
```

## 🎯 Templates Overview

### Pull Request Template
- **File:** `PULL_REQUEST_TEMPLATE.md`
- **Purpose:** Standardize pull request submissions
- **Features:**
  - Issue linking with `Closes #(issue_number)`
  - Type of change categorization
  - Testing checklist
  - Screenshots/videos section
  - Technical details section
  - Browser/device testing checklist
  - Contact information

### Issue Templates

#### Bug Report Template
- **File:** `ISSUE_TEMPLATE/bug_report.md`
- **Purpose:** Report bugs and unexpected behavior
- **Features:**
  - Environment information
  - Steps to reproduce
  - Expected vs actual behavior
  - Console errors and network issues
  - Priority and impact assessment

#### Feature Request Template
- **File:** `ISSUE_TEMPLATE/feature_request.md`
- **Purpose:** Suggest new features and enhancements
- **Features:**
  - Problem statement
  - Proposed solution
  - Technical implementation details
  - Impact assessment
  - Acceptance criteria
  - Timeline estimation

#### General Issue Template
- **File:** `ISSUE_TEMPLATE/general.md`
- **Purpose:** Handle issues that don't fit other categories
- **Features:**
  - Flexible issue categorization
  - Technical details section
  - Impact assessment
  - Proposed solutions

## 🚀 Usage

### Creating Issues
1. Go to the [Issues](https://github.com/SudiptaPaul-31/Snipu/issues) page
2. Click "New Issue"
3. Choose the appropriate template:
   - 🐛 **Bug Report** for bugs and unexpected behavior
   - ✨ **Feature Request** for new features and enhancements
   - 📝 **General Issue** for everything else
4. Fill out the template completely
5. Submit the issue

### Creating Pull Requests
1. Create a new branch for your changes
2. Make your changes and commit them
3. Push your branch and create a pull request
4. The PR template will automatically load
5. Fill out all relevant sections
6. Link related issues using `Closes #(issue_number)`
7. Add screenshots/videos for UI changes
8. Submit the pull request

## 📋 Template Guidelines

### For Contributors
- **Be thorough:** Fill out all relevant sections
- **Be specific:** Provide detailed descriptions and steps
- **Include media:** Add screenshots/videos for visual changes
- **Link issues:** Use `Closes #(issue_number)` to link related issues
- **Test thoroughly:** Run `npm run check` before submitting PRs

### For Maintainers
- **Review thoroughly:** Check all sections are completed
- **Verify testing:** Ensure all tests pass
- **Check formatting:** Verify code follows style guidelines
- **Validate links:** Confirm issue links are correct
- **Test functionality:** Verify the changes work as expected

## 🔗 Related Links

- [CONTRIBUTING.md](../CONTRIBUTING.md) - General contribution guidelines
- [SETUP.md](../SETUP.md) - Project setup instructions
- [README.md](../README.md) - Project overview

## 📞 Support

If you have questions about using these templates:
- Join our [Telegram Community](https://t.me/snipu_code)
- Contact [@Sudipta_31](https://t.me/sudipta_31) on Telegram
- Create a general issue using the templates above

---

*Thank you for contributing to Snipu! 🚀* 