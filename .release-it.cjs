/** @type {import('release-it').Config} */
module.exports = {
    git: {
        commit: true,
        commitMessage: "chore(release): v${version}",
        push: true,
        tag: true,
        tagName: "v${version}"
    },
    github: {
        release: false
    },
    hooks: {
        "before:init": ["npm test", "npm run build"]
    },
    npm: {
        publish: true
    },
    plugins: {
        "@release-it/conventional-changelog": {
            infile: "CHANGELOG.md",
            preset: "angular",
            whatBump(commits) {
                let level = 2;
                let breakings = 0;
                let features = 0;

                commits.forEach((commit) => {
                    if (commit.notes.length > 0) {
                        breakings += commit.notes.length;
                        level = 0;
                    } else if (commit.type === "feat") {
                        features += 1;

                        if (level === 2) {
                            level = 1;
                        }
                    }
                });

                return {
                    level,
                    reason:
                        breakings === 1
                            ? `There is ${breakings} BREAKING CHANGE and ${features} features`
                            : `There are ${breakings} BREAKING CHANGES and ${features} features`
                };
            }
        }
    }
};
