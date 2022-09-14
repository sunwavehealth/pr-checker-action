/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 66:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 262:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(66);
const github = __nccwpck_require__(262);

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
})();

module.exports = __webpack_exports__;
/******/ })()
;