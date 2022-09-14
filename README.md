# PR Checker

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Usage
Accept the defaults
```
uses: JavaMonkey-io/pr-checker@v1.1
```
Modify Patterns
```
uses: JavaMonkey-io/pr-checker@v1.1
with:
  commit-message-format: '^\[[A-Z][A-Z0-9]+-[0-9]+\][ ][a-zA-Z].*'
```

## Contributing
Build:
```
npm run build
```

Releasing Help:
```
npm run build
git add *
git commit -m "Working customizations"
git tag -d main
git tag -a -m "Working customizations" main
git push --follow-tags
```