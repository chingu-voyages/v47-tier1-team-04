# Welcome to v47-tier1-team-04 Contributing Guide

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on [chingu-voyages.github.io/v47-tier1-team-04/](https://chingu-voyages.github.io/v47-tier1-team-04/) 🏗️:.

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](README.md). Primarily this project is a part of a six week program called a Chingu Voyage. During this period, a group of individuals will work together to build this web application by leveraging Agile methodologies and the SCRUM framework. If you are a member of the Voyage Team, then you are expected to contribute to the project frequently during the Voyage. This period is from 1/8/2024 until 2/12/2024.

## Getting started

Navigate our codebase with confidence. There are three primary branches. `main`, `development`, and `documentation`. These branches may never be deleted and serve as the working version. The `documentation` branch contains all documentation and notes.
### Issues

#### Create a new issue

If you spot a problem anywhere within the docs or application, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant Issue Template.

#### Solve an issue

Scan through our [existing issues](https://github.com/chingu-voyages/v47-tier1-team-04/issues) to find one that interests you. You can narrow down the search using `labels` as filters. As this is a Chingu Voyage, the primary development workflow will consist of issues being assigned to a developer and any outside pull request will be denied. However, if the date is greater than 5 March 2024, then please do contribute in any way possible!

### Make Changes

#### Make changes in the UI

#### Make changes in a codespace

For more information about using a codespace for working on GitHub documentation, see "[Working in a codespace](https://github.com/github/docs/blob/main/contributing/codespace.md)."

#### Make changes locally

1. Fork the repository.

* Using GitHub Desktop:
  * [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  * Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

* Using the command line:
  * [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Install or update to __Node.js__, at the version specified in `.node-version`. For more information, see [the development guide](contributing/development.md).

3. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to [self-review](/contributing/self-review.md) to speed up the review process:zap:.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

* Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
* Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
* Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request additional information.
* We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
* As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
* If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The GitHub team thanks you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [GitHub docs](https://docs.github.com/en).

Now that you are part of the GitHub docs community, see how else you can [contribute to the docs](/contributing/types-of-contributions.md).

## Windows

This site can be developed on Windows, however a few potential gotchas need to be kept in mind:

1. Regular Expressions: Windows uses `\r\n` for line endings, while Unix-based systems use `\n`. Therefore, when working on Regular Expressions, use `\r?\n` instead of `\n` in order to support both environments. The Node.js [`os.EOL`](https://nodejs.org/api/os.html#os_os_eol) property can be used to get an OS-specific end-of-line marker.
2. Paths: Windows systems use `\` for the path separator, which would be returned by `path.join` and others. You could use `path.posix`, `path.posix.join` etc and the [slash](https://ghub.io/slash) module, if you need forward slashes - like for constructing URLs - or ensure your code works with either.
3. Bash: Not every Windows developer has a terminal that fully supports Bash, so it's generally preferred to write [scripts](/script) in JavaScript instead of Bash.
4. Filename too long error: There is a 260 character limit for a filename when Git is compiled with `msys`. While the suggestions below are not guaranteed to work and could cause other issues, a few workarounds include:
   * Update Git configuration: `git config --system core.longpaths true`
   * Consider using a different Git client on Windows

   ## Branch Heirarchy
1. The `main` branch is the production branch. It will always contain the user-facing code and is scheduled to pull changes from `development` at the end of each Sprint. 
1. The `development` branch represents all working code that passes through the workflow just before reaching production. It should only accept pull requests from parent branches created specifically for issues created by the Product Owner. Please ensure that `development` always has a production ready codebase by never pushing changes directly to or making pull requests directly to the `development` or `main` branch
1. Each issue that warrants it's own branch will be given a parent branch name. (i.e [22/documentation/insights](https://github.com/chingu-voyages/v47-tier1-team-04/tree/22/documentation/insights))
1. Each parent branch should only accept pull requests from direct descendents. 

## Forking The Repository
While it may be tempting to [fork](https://github.com/chingu-voyages/v47-tier1-team-04/fork) the repository locally and then clone, it is important to remember by doing so you will detach your local repository with the actual project itself. While it is possible to maintain your local version, I recommend simply cloning the repository to your machine and creating branches. (Not to mention that the team would not be able to simply switch to that branch to view its codebase). Just keep this in mind if forking the repository instead of cloning it. A huge benefit of forking over cloning is that you can build your own version of this app without risking messing up the codebase at all.

## Cloning The Repository
It is assumed that you are familiar with how to navigate to the `terminal` on your local machine. Once there, follow these commands to determine you have Git installed.
1. `git --version` You should see a git version. If not, please install Git. Reach out immediately if you need help.
1. Navigate to the directory you wish to clone the project inside of (it will name the folder for you and download it within whatever folder you type the clone command into)
1. `git status` Confirm that you are not in a git repository already. Hint: you want to see a error `fatal: not a git repository (or any of the parent directories)`
1. `git clone https://github.com/chingu-voyages/v47-tier1-team-04.git` Download the repository to your local machine
1. `cd v47-tier1-team-04` change directory into the local repository folder
1. `git status` - Confirm that it worked you should read a happy message below: 
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

### Viewing The Project
It is yet to be determined which method the team will take to launch a development server or any such thing. It is likely that a simple command like `npm run dev` will fire up a development server.

### Branch Naming Convention
Branches will be named in a format `TBD` by developers in Discussion [#14](https://github.com/chingu-voyages/v47-tier1-team-04/discussions/14) but above is a general idea of a way to do so.

### Open Issues
Issues should be open if a change to the code base is considered necessary. The majority of issues opened will be by the product owner while building the project backlog. However if a bug is found and can be reproduced then please do fill out a bug report by opening up an [issue](https://github.com/chingu-voyages/v47-tier1-team-04/issues/new) immediately. There is a [Bug Report Template](https://github.com/chingu-voyages/v47-tier1-team-04/issues/new?assignees=&labels=bug&projects=&template=bug-report-template.md&title=) that you can pick to make the report e

#### Creating a Branch
Branches should be created if there is an issue to be resolved. If the issue is an objective of this sprint than a parent branch should already be created for you. If one hasn't been then please reach out to the Product Owner. To view a list of all open branches use this [link](https://github.com/chingu-voyages/v47-tier1-team-04/branches) or navigate to all branches in GitHub. Issues warranting a branch will be named in the format `issue-number/type-of-change/description`

Developers proposing changes to code should always do so by first switching to the most relevant branch first.
For example, if adding a username to the `CONTRIBUTORS.md` file, first switch to the appropriate parent branch. In this case:
1. `git checkout 22/documentation/insights` Once on this branch create a new branch using a naming convention that everybody agrees upon such as: `22/feature/documentation-contributors/my-github-username` Next, use the `git switch` command with option `-c` to create and switch simeutanously to that branch.
1. `git switch -c 22/feature/documentation-contributors/change-me-to-your-username` If successful a message should appear `Switched to a new branch '22/feature/documentation-contributors/change-me-to-your-username'`
1. Navigate to the `docs` folder and open up the `CONTRUBUTORS.md` file. 
1. Use Markdown to create a link to the user. For example:
1. `[my-github-username](https://github.com/my-github-username)`
1. Add to the `CONTRIBUTORS.md` file and save the changes.
1. Stage all changes by using the `git add .` command.
1. `git add .` the period represents every change observed at this time.
1. Commit to changes with a short but descriptive commit message.
1. `git commit -m 'adds name to contributors file'` Remember to add and close the message with quotations!
1. Once satisfied with the  addition, push changes up to GitHub
1. `git push` An error should occur for doing this, but luckily the terminal gives you the exact prompt to type into the terminal to fix. Do just that.
1. `git push --set-upstream origin 22/feature/documentation-contributors/change-me-to-your-username` This will allow all other developers to see this code on GitHub and everyone else can now switch to this branch and view this code locally if they choose.

### Pull Requests
1. Once the code is ready a pull request must be made against the `parent branch` In this case navigate to the [GitHub Voyage Repository](https://github.com/chingu-voyages/v47-tier1-team-04) and click on [Pull Requests](https://github.com/chingu-voyages/v47-tier1-team-04/pulls)
1. After navigating here click on `New Pull Request`
1. In this case choose `22/documentation/insights` as the base repository and compare them against the recently created branch `22/feature/documentation-contributors/change-me-to-your-username` 
![image](https://github.com/chingu-voyages/v47-tier1-team-04/assets/33106391/350ded2d-d095-4b17-87bd-547b2f5ac40c)
1. Please never opt to skip on a question. Just ask anything anytime.

#### Please follow the above guidelines when contributing to this code base in order to keep it organized and concise.

### Other Considerations
This is a living document so please allow for this to adopt over time as the project evolves.
