const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
    try {
        const {eventName, payload: {repository: repo, pull_request: pr}} = github.context

        if (eventName !== 'pull_request') {
            core.error(`Invalid event: ${eventName}`)
            return
        }

        const githubToken = core.getInput('github-token')
        const commitMessageFormat = core.getInput('commit-message-format')

        // Fetch Commits
        const octokit = github.getOctokit(githubToken)
        const commitsListed = await octokit.rest.pulls.listCommits({
            owner: repo.owner.login,
            repo: repo.name,
            pull_number: pr.number,
        })

        let commits = commitsListed.data
        console.log(`commits: ${commits}`)

        const regex = new RegExp(commitMessageFormat)

        const failedMessages = []
        commits.forEach(({commit})=>{
            const matches = regex.test(commit.message);
            if(matches === false){
                failedMessages.push(commit.message);
            }
        })

        if(failedMessages.length > 0){
            core.error("The following commits do not have a valid message:");
            failedMessages.forEach(m=>core.error("  * "+m));
            core.setFailed("PR invalid due to invalid commit messages.");
        }

        core.setOutput('commits', JSON.stringify(commits))
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()