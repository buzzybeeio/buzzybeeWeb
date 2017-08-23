# Contributing to BuzzyBee

:+1: First off, thanks for taking the time to contribute! :+1:

The following is a set of guidelines for contributing to BuzzyBee and its repos. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [BuzzyBee](#buzzybee)
  * [BuzzyBee Design Decisions](#design-decisions)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)

[Thank You](#thank-you)

## Code of Conduct

This project and the participation of everyone is voluntary, so please be kind and courteous to everyone. We are all here to learn and become better. 

## I don't want to read this whole thing I just have a question!!!


Cool, you can ask us questions directly in our slack channel: 

* [Join the BuzzyBee Slack Team](https://buzzybeeio.slack.com/)
    * Even though Slack is a chat service, sometimes it takes several hours for community members to respond &mdash; please be patient!
    * Use the `#general` channel for general questions or discussion about BuzzyBee
    * Use the `#introduction` channel to introduce yourself.
    * Use the `#random` channel for any further questions that you have that might not be too relevant to BuzzyBee.

## What should I know before I get started?

### BuzzyBee

BuzzyBee is a small open source project &mdash; it's made up of [3 repositories](https://github.com/buzzybeeio) for now, will most likely increase. When you initially consider contributing to BuzzyBee, you might be unsure about which of those repositories implements the functionality you want to change or report a bug for but feel free to read the code base and get a sense of what each repo does, you should clone each repo and play around with the code.

BuzzyBee is intentionally very modular. Nearly every repo has it's own purpose.

### Design Decisions

When we make a significant decision in how we maintain the project and what we can or cannot support, we will discuss it on our slack channel. If you have a question around how we do things, check to see if it is documented there. If it is *not* documented there, please open a PR.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for BuzzyBee. Following these guidelines helps maintainers and the community understand your report.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report).

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

- Check issues section, make sure that your bug hasn't been already submitted.


#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined your bug is related to, create an issue on that repository and provide the following information.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining what you clicked, which page you visited first, etc.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If you're reporting that BuzzyBee is down** Please let us know directly on the Slack Channel. 
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for BuzzyBee, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions.

* Looked into issues section to see that this enhancement has not already been suggested. 
* If there is no similar suggestion, feel free to submit the enhancement as an issue.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). 

### Your First Code Contribution

Unsure where to begin contributing to BuzzyBee? You can start by looking through the issues, if you find that there's something that you can fix, go for it! If you have any questions, feel free to join our Slack and message us. If you don't want to use Slack, feel free to email us at info@buzzybee.io

#### Local development

The web application can be ran locally:

```
$ git clone url-to-git-repository
$ cd path-to-package/
$ npm install
$ npm run build
$ npm start
```

### Pull Requests

* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [JavaScript](#javascript-styleguide) styleguides.
* End all files with a newline


## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Be thoughtful about what the reviewer will read

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](http://standardjs.com/).

* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

## Thank You

The BuzzyBee Team appreciates your contribution! 