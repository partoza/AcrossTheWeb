---
name: clean-code
description: >-
  Use this skill when the user asks to clean up code, format code, or refactor code.
  It provides guidelines on keeping code clean, following comments, and avoiding emojis.
---

# Code Cleaning Guidelines

When cleaning or refactoring code in this project, adhere to the following rules:

## Guidelines

1. **Follow Existing Comments:**
   - Read and understand existing comments before modifying code.
   - Ensure that any cleaned or refactored code still aligns with the intent described in the comments.
   - Update comments if the logic changes significantly, but maintain the original descriptive style.

2. **Keep It Clean:**
   - Remove unused variables, imports, and dead code.
   - Ensure consistent indentation and formatting.
   - Use meaningful variable and function names that describe their purpose clearly.

3. **No Emojis:**
   - Do not use emojis in comments, docstrings, commit messages, or any text within the codebase.
   - Replace any existing emojis with appropriate text descriptions if necessary.

## Validation Steps

After cleaning the code, verify the following:
- [ ] No emojis exist in the modified files.
- [ ] The code logic matches the description in the comments.
- [ ] Code is formatted consistently with the project.
