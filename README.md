# Worldie

A country guessing game adapted from [Worldle](https://worldle.teuteuf.fr/), which was in turn inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html).

Play it here: https://worldie.app

## Motivation

Worldle is fun, but a commonly requested feature (especially amongst my friends) is to see each guess on the map. Since the author of Worldle is not interested in building that nor in recieving any outside PRs, we decided to make our own version

## Contributing

There are a few ways you can contribute:

1. Play the game! Give your feedback by creating an issue on GitHub (feature requests and bug reports), or commenting on the existing issues
1. Join the discussion on [Telegram](https://t.me/+_YvCH-33niI3OWUy) to help decide on the game design on direction
1. Start coding! Pick any open issue and assign it to yourself, once you're ready to code see the Development section below. Create a pull request with your changes and assign @miridius to review once you're ready for feedback.

## Development

### With Codespaces

The easiest way to get started is to use [GitHub Codespaces](https://github.com/features/codespaces) if you have access to it (currently closed beta).

1. Create a codespace from any branch. If you're working on a new issue you can create a branch from the issue page
1. Once your codespace is connected, run `pnpm dev` in the terminal. Click the notification that appears to open the app (port 3000) in your browser. If you accidentally close it you can get there again using the PORTS tab in the VS code terminal panel
1. That's it! Any changes you make to the code will be immediately reflected in the app, thanks to the magic of HMR and SvelteKit.

### Without Codespaces

#### Prerequisites

1. [NodeJS](https://nodejs.org) v16 or higher
1. [PNpM](https://pnpm.io/)

#### Initial setup

1. Clone the repository using git and navigate to it in your terminal
1. Run `pnpm install`

#### Local dev

1. Run `pnpm dev` to start the dev server, it should automatically open a browser window.

## Testing

There are no automated tests yet (shame on me), partly because I haven't had time but also because figuring out how to test the map interactions is quite a challenge. There is an open issue to add tests and CI however

## Deployment

PRs are automatically deployed to preview environments and commits to the main branch deploy to production.
